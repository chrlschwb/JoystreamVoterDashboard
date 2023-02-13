import { LeaderNameFragment, LeaderFragment, PostOfLeaderFragment } from '@/queries'

export interface Leader {
  groupId: string,
  leader: Array<LeaderNameFragment>
}

export const asLeader = (data: LeaderFragment): Leader => ({
  groupId: data.groupId,
  leader: data.workersHired,
})


export interface LeaderPost {
  author: string,
  text: string
}

export const asLeaderPost = (data: PostOfLeaderFragment): LeaderPost => ({
  author: data.author.handle,
  text: data.text
})