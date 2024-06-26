'use server'

import db, { PostType } from '@/lib/db'
import { getUserById } from './users'

export const getPostById =async (postId: string) => {
  const post = await db.post.findUnique({
    where: { id: postId }
  })

  return post
}

export const createPost = async (
  userId: string,
  value: string,
  type: PostType,
  image?: string,
  video?: string
) => {
  const newPost = await db.post.create({
    data: {
      content: value,
      image,
      video,
      type,
      creator: {
        connect: {
          id: userId
        }
      }
    }
  })

  return newPost
}

export const fetchAllPosts = async () => {
  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      creator: true,
      comments: true
    }
  })

  return posts
}

export const fetchPosts = async (offset: number, limit: number) => {
  const posts = await db.post.findMany({
    skip: offset,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      comments: true,
      creator: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true
        }
      },
    }
  })

  return posts
}

export const fetchUserPosts = async (userId: string, offset: number, limit: number) => {
  if (!userId) throw new Error('Missing user id')

  const existingUser = await db.user.findUnique({
    where: { id: userId }
  })

  if (!existingUser) throw new Error('Invalid user id')

  const posts = await db.post.findMany({
    skip: offset,
    take: limit,
    orderBy: { createdAt: 'desc' },
    where: { creatorId: userId },
    include: {
      comments: true,
      creator: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true
        }
      }
    }
  })

  return posts
}

export const fetchSubscribingUserPosts = async (userId: string, offset: number, limit: number) => {
  if (!userId) throw new Error('Missing user id')

  const existingUser = await db.user.findUnique({
    where: { id: userId }
  })

  if (!existingUser) throw new Error('Invalid user id')

  const posts = await db.post.findMany({
    skip: offset,
    take: limit,
    orderBy: { createdAt: 'desc' },
    where: {
      creatorId: {
        in: existingUser.subscribingIds
      }
    },
    include: {
      comments: true,
      creator: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true
        }
      }
    }
  })

  return posts
}

export const fetchPostInfo = async (postId: string) => {
  if (!postId) throw new Error('Missing post id')

  const post = await db.post.findUnique({
    where: { id: postId },
    include: {
      creator: true,
      comments: {
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  return post
}

export const likePost = async (postId: string, userId: string) => {
  if (!postId) return { error: 'Missing post id' }
  if (!userId) return { error: 'Missing user id' }

  const existingUser = await getUserById(userId)
  if (!existingUser) return { error: 'Invalid user id' }

  const existingPost = await getPostById(postId)
  if (!existingPost) return { error: 'Invalid post id' }

  const updatedLikedIds = [...(existingPost.likedIds || []), userId]

  await db.post.update({
    where: {id: existingPost.id },
    data: { likedIds: updatedLikedIds }
  })

  return { success: true }
}

export const unlikePost = async (postId: string, userId: string) => {
  if (!postId) return { error: 'Missing post id' }
  if (!userId) return { error: 'Missing user id' }

  const existingUser = await getUserById(userId)
  if (!existingUser) return { error: 'Invalid user id' }

  const existingPost = await getPostById(postId)
  if (!existingPost) return { error: 'Invalid post id' }

  const updatedLikedIds = existingPost.likedIds.filter(item => item !== userId)

  await db.post.update({
    where: {id: existingPost.id },
    data: { likedIds: updatedLikedIds }
  })

  return { success: true }
}
