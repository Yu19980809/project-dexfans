'use server'

import db from '@/lib/db'
import { getUserById } from '@/actions/users'
import { getPostById } from '@/actions/posts'

export const createComment = async (
  postId: string,
  userId: string,
  content: string
) => {
  if (!postId) return { error: 'Mising post id' }
  if (!userId) return { error: 'Mising user id' }
  if (!content) return { error: 'Content is required' }

  const existingUser = await getUserById(userId)
  if (!existingUser) return { error: 'Invalid user id' }

  const existingPot = await getPostById(postId)
  if (!existingPot) return { error: 'Invalid post id' }

  await db.comment.create({
    data: {
      postId,
      userId,
      content
    }
  })
}
