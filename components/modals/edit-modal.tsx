import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { z } from 'zod'

import { updateUserInfo } from '@/actions/users'
import { UpdateUserSchema } from '@/lib/schemas'
import { UserWithInfo } from '@/lib/types'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '@/components/global/loader'
import ImageUpload from '@/components/global/image-upload'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import MediaUploader from '../global/media-uploader'
import { CldImage } from 'next-cloudinary'
import Image from 'next/image'

type Props = {
  open: boolean
  user: UserWithInfo
  setOpen: React.Dispatch<boolean>
}

const EditModal = ({
  open,
  user,
  setOpen
}: Props) => {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: user?.name || '',
      username: user?.username || '',
      bio: user?.bio || '',
      profileImage: user?.avatar || '',
      coverImage: user?.coverImage || ''
    }
  })

  const onSubmit = async (values: z.infer<typeof UpdateUserSchema>) => {
    console.log('submit', values)
    // setIsLoading(true)

    // updateUserInfo(user?.id!, values)
    //   .then(() => router.refresh())
    //   .catch(() => toast.error('Failed to update profile'))
    //   .then(() => {
    //     setIsLoading(false)
    //     setOpen(false)
    //   })
  }

  return (
    <Dialog modal={false} open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit your profile</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            <div className="space-y-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Name</FormLabel>

                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="John Snow"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">User Name</FormLabel>

                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="John Snow"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="bio"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Bio</FormLabel>

                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="Hello"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="profileImage"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Profile Image</FormLabel>

                    <FormControl>
                      {/* <ImageUpload
                        label="Upload profile image"
                        onChange={(base64: any) => form.setValue('profileImage', base64)}
                      /> */}

                      <MediaUploader onUploadSuccess={result => {
                        console.log('result', result)
                        // field.onChange(result?.secure_url)
                        form.setValue('profileImage', result?.secure_url)
                      }}>
                        <div className="w-full p-4 rounded-md border-2 border-dotted text-center cursor-pointer">
                          {!field.value && <p>Upload profile image</p>}

                          {!!field.value && (
                            <Image
                              src={field.value}
                              alt="Profile image"
                              width={200}
                              height={200}
                              className="w-full rounded-md object-cover"
                            />
                          )}
                        </div>
                      </MediaUploader>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="coverImage"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground">Cover Image</FormLabel>

                    <FormControl>
                      <ImageUpload
                        label="Upload cover image"
                        onChange={(base64: any) => field.onChange(base64)}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="ghost" disabled={isLoading}>
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader /> : 'Submit'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditModal
