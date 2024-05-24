import { Comment, Post, User } from '@prisma/client'

export type PostWithInfo = Post & {
  creator: User
  comments: Comment[]
}
