'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'


export async function addProduct(formData: FormData) {
  const supabase = await createClient()
  
  const name = formData.get('name') as string
  const price = parseFloat(formData.get('price') as string)
  const stock_status = formData.get('stock_status') as string
  const size = formData.get('size') as string
  const description = formData.get('description') as string
  const imageFile = formData.get('image') as File
  const imageFile2 = formData.get('image-2') as File
  
  if (!imageFile) {
    throw new Error('Image is required')
  }

  // Upload main image to Supabase Storage
  const fileExt = imageFile.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('products')
    .upload(fileName, imageFile)

  if (uploadError) {
    throw new Error('Error uploading image')
  }

  // Get the public URL for the uploaded image
  const { data: { publicUrl } } = supabase.storage
    .from('products')
    .getPublicUrl(fileName)

  // Handle second image if provided
  let second_image_url = null
  if (imageFile2 && imageFile2.size > 0) {
    const fileExt2 = imageFile2.name.split('.').pop()
    const fileName2 = `${Math.random()}.${fileExt2}`
    const { data: uploadData2, error: uploadError2 } = await supabase.storage
      .from('products')
      .upload(fileName2, imageFile2)

    if (uploadError2) {
      throw new Error('Error uploading second image')
    }

    const { data: { publicUrl: publicUrl2 } } = supabase.storage
      .from('products')
      .getPublicUrl(fileName2)
    
    second_image_url = publicUrl2
  }

  // Insert product data into the database
  const { error: insertError } = await supabase
    .from('products')
    .insert([
      {
        name,
        price,
        image_url: publicUrl,
        second_image_url,
        stock_status,
        size,
        description,
        created_at: new Date().toISOString(),
      }
    ])

  if (insertError) {
    throw new Error('Error adding product')
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

  let image_url = formData.get('current_image_url') as string
  let second_image_url = formData.get('current_second_image_url') as string

  // If a new main image is uploaded, handle the upload
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('products')
      .upload(fileName, imageFile)

    if (uploadError) {
      throw new Error('Error uploading image')
    }

    const { data: { publicUrl } } = supabase.storage
      .from('products')
      .getPublicUrl(fileName)

    image_url = publicUrl
  }

  // If a new second image is uploaded, handle the upload
  if (imageFile2 && imageFile2.size > 0) {
    const fileExt2 = imageFile2.name.split('.').pop()
    const fileName2 = `${Math.random()}.${fileExt2}`
    const { data: uploadData2, error: uploadError2 } = await supabase.storage
      .from('products')
      .upload(fileName2, imageFile2)

    if (uploadError2) {
      throw new Error('Error uploading second image')
    }

    const { data: { publicUrl: publicUrl2 } } = supabase.storage
      .from('products')
      .getPublicUrl(fileName2)

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

  // Delete the main image from storage
  if (image_url) {
    const imagePath = image_url.split('/').pop()
    if (imagePath) {
      await supabase.storage
        .from('products')
        .remove([imagePath])
    }
  }

  // Delete the second image from storage if it exists
  if (second_image_url) {
    const secondImagePath = second_image_url.split('/').pop()
    if (secondImagePath) {
      await supabase.storage
        .from('products')
        .remove([secondImagePath])
    }
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