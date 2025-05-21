// Page for riley to be in when he is logged in
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { Button } from '@/components/ui/button'
import { logout } from './actions'
import Header from '@/components/Header'
export default async function EditPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/riley')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex flex-row justify-center items-center gap-4">
        <p className="text-2xl">Hello {data.user.email}</p>
        <Button variant="outline" className="bg-transparent" onClick={logout}>
          Log out
        </Button>
      </div>
      <p>Add new product</p>
        
      {/* form for adding new products here */}
    </div>
  )
}