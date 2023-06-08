
import { WorkerFieldsFragment, WorkerMemberFragment } from '@/queries';

import { Block } from './common';
import { asMember, Member } from './Member';

export interface WorkerBaseInfo {
  member: Member;
  applicationId: string;
}


export interface PastWorker {
  id: string;
  member: Member;
  dateStarted: Block;
  dateFinished: Block;
}

export type WorkerStatus = 'active' | 'left' | 'leaving' | 'terminated';
export const WorkerStatusToTypename: Record<WorkerStatus, WorkerFieldsFragment['status']['__typename']> = {
  active: 'WorkerStatusActive',
  left: 'WorkerStatusLeft',
  leaving: 'WorkerStatusLeaving',
  terminated: 'WorkerStatusTerminated',
};

export const asWorkerBaseInfo = (fields: WorkerFieldsFragment): WorkerBaseInfo => ({
  member: asMember(fields.membership),
  applicationId: fields.applicationId,
});





