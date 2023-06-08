import { LeaderNameFragment, LeaderFragment, PostOfLeaderFragment, TerminatedWorkerFragment, ExitedWorkerFragment, SlashedWorkerFragment } from '@/queries'

export interface Leader {
  groupId: string,
  leader: Array<LeaderNameFragment>,
  type: string
}

export const asLeader = (data: LeaderFragment): Leader => ({
  groupId: data.groupId,
  leader: data.workersHired,
  type: data.opening.type
})


export interface LeaderPost {
  author: string,
  text: string
}

export const asLeaderPost = (data: PostOfLeaderFragment): LeaderPost => ({
  author: data.author.handle,
  text: data.text
})

export interface TerminatedWorker {
  create: string,
  groupId: string,
  worker: string,
  isLead: boolean,
  leader: string
}

export const asTerminatedWorker = (data: TerminatedWorkerFragment): TerminatedWorker => ({
  create: data?.createdAt,
  groupId: data.groupId,
  worker: data.worker?.membership.handle,
  isLead: data.worker.isLead,
<<<<<<< HEAD
  leader: data.group.leader?.membership.handle
})
=======
  leader: data.group.leader?.membership.handle,
});
>>>>>>> d010f02c16445e1e9d56ef9849e0c0d150cbdcb7
export interface ExitedWorker {
  create: string;
  groupId: string;
  worker: string;
  isLead: boolean;
  leader: string;
}
export const asExitedWorker = (data: ExitedWorkerFragment): ExitedWorker => ({
  create: data?.createdAt,
  groupId: data.groupId,
  worker: data.worker?.membership.handle,
<<<<<<< HEAD
  isLead: data.worker?.isLead,
  leader: data.group.leader?.membership.handle
})
=======
  isLead: data.worker.isLead,
  leader: data.group.leader?.membership.handle,
});
>>>>>>> d010f02c16445e1e9d56ef9849e0c0d150cbdcb7

export interface SlashedWorker {
  create: string,
  worker: string,
}
export const asSlashedWorker = (data: SlashedWorkerFragment): SlashedWorker => ({
  create: data?.createdAt,
  worker: data.entry.worker.handle

})

