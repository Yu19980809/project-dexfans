import { CommentWithInfo } from '@/lib/types'
import CommentItem from './comment-item'

type Props = {
  comments: CommentWithInfo[]
}

const CommentList = ({ comments }: Props) => {
  return (
    <>
      {comments.map(item => <CommentItem key={item.id} data={item} />)}
    </>
  )
}

export default CommentList
