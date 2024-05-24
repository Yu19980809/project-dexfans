'use client'

import { useRouter } from 'next/navigation'
import { FaFeather } from 'react-icons/fa'

const PostButton = () => {
  const router = useRouter()

  return (
    <>
      <div
        onClick={() => router.push('/')}
        className="lg:hidden flex justify-center items-center w-14 h-14 mt-6 p-4 rounded-full bg-sky-500 cursor-pointer transition hover:bg-opacity-80"
      >
        <FaFeather size={24} color="white" />
      </div>

      <div className="hidden lg:block mt-6 px-4 py-2 rounded-full bg-sky-500 cursor-pointer transition hover:bg-opacity-80">
        <p className="font-semibold text-center text-[20px] text-white">
          Post
        </p>
      </div>
    </>
  )
}

export default PostButton
