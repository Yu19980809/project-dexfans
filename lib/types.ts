import { Comment, Post, PremiumType, User } from '@prisma/client'

export enum PostListType {
  FOR_YOU,
  SUBSCRIBING,
  USER_PROFILE
}

export type Premium = {
  label: string
  value: PremiumType
  price: number
  items: string[]
}

export type PartialUser = {
  id: string
  name: string | null
  username: string | null
  avatar: string | null
}

export type PostWithInfo = Post & {
  creator: PartialUser
  comments: Comment[]
}

export type PostWithAllInfo = Post & {
  creator: PartialUser
  comments: CommentWithInfo[]
}

export type CommentWithInfo = Comment & { user: User }

export type UserWithInfo = User & { followersCount: number }
