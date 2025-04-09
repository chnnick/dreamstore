"use client"
export default function Header() {
  return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">DreamCore Shop</h1>
        <div className="flex items-center">
          <span className="mr-2">Cart INFO HERE</span>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
            Checkout
          </button>
        </div>
      </div>
  )
}