"use client"
export function Footer() {
  return (
    <div className="bg-black w-full">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>{new Date().getFullYear()} @CutByTheKid. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}