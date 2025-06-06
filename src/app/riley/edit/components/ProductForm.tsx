'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from 'sonner'
import { Plus } from 'lucide-react'
import { useState } from 'react'

interface ProductFormProps {
  type: 'add' | 'edit'
  product?: any
  onSubmit: (formData: FormData) => Promise<void>
}

export function ProductForm({ type, product, onSubmit }: ProductFormProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    await onSubmit(formData)
    toast(`${type === 'add' ? 'Product Added' : 'Product Updated'}`, {
      description: `The product has been successfully ${type === 'add' ? 'added to' : 'updated in'} your store.`,
    })
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {type === 'add' ? (
          <Button variant="outline" className="w-full h-full">
            <Plus />
          </Button>
        ) : (
          <Button variant="outline" className="w-[50%] text-[var(--bg-color)] hover:scale-105 transition-all duration-100">
            Edit
          </Button>
        )}
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] bg-[var(--bg-color)] text-[var(--text-color)] border-l border-[var(--border)]">
        <SheetHeader>
          <SheetTitle className="text-[var(--text-color)]">
            {type === 'add' ? 'Add Product' : 'Edit Product'}
          </SheetTitle>
          <SheetDescription className="text-[var(--text-color)]/70">
            {type === 'add' ? (
              <b className="text-red-500">Add new products here, make sure they are also added to your STRIPE!</b>
            ) : (
              "Make changes to your product here. Click save when you're done."
            )}
          </SheetDescription>
        </SheetHeader>
        <form action={handleSubmit} className="px-4 space-y-4">
          {type === 'edit' && (
            <>
              <input type="hidden" name="id" value={product.id} />
              <input type="hidden" name="current_image_url" value={product.image_url || ''} />
              <input type="hidden" name="current_second_image_url" value={product.second_image_url || ''} />
              <input type="hidden" name="stripe_id" value={product.stripe_id || ''} />
            </>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={product?.name}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              defaultValue={product?.price}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stock-status">Stock Status</Label>
            <Select name="stock_status" defaultValue={product?.stock_status?.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">In Stock</SelectItem>
                <SelectItem value="false">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="size">Size</Label>
            <Input
              id="size"
              name="size"
              defaultValue={product?.size}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={product?.description}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Product Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="cursor-pointer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image-2">Secondary Image</Label>
            <Input
              id="image-2"
              name="image-2"
              type="file"
              accept="image/*"
              className="cursor-pointer"
            />
          </div>
          <Button type="submit" className="w-full bg-[var(--text-color)] text-[var(--bg-color)] hover:bg-[var(--text-color)] hover:text-[var(--text-color)] hover:scale-105 transition-all duration-100">
            {type === 'add' ? 'Save Changes' : 'Update Product'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
} 