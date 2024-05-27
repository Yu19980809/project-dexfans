'use server'

import db from '@/lib/db'
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
  image?: string,
  video?: string
) => {
  const newPost = await db.post.create({
    data: {
      content: value,
      creatorId: userId,
      image,
      video
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

export const fetchUserPosts = async (userId: string) => {
  if (!userId) throw new Error('Missing user id')

  const existingUser = await db.user.findUnique({
    where: { id: userId }
  })

  if (!existingUser) throw new Error('nvalid user id')

  const posts = await db.post.findMany({
    orderBy: { createdAt: 'desc' },
    where: { creatorId: userId },
    include: {
      creator: true,
      comments: true
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
