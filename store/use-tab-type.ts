import { create } from 'zustand'

type Props = {
  isFollowing: boolean
  setIsFollwing: (status: boolean) => void
}

const useTabType = create<Props>(set => ({
  isFollowing: false,
  setIsFollwing: status => set({ isFollowing: status })
}))

export default useTabType
