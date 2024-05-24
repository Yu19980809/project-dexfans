'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Image, Smile } from 'lucide-react'
import { AiOutlineFileGif } from 'react-icons/ai'

import { createPost } from '@/actions/posts'
import { useCurrentUser } from '@/hooks/use-current-user'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Loader from '@/components/global/loader'

const Editor = () => {
  const router = useRouter()
  const currentUser = useCurrentUser()

  const [value, setValue] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const onPost = () => {
    if (!currentUser || !currentUser.id || !value) return
    setIsLoading(true)

    createPost(currentUser.id, value)
      .then(() => {
        toast.success('Post created')
        setValue(undefined)
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="flex flex-col w-full h-40 px-4 py-2 border-b">
      <Textarea
        onChange={e => setValue(e.target.value)}
        value={value}
        disabled={isLoading}
        placeholder="What is happening?!"
        className="flex-1 border-none text-lg resize-none overflow-y-auto focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      <div className="flex justify-between items-center pt-4">
        <div className="flex items-center gap-x-4 px-4">
          <Image className="w-5 h-5 text-sky-500 cursor-pointer" />
          <AiOutlineFileGif className="w-5 h-5 text-sky-500 cursor-pointer" />
          <Smile className="w-5 h-5 text-sky-500 cursor-pointer" />
        </div>

        <Button
          onClick={onPost}
          disabled={isLoading}
          className="rounded-full bg-sky-500 text-white hover:bg-sky-500 hover:bg-opacity-80"
        >
          {isLoading ? <Loader /> : 'Post'}
        </Button>
      </div>
    </div>
  )
}

export default Editor
