import { Comment, Post, User } from '@prisma/client'

export type PostWithInfo = Post & {
  creator: User
  comments: Comment[]
}

export type PostWithAllInfo = Post & {
  creator: User
  comments: CommentWithInfo[]
}

export type CommentWithInfo = Comment & { user: User }

export type UserWithInfo = User & { followersCount: number }
