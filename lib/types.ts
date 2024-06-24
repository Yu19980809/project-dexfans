import { Comment, Post, PremiumType, User } from '@prisma/client'

export type Premium = {
  label: string
  value: PremiumType
  price: number
  items: string[]
}

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
