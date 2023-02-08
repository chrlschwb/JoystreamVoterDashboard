import BN from 'bn.js';

import { sumStakes } from '@/helpers';
import { WorkerFieldsFragment, WorkingGroupFieldsFragment, GetWorkingGroupTokenQuery } from '@/queries';

export const GroupIdToGroupParam = {
  contentWorkingGroup: 'Content',
  forumWorkingGroup: 'Forum',
  appWorkingGroup: 'App',
  membershipWorkingGroup: 'Membership',
  distributionWorkingGroup: 'Distribution',
  storageWorkingGroup: 'Storage',
  operationsWorkingGroupAlpha: 'OperationsAlpha',
  operationsWorkingGroupBeta: 'OperationsBeta',
  operationsWorkingGroupGamma: 'OperationsGamma',
} as const;

export type GroupIdName = keyof typeof GroupIdToGroupParam;

export interface WorkingGroup {
  id: string;
  name: string;
  image?: string;
  about?: string;
  leadId?: string;
  status?: string;
  description?: string;
  statusMessage?: string;
  budget?: BN;
  averageStake?: BN;
  isActive?: boolean;
}



export const asWorkingGroup = (group: WorkingGroupFieldsFragment): WorkingGroup => {
  return {
    id: group.id,
    image: undefined,
    name: group.name,
    about: group.metadata?.about ?? '',
    description: group.metadata?.description ?? '',
    status: group.metadata?.status ?? '',
    statusMessage: group.metadata?.statusMessage ?? '',
    budget: new BN(group.budget),
    averageStake: getAverageStake(group.workers),
    leadId: group.leader?.membershipId,
    isActive: group.leader?.isActive ?? false,
  };
};


export const asWorkingGroupName = (name: string) =>
  name
    .replace('WorkingGroup', '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^[a-z]/, (match) => match.toUpperCase());

export const getAverageStake = (workers: Pick<WorkerFieldsFragment, 'stake'>[]) =>
  sumStakes(workers).divn(workers.length);
