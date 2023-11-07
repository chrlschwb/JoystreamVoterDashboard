import BN from 'bn.js';

import { sumStakes } from '@/helpers';
import {
  BudgetSpendingFragment,
  RewardPaidFragment,
  WorkerFieldsFragment,
  // WorkerMemberFragment,
  // WorkingGroupFieldsFragment,
  WorkingGroupsNameFragment,
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

export interface WorkingGroupName {
  id: GroupIdName;
  name: string;
  debt: number;
  budget?: BN;
}

export const asWorkingGroupAndWork = (group: WorkingGroupsNameFragment): WorkingGroupName => {
  return {
    id: group.id,
    name: group.name,
    debt: group.workers.reduce((a: number, b) => {
      return a + Number(b.stake);
    }, 0),
    budget: new BN(group.budget),
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
  amount: number;
  create: string;
  groupId: string;
  leader: string;
  receive: string;
}

export const asBudgetSpending = (data: BudgetSpendingFragment): BudgetSpending => ({
  amount: data.amount,
  create: data.createdAt,
  groupId: data.groupId,
  leader: data.group.leader?.membership.handle,
  receive: data.reciever,
});

export interface RewardPaid {
  amount: number;
  groupId: string;
  leader: string;
  create: string;
  rewardAccount: string;
  roleAccount: string;
  rootAccount: string;
  controlAccount: string;
  worker: string;
}

export interface RewardBudgetWorker {
  worker: string;
  budgetAmount: number;
}
export const asRewardPaid = (data: RewardPaidFragment): RewardPaid => ({
  amount: data.amount,
  groupId: data.groupId,
  leader: data.group.leader?.membership.handle,
  create: data.createdAt,
  worker: data.worker?.membership.handle,
  rewardAccount: data.worker.rewardAccount,
  roleAccount: data.worker.roleAccount,
  rootAccount: data.worker?.membership.rootAccount,
  controlAccount: data.worker?.membership.controllerAccount,
});
