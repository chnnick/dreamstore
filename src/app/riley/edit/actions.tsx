'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


export async function addProduct(formData: FormData) {
  const supabase = await createClient()
  
  // Verify user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('You must be authenticated to add products')
  }

  const name = formData.get('name') as string
  const price = parseFloat(formData.get('price') as string)
  const stock_status = formData.get('stock_status') === 'true'
  const size = formData.get('size') as string
  const description = formData.get('description') as string
  const imageFile = formData.get('image') as File
  const imageFile2 = formData.get('image-2') as File
  const stripe_id = formData.get('stripe_id') as string


  if (!imageFile) {
    throw new Error('Image is required')
  }

  // First, create the product to get its ID
  console.log('Attempting to insert product with data:', {
    name,
    price,
    stock_status,
    size,
    description,
    created_at: new Date().toISOString(),
  })

  const { data: product, error: insertError } = await supabase
    .from('products')
    .insert([
      {
        name,
        price,
        stock_status,
        size,
        description,
        image_url: '',
        second_image_url: '',
        stripe_id,
        created_at: new Date().toISOString(),
      }
    ])
    .select()
    .single()

  if (insertError) {
    console.error('Product insertion error:', {
      error: insertError,
      code: insertError.code,
      message: insertError.message,
      details: insertError.details,
      hint: insertError.hint
    })
    throw new Error(`Error creating product: ${insertError.message}`)
  }

  if (!product) {
    console.error('No product data returned after insertion')
    throw new Error('Error creating product: No data returned')
  }

  const productId = product.id
  const productFolder = `product${productId}`

  // Upload main image to Supabase Storage
  const fileExt = imageFile.name.split('.').pop()
  const mainImagePath = `${productFolder}/image-1.${fileExt}`
  
  console.log('Attempting to upload image:', {
    path: mainImagePath,
    fileSize: imageFile.size,
    fileType: imageFile.type,
    fileName: imageFile.name
  })

  const { data: uploadData, error: uploadError } = await supabase
    .storage
    .from('product-images')
    .upload(mainImagePath, imageFile)

  if (uploadError) {
    console.error('Image upload error:', {
      error: uploadError,
      message: uploadError.message
    })
    // Clean up the product if image upload fails
    await supabase.from('products').delete().eq('id', productId)
    throw new Error(`Error uploading main image: ${uploadError.message}`)
  }

  console.log('Image uploaded successfully:', uploadData)

  // Get the public URL for the uploaded image
  const { data: { publicUrl } } = supabase.storage
    .from('product-images')
    .getPublicUrl(mainImagePath)

  // Handle second image if provided
  let second_image_url = null
  if (imageFile2 && imageFile2.size > 0) {
    const fileExt2 = imageFile2.name.split('.').pop()
    const secondImagePath = `${productFolder}/image-2.${fileExt2}`
    const { error: uploadError2 } = await supabase.storage
      .from('product-images')
      .upload(secondImagePath, imageFile2)

    if (uploadError2) {
      // Clean up the product and main image if second image upload fails
      await supabase.storage.from('product-images').remove([mainImagePath])
      await supabase.from('products').delete().eq('id', productId)
      throw new Error('Error uploading second image')
    }

    const { data: { publicUrl: publicUrl2 } } = supabase.storage
      .from('product-images')
      .getPublicUrl(secondImagePath)
    
    second_image_url = publicUrl2
  }

  // Update the product with image URLs
  const { error: updateError } = await supabase
    .from('products')
    .update({
      image_url: publicUrl,
      second_image_url
    })
    .eq('id', productId)

  if (updateError) {
    // Clean up uploaded images if update fails
    await supabase.storage.from('product-images').remove([mainImagePath])
    if (second_image_url) {
      const fileExt2 = imageFile2?.name.split('.').pop()
      const secondImagePath = `${productFolder}/image-2.${fileExt2}`
      await supabase.storage.from('product-images').remove([secondImagePath])
    }
    await supabase.from('products').delete().eq('id', productId)
    throw new Error('Error updating product with image URLs')
  }

  revalidatePath('/riley/edit')
}

export async function editProduct(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const price = parseFloat(formData.get('price') as string)
  const stock_status = formData.get('stock_status') as string
  const size = formData.get('size') as string
  const description = formData.get('description') as string
  const imageFile = formData.get('image') as File
  const imageFile2 = formData.get('image-2') as File
  const stripe_id = formData.get('stripe_id') as string

  let image_url = formData.get('current_image_url') as string
  let second_image_url = formData.get('current_second_image_url') as string

  const productFolder = `product${id}`

  // If a new main image is uploaded, handle the upload
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const mainImagePath = `${productFolder}/image-1.${fileExt}`
    
    // Delete old main image if it exists
    if (image_url) {
      const oldImagePath = image_url.split('/').pop()
      if (oldImagePath) {
        await supabase.storage.from('product-images').remove([oldImagePath])
      }
    }

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(mainImagePath, imageFile)

    if (uploadError) {
      throw new Error('Error uploading main image')
    }

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(mainImagePath)

    image_url = publicUrl
  }

  // If a new second image is uploaded, handle the upload
  if (imageFile2 && imageFile2.size > 0) {
    const fileExt2 = imageFile2.name.split('.').pop()
    const secondImagePath = `${productFolder}/image-2.${fileExt2}`

    // Delete old second image if it exists
    if (second_image_url) {
      const oldImagePath = second_image_url.split('/').pop()
      if (oldImagePath) {
        await supabase.storage.from('product-images').remove([oldImagePath])
      }
    }

    const { error: uploadError2 } = await supabase.storage
      .from('product-images')
      .upload(secondImagePath, imageFile2)

    if (uploadError2) {
      throw new Error('Error uploading second image')
    }

    const { data: { publicUrl: publicUrl2 } } = supabase.storage
      .from('product-images')
      .getPublicUrl(secondImagePath)

    second_image_url = publicUrl2
  }

  const { error: updateError } = await supabase
    .from('products')
    .update({
      name,
      price,
      image_url,
      second_image_url,
      stock_status,
      size,
      description,
      stripe_id
    })
    .eq('id', id)

  if (updateError) {
    throw new Error('Error updating product')
  }

  revalidatePath('/riley/edit')
}

export async function deleteProduct(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const image_url = formData.get('image_url') as string
  const second_image_url = formData.get('second_image_url') as string

  // Delete the product folder from storage
  const productFolder = `product${id}`
  const { data: folderContents } = await supabase.storage
    .from('product-images')
    .list(productFolder)

  if (folderContents) {
    const filesToDelete = folderContents.map(file => `${productFolder}/${file.name}`)
    await supabase.storage
      .from('product-images')
      .remove(filesToDelete)
  }

  // Delete the product from the database
  const { error: deleteError } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (deleteError) {
    throw new Error('Error deleting product')
  }

  revalidatePath('/riley/edit')
}

export async function logout() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function addGalleryImage(formData: FormData) {
  const supabase = await createClient()
  
  // Verify user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('You must be authenticated to add gallery images')
  }

  const description = formData.get('description') as string
  const imageFile = formData.get('image') as File

  if (!imageFile) {
    throw new Error('Image is required')
  }

  console.log('Attempting to upload gallery image:', {
    fileName: imageFile.name,
    fileSize: imageFile.size,
    fileType: imageFile.type
  })

  // Upload image to Supabase Storage
  const fileExt = imageFile.name.split('.').pop()
  const imagePath = `${Date.now()}.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(imagePath, imageFile)

  if (uploadError) {
    console.error('Gallery image upload error:', {
      error: uploadError,
      message: uploadError.message
    })
    throw new Error(`Error uploading image: ${uploadError.message}`)
  }

  // Get the public URL for the uploaded image
  const { data: { publicUrl } } = supabase.storage
    .from('gallery')
    .getPublicUrl(imagePath)

  console.log('Attempting to insert gallery record:', {
    image_url: publicUrl,
    description
  })

  // Add the image to the gallery table
  const { error: insertError } = await supabase
    .from('images')
    .insert([
      {
        image_url: publicUrl,
        description,
        created_at: new Date().toISOString(),
      }
    ])

  if (insertError) {
    console.error('Gallery record insertion error:', {
      error: insertError,
      message: insertError.message,
      code: insertError.code,
      details: insertError.details
    })
    // Clean up the uploaded image if insert fails
    await supabase.storage.from('gallery').remove([imagePath])
    throw new Error(`Error adding gallery image: ${insertError.message}`)
  }

  revalidatePath('/riley/edit')
}

export async function deleteGalleryImage(formData: FormData) {
  const supabase = await createClient()
  
  const id = formData.get('id') as string
  const image_url = formData.get('image_url') as string

  // Extract the file path from the URL
  const imagePath = image_url.split('/').pop()
  if (imagePath) {
    // Delete the image from storage
    await supabase.storage
      .from('gallery')
      .remove([imagePath])
  }

  // Delete the image record from the database
  const { error: deleteError } = await supabase
    .from('images')
    .delete()
    .eq('id', id)

  if (deleteError) {
    throw new Error('Error deleting gallery image')
  }

  revalidatePath('/riley/edit')
}