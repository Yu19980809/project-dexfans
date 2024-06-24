'use client'

import { PostType } from '@prisma/client'

import { postOptions } from '@/lib/constants'
import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

type Props = {
  isEmpty: boolean
  isLoading: boolean
  onSubmit: (type: PostType) => void
}

const PostButton = ({ isLoading, isEmpty, onSubmit }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          disabled={isLoading || isEmpty}
          className="rounded-full bg-sky-500 text-white hover:bg-sky-500 hover:bg-opacity-80"
        >
          {isLoading ? <Loader /> : 'Post'}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-50">
        <div className="flex flex-col gap-y-2">
          {postOptions.map(item => (
            <DropdownMenuItem key={item.value} onClick={() => onSubmit(item.value)}>
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default PostButton
