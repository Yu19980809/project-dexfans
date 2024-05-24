'use server'

import db from '@/lib/db'

export const createPost = async (userId: string, value: string) => {
  const newPost = await db.post.create({
    data: {
      content: value,
      creatorId: userId
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
