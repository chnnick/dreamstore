"use client"
export function Footer() {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col md:flex-row justify-between">
      <div className="mb-6 md:mb-0">
        <h3 className="text-lg font-semibold mb-2">DreamCore Shop</h3>
        <p className="text-gray-300">Quality grapes for everyone</p>
      </div>
      <div>
        <h4 className="text-md font-semibold mb-2">Contact Us</h4>
        <p className="text-gray-300">support@dreamcore.com</p>
        <p className="text-gray-300">1-800-DREAM</p>
      </div>
    </div>
    <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
      <p>{new Date().getFullYear()} DreamCore Shop. All rights reserved.</p>
    </div>
    </div>
  )
}