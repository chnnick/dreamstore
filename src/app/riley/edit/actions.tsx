'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'


export async function logout() {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const { error } = await supabase.auth.signOut()

  /* HOW TO LOGOUT
  <form action={logout}>
    <button type="submit">Logout</button>
  </form>
  */

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function addProduct(formData: FormData) {
  const supabase = await createClient()

  const { data, error } = await supabase.from('products').insert({
    name: formData.get('name'),
  })
}