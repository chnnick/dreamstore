'use client'
import Header from '@/components/Header'
export default function ErrorPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <p>Sorry, something went wrong</p>
    </div>
  )
}