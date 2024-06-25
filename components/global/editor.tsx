'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { CldImage  } from 'next-cloudinary'
import { PostType } from '@prisma/client'
import {
  CirclePlay,
  FileVideo,
  ImageIcon,
  Smile,
  Trash2
} from 'lucide-react'

import { createPost } from '@/actions/posts'
import { createComment } from '@/actions/comment'
import { useCurrentUser } from '@/hooks/use-current-user'
import MediaUploader from '@/components/global/media-uploader'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import PostButton from './post-button'


type Props = {
  postId?: string
  isComment?: boolean
  placeholder?: string
}

const Editor = ({
  postId,
  placeholder = 'What is happening?!',
  isComment = false
}: Props) => {
  const router = useRouter()
  const currentUser = useCurrentUser()

  const [image, setImage] = useState<any>()
  const [video, setVideo] = useState<any>()
  const [value, setValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showControls, setShowControls] = useState<boolean>(false)
  
  const onPost = (type: PostType) => {
    if (!currentUser || !currentUser.id || !value) return
    setIsLoading(true)

    createPost(currentUser.id, value, type, image?.publicId, video?.secureURL)
      .then(() => {
        setValue('')
        setImage(undefined)
        setVideo(undefined)
        toast.success('Post created')
        router.refresh()
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false))
  }

  const onComment = () => {
    if (!value) return toast.error('Content is required')
    setIsLoading(true)

    createComment(postId!, currentUser?.id!, value)
      .then(res => {
        if (res?.error) return toast.error(res.error)
        toast.success('Comment created')
        setValue('')
        router.refresh()
      })
      .catch(() => toast.error('Something went wrong'))
      .finally(() => setIsLoading(false))
  }

  const onUploadSuccess = (result: any) => {
    if (result?.info?.resource_type === 'video') {
      setVideo(() => ({
        publicId: result?.info?.public_id,
        width: result?.info?.width,
        height: result?.info?.height,
        secureURL: result?.info?.secure_url
      }))
    } else {
      setImage(() => ({
        publicId: result?.info?.public_id,
        width: result?.info?.width,
        height: result?.info?.height,
        secureURL: result?.info?.secure_url
      }))
    }

  }

  const onRemove = () => {
    setImage(undefined)
    setVideo(undefined)
  }

  return (
    <div className="flex flex-col w-full min-h-40 px-4 py-2 border-b">
      <Textarea
        onChange={e => setValue(e.target.value)}
        value={value}
        disabled={isLoading}
        placeholder={placeholder}
        className="flex-1 border-none text-lg resize-none overflow-y-auto focus-visible:ring-0 focus-visible:ring-offset-0"
      />

      {!!image && !video && (
        <div className="relative group flex">
          <CldImage
            src={image.publicId}
            alt="Image"
            width={image.width}
            height={image.height}
            className="w-full rounded-md object-cover"
          />

          <Button
            onClick={onRemove}
            variant="destructive"
            size="sm"
            className={`hidden absolute top-2 right-2 group-hover:block`}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}

      {!!video && !image && (
        <div className="group relative flex justify-center items-center">
          <video
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
            src={video.secureURL}
            controls={showControls}
            className="rounded-md"
          />

          <div className="absolute block group-hover:hidden">
            <CirclePlay className="w-10 h-10 text-white opacity-70" />
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4">
        <div className="flex items-center gap-x-4 px-4">
          <MediaUploader onUploadSuccess={onUploadSuccess}>
            <ImageIcon className="w-5 h-5 text-sky-500 cursor-pointer transition hover:scale-110" />
          </MediaUploader>

          <MediaUploader isVideo onUploadSuccess={onUploadSuccess}>
            <FileVideo className="w-5 h-5 text-sky-500 cursor-pointer hover:scale-110" />
          </MediaUploader>

          <Smile className="w-5 h-5 text-sky-500 cursor-pointer hover:scale-110" />
        </div>

        <PostButton
          isEmpty={!value}
          isLoading={isLoading}
          onSubmit={onPost}
        />
      </div>
    </div>
  )
}

export default Editor
