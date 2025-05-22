// Page for riley to be in when he is logged in
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { addProduct, editProduct, deleteProduct, logout } from './actions'
import Header from '@/components/Header'
import Image from 'next/image'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus } from 'lucide-react'

export default async function EditPage() {
  const supabase = await createClient()

  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData?.user) {
    redirect('/riley')
  }

  // Fetch existing products
  const { data: products, error: productsError } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col items-center gap-8 p-8">
        <h1 className="text-2xl font-bold">ADMIN PAGE</h1>
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="w-full h-full">
                  <Plus />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px] bg-[var(--bg-color)] text-[var(--text-color)] border-l border-[var(--border)]">
                <SheetHeader>
                  <SheetTitle className="text-[var(--text-color)]">Add Product</SheetTitle>
                  <SheetDescription className="text-[var(--text-color)]/70">
                    Add new products here, make sure they are also added to your STRIPE!
                  </SheetDescription>
                </SheetHeader>
                <form action={addProduct} className="px-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Name</Label>
                    <Input
                      id="edit-name"
                      name="name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-price">Price</Label>
                    <Input
                      id="edit-price"
                      name="price"
                      type="number"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-stock-status">Stock Status</Label>
                    <Select name="stock_status">
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="In Stock">In Stock</SelectItem>
                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                        <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-size">Size</Label>
                    <Input
                      id="edit-size"
                      name="size"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      name="description"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-image">Product Image</Label>
                    <Input
                      id="edit-image"
                      name="image"
                      type="file"
                      accept="image/*"
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-image">Secondary Image</Label>
                    <Input
                      id="edit-image-2"
                      name="image-2"
                      type="file"
                      accept="image/*"
                      className="cursor-pointer"
                    />
                  </div>
                  <Button type="submit" className="w-full">Save Changes</Button>
                </form>
            </SheetContent>
            </Sheet>
            {products?.map((product) => (
              <div key={product.id} className="border rounded p-4">
                <div className="relative w-full h-48 mb-4 group">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover rounded transition-opacity duration-300 group-hover:opacity-0"
                  />
                  {product.second_image_url && (
                    <Image
                      src={product.second_image_url}
                      alt={`${product.name} - Second view`}
                      fill
                      className="object-cover rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  )}
                </div>
                <h3 className="font-bold">{product.name}</h3>
                <p className="text-sm">${product.price}</p>
                <p className="text-sm">Size: {product.size}</p>
                <p className="text-sm">Status: {product.stock_status}</p>
                <div className="mt-4 flex gap-2">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="w-[50%] text-[var(--bg-color)] hover:scale-105 transition-all duration-100">Edit</Button>
                    </SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[540px] bg-[var(--bg-color)] text-[var(--text-color)] border-l border-[var(--border)]">
                      <SheetHeader>
                        <SheetTitle className="text-[var(--text-color)]">Edit Product</SheetTitle>
                        <SheetDescription className="text-[var(--text-color)]/70">
                          Make changes to your product here. Click save when you're done.
                        </SheetDescription>
                      </SheetHeader>
                      <form action={editProduct} className="space-y-4">
                        <input type="hidden" name="id" value={product.id} />
                        <input type="hidden" name="current_image_url" value={product.image_url} />
                        <input type="hidden" name="current_second_image_url" value={product.second_image_url} />
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" name="name" defaultValue={product.name} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="price">Price</Label>
                          <Input id="price" name="price" type="number" step="0.50" defaultValue={product.price} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="stock_status">Stock Status</Label>
                          <Select name="stock_status" defaultValue={product.stock_status}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select stock status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="In Stock">In Stock</SelectItem>
                              <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                              <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="size">Size</Label>
                          <Input id="size" name="size" defaultValue={product.size} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" name="description" defaultValue={product.description} required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="image">Main Image</Label>
                          <Input id="image" name="image" type="file" accept="image/*" />
                          {product.image_url && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">Current image:</p>
                              <Image
                                src={product.image_url}
                                alt={product.name}
                                width={200}
                                height={200}
                                className="mt-1 rounded-lg"
                              />
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="image-2">Second Image (Optional)</Label>
                          <Input id="image-2" name="image-2" type="file" accept="image/*" />
                          {product.second_image_url && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">Current second image:</p>
                              <Image
                                src={product.second_image_url}
                                alt={`${product.name} - Second view`}
                                width={200}
                                height={200}
                                className="mt-1 rounded-lg"
                              />
                            </div>
                          )}
                        </div>
                        <Button type="submit" className="w-full">Update Product</Button>
                      </form>
                    </SheetContent>
                  </Sheet>
                  <form action={deleteProduct} className="flex-1">
                    <input type="hidden" name="id" value={product.id} />
                    <input type="hidden" name="image_url" value={product.image_url} />
                    <Button type="submit" variant="destructive" className="w-full hover:scale-105 transition-all duration-100">Delete</Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form action={logout}>
          <Button variant="outline" className="bg-transparent">
            Log out
          </Button>
        </form>
      </div>
    </div>
  )
}