import BN from 'bn.js';

import { sumStakes } from '@/helpers';
import {
  BudgetSpendingFragment,
  RewardPaidFragment,
  WorkerFieldsFragment, WorkerMemberFragment, WorkingGroupFieldsFragment,
} from '@/queries';

export const GroupIdToGroupParam = {
  contentWorkingGroup: 'Content',
  forumWorkingGroup: 'Forum',
  appWorkingGroup: 'App',
  membershipWorkingGroup: 'Membership',
  distributionWorkingGroup: 'Distribution',
  storageWorkingGroup: 'Storage',
  operationsWorkingGroupAlpha: 'Builders',
  operationsWorkingGroupBeta: 'HR',
  operationsWorkingGroupGamma: 'Marketing',
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
  leader?: string;
  spendingReward?: number,
  spendingBudget?: number,
  hire?: number,
  fireExited?: number,
  fireTerminated?: number,
  slashed?: number,
  workers:WorkerMemberFragment[],
  debt:number
}



export const asWorkingGroup = (
  group: WorkingGroupFieldsFragment,
): WorkingGroup => {
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
    leader: group.leader?.membership.handle,
    slashed: group.stakeslashedeventgroup.length,
    fireExited: group.workerexitedeventgroup.length,
    fireTerminated: group.terminatedworkereventgroup.length,
    hire: group.openingfilledeventgroup.length,
    spendingBudget: group.budgetspendingeventgroup.reduce((a: number, b) => { return a + Number(b.amount) }, 0),
    spendingReward: group.rewardpaideventgroup.reduce((a: number, b) => { return a + Number(b.amount) }, 0),
    workers:group.workers,
    debt: group.workers.reduce((a: number, b) => { return a + Number(b.stake) }, 0)
  };
};


export const asWorkingGroupName = (name: string) =>
  name
    .replace('WorkingGroup', '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^[a-z]/, (match) => match.toUpperCase());

export const getAverageStake = (workers: Pick<WorkerFieldsFragment, 'stake'>[]) =>
  sumStakes(workers).divn(workers.length);


export interface BudgetSpending {
  amount: number,
  create: string,
  groupId: string,
  leader: string,
  receive:string,
}

export const asBudgetSpending = (data: BudgetSpendingFragment): BudgetSpending => ({
  amount: data.amount,
  create: data.createdAt,
  groupId: data.groupId,
  leader: data.group.leader.membership.handle,
  receive:data.reciever
})

export interface RewardPaid {
  amount: number,
  groupId: string,
  leader: string,
  create: string,
  rewardAccount:string,
  roleAccount:string,
  rootAccount:string,
  controlAccount:string,
  worker:string
}

export interface RewardBudgetWorker{
  worker:string,
  budgetAmount:number,
}
export const asRewardPaid = (data: RewardPaidFragment): RewardPaid => ({
  amount: data.amount,
  groupId: data.groupId,
  leader: data.group.leader.membership.handle,
  create: data.createdAt,
  worker: data.worker.membership.handle,
  rewardAccount:data.worker.rewardAccount,
  roleAccount:data.worker.roleAccount,
  rootAccount:data.worker.membership.rootAccount,
  controlAccount:data.worker.membership.controllerAccount
})
