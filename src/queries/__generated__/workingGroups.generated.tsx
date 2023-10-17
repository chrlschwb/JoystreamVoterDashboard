import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import { MemberFieldsFragmentDoc } from './members.generated';
import * as Apollo from '@apollo/client';
import { GroupIdName } from '@/types';

const defaultOptions = {} as const;


/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////           working groups         ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

export type GetWorkingGroupsNameQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WorkingGroupWhereInput>;
}>;

export type FireTerminatedFieldsFragment = { __typename: "TerminatedWorkerEvent", createdAt: any | undefined };
export type FireExitedFieldsFragment = { __typename: "WorkerExitedEvent", createdAt: any | undefined };
export type WorkerPaymentType = {
  amount: number, paymentType: string, createdAt: any | undefined
}
export type WorkersFragment = {
  id: string,
  stake: number,
  groupId: string,
  membership: {
    handle: string, rootAccount: string, controllerAccount: string
  }
  payouts: Array<WorkerPaymentType>,
  entry: { createdAt: any | undefined },
  terminatedworkereventworker: Array<FireTerminatedFieldsFragment>,
  workerexitedeventworker: Array<FireExitedFieldsFragment>
  rewardAccount: string,
  roleAccount: string,
}

export type GetWorkingGroupsNameQuery = {
  __typename: 'Query', workingGroups: Array<WorkingGroupsNameFragment>
};

export type WorkingGroupsNameFragment = {
  __typename: 'WorkingGroup',
  id: GroupIdName, name: string, workers: Array<WorkersFragment>,
  budget: string
}

export const GetWrokingGroupsNameDocument = gql`
  query GetWorkingGroup($where: WorkingGroupWhereInput){
    workingGroups(where: $where) {
      id
      name
      budget
      workers{
        payouts{ createdAt amount paymentType}
        groupId
        stake
        id
        entry{
          createdAt
        }
        terminatedworkereventworker{
          createdAt
          __typename
        }
        workerexitedeventworker{
          createdAt
          __typename
        }
        membership{
          controllerAccount
          rootAccount
          handle
        }
        roleAccount
        rewardAccount
      }
      __typename
    }
  }
    `;


export function useGetWorkingGroupsNameQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkingGroupsNameQuery, GetWorkingGroupsNameQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupsNameQuery, GetWorkingGroupsNameQueryVariables>(GetWrokingGroupsNameDocument, options);
}
export function useGetWorkingGroupsNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupsNameQuery, GetWorkingGroupsNameQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupsNameQuery, GetWorkingGroupsNameQueryVariables>(GetWrokingGroupsNameDocument, options);
}
export type GetWorkingGroupsNameQueryHookResult = ReturnType<typeof useGetWorkingGroupsNameQuery>;
export type GetWorkingGroupsNameLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupsNameLazyQuery>;
export type GetWorkingGroupsNameQueryResult = Apollo.QueryResult<GetWorkingGroupsNameQuery, GetWorkingGroupsNameQueryVariables>;



/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////           working groups         ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////               workers              /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
export type GetWorkersQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WorkerWhereInput>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type WorkerFieldsFragment = { __typename: 'Worker', id: string, runtimeId: number, applicationId: string, isLead: boolean, rewardPerBlock: string, missingRewardAmount?: string | null, stake: string, membership: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, boundAccounts: Array<string>, handle: string, isVerified: boolean, isFoundingMember: boolean, isCouncilMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null, about?: string | null, avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri', avatarUri: string } | null }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }>, stakingaccountaddedeventmember?: Array<{ __typename: 'StakingAccountAddedEvent', createdAt: any, inBlock: number, network: Types.Network, account: string }> | null }, group: { __typename: 'WorkingGroup', id: string, name: string }, status: { __typename: 'WorkerStatusActive' } | { __typename: 'WorkerStatusLeaving' } | { __typename: 'WorkerStatusLeft' } | { __typename: 'WorkerStatusTerminated' } };
export type WorkerDetailedFieldsFragment = { __typename: 'Worker', roleAccount: string, rewardAccount: string, stakeAccount: string, id: string, runtimeId: number, applicationId: string, isLead: boolean, rewardPerBlock: string, missingRewardAmount?: string | null, stake: string, entry: { __typename: 'OpeningFilledEvent', inBlock: number, network: Types.Network, createdAt: any }, application: { __typename: 'WorkingGroupApplication', id: string, openingId: string, opening: { __typename: 'WorkingGroupOpening', stakeAmount: string } }, membership: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, boundAccounts: Array<string>, handle: string, isVerified: boolean, isFoundingMember: boolean, isCouncilMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null, about?: string | null, avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri', avatarUri: string } | null }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }>, stakingaccountaddedeventmember?: Array<{ __typename: 'StakingAccountAddedEvent', createdAt: any, inBlock: number, network: Types.Network, account: string }> | null }, group: { __typename: 'WorkingGroup', id: string, name: string }, status: { __typename: 'WorkerStatusActive' } | { __typename: 'WorkerStatusLeaving' } | { __typename: 'WorkerStatusLeft' } | { __typename: 'WorkerStatusTerminated' } };

export type GetWorkersQuery = { __typename: 'Query', workers: Array<{ __typename: 'Worker', id: string, runtimeId: number, applicationId: string, isLead: boolean, rewardPerBlock: string, missingRewardAmount?: string | null, stake: string, membership: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, boundAccounts: Array<string>, handle: string, isVerified: boolean, isFoundingMember: boolean, isCouncilMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null, about?: string | null, avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri', avatarUri: string } | null }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }>, stakingaccountaddedeventmember?: Array<{ __typename: 'StakingAccountAddedEvent', createdAt: any, inBlock: number, network: Types.Network, account: string }> | null }, group: { __typename: 'WorkingGroup', id: string, name: string }, status: { __typename: 'WorkerStatusActive' } | { __typename: 'WorkerStatusLeaving' } | { __typename: 'WorkerStatusLeft' } | { __typename: 'WorkerStatusTerminated' } }> };

export type GetWorkerQueryVariables = Types.Exact<{
  where: Types.WorkerWhereUniqueInput;
}>;

export type GetWorkerQuery = { __typename: 'Query', workerByUniqueInput?: { __typename: 'Worker', roleAccount: string, rewardAccount: string, stakeAccount: string, id: string, runtimeId: number, applicationId: string, isLead: boolean, rewardPerBlock: string, missingRewardAmount?: string | null, stake: string, entry: { __typename: 'OpeningFilledEvent', inBlock: number, network: Types.Network, createdAt: any }, application: { __typename: 'WorkingGroupApplication', id: string, openingId: string, opening: { __typename: 'WorkingGroupOpening', stakeAmount: string } }, membership: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, boundAccounts: Array<string>, handle: string, isVerified: boolean, isFoundingMember: boolean, isCouncilMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null, about?: string | null, avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri', avatarUri: string } | null }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }>, stakingaccountaddedeventmember?: Array<{ __typename: 'StakingAccountAddedEvent', createdAt: any, inBlock: number, network: Types.Network, account: string }> | null }, group: { __typename: 'WorkingGroup', id: string, name: string }, status: { __typename: 'WorkerStatusActive' } | { __typename: 'WorkerStatusLeaving' } | { __typename: 'WorkerStatusLeft' } | { __typename: 'WorkerStatusTerminated' } } | null };


export const WorkerFieldsFragmentDoc = gql`
  fragment WorkerFields on Worker {
    id
    runtimeId
    membership {
      ...MemberFields
    }
    group {
      id
      name
    }
    status {
      __typename
    }
    applicationId
    isLead
    rewardPerBlock
    missingRewardAmount
    stake
  }
      ${MemberFieldsFragmentDoc}`;


export const GetWorkersDocument = gql`
    query GetWorkers($where: WorkerWhereInput, $offset: Int, $limit: Int) {
      workers(where: $where, offset: $offset, limit: $limit) {
      ...WorkerFields
    }
  }
      ${WorkerFieldsFragmentDoc}`;


export function useGetWorkersQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkersQuery, GetWorkersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkersQuery, GetWorkersQueryVariables>(GetWorkersDocument, options);
}
export function useGetWorkersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkersQuery, GetWorkersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkersQuery, GetWorkersQueryVariables>(GetWorkersDocument, options);
}
export type GetWorkersQueryHookResult = ReturnType<typeof useGetWorkersQuery>;
export type GetWorkersLazyQueryHookResult = ReturnType<typeof useGetWorkersLazyQuery>;
export type GetWorkersQueryResult = Apollo.QueryResult<GetWorkersQuery, GetWorkersQueryVariables>;

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////            worker reward             //////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
export type RewardPaidFragment = {
  _typename: 'RewardPaidEvent',
  id: string,
  amount: number,
  createdAt: any,
  groupId: string,
  group: {
    leader: {
      membership: {
        handle: string,
      }
    }

  }
  worker: {
    rewardAccount: string,
    roleAccount: string,
    membership: {
      handle: string
      rootAccount: string,
      controllerAccount: string,
    }
  }
}
export type GetRewardsQuery = {
  __typename: 'Query', rewardPaidEvents: Array<RewardPaidFragment>
};

export type GetRewardsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.RewardPaidEventWhereInput>;
}>;

export const RewardPaidEventFieldsFragmentDoc = gql`
      fragment RewardPaidEventFields on RewardPaidEvent {
    id
    amount
    createdAt
    groupId
    worker{
      roleAccount
      rewardAccount
      membership{
        handle
        rootAccount
        controllerAccount
      }
    }
    group {
      leader {
        membership {
          handle
        }
      }
    },
  }
  `;

export const GetRewardsDocument = gql`
      query GetRewards($where: RewardPaidEventWhereInput) {
    rewardPaidEvents(where: $where, limit:100000) {
      ...RewardPaidEventFields
    }
  }
      ${RewardPaidEventFieldsFragmentDoc}`;

export function useGetRewardsQuery(baseOptions?: Apollo.QueryHookOptions<GetRewardsQuery, GetRewardsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetRewardsQuery, GetRewardsQueryVariables>(GetRewardsDocument, options);
}
export function useGetRewardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRewardsQuery, GetRewardsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetRewardsQuery, GetRewardsQueryVariables>(GetRewardsDocument, options);
}
export type GetRewardsQueryHookResult = ReturnType<typeof useGetRewardsQuery>;
export type GetRewardsLazyQueryHookResult = ReturnType<typeof useGetRewardsLazyQuery>;
export type GetRewardsQueryResult = Apollo.QueryResult<GetRewardsQuery, GetRewardsQueryVariables>;

///////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////      get budget spending       ////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

export type BudgetSpendingFragment = {
  __typename: 'BudgetSpendingEvents',
  amount: number,
  createdAt: any,
  groupId: string,
  reciever: string,
  group: {
    leader: {
      membership: {
        handle: string
      }
    }
  }
}
export type GetBudgetSpendingQuery = {
  __typename: 'Query',
  budgetSpendingEvents: Array<BudgetSpendingFragment>
};

export type GetBudgetSpendingQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BudgetSpendingEventWhereInput>;
}>;


export const GetBudgetSpendingDocument = gql`
query GetBudgetSpending($where: BudgetSpendingEventWhereInput) {
  budgetSpendingEvents(where: $where, limit:500000) {
    amount
    createdAt
    groupId
    reciever
    group{
      leader{
        membership{
          handle
        }
      }
    }
  }
}

`;

export function useGetBudgetSpendingQuery(baseOptions?: Apollo.QueryHookOptions<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>(GetBudgetSpendingDocument, options);
}
export function useGetBudgetSpendingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>(GetBudgetSpendingDocument, options);
}
export type GetBudgetSpendingQueryHookResult = ReturnType<typeof useGetBudgetSpendingQuery>;
export type GetBudgetSpendingLazyQueryHookResult = ReturnType<typeof useGetBudgetSpendingLazyQuery>;
export type GetBudgetSpendingQueryResult = Apollo.QueryResult<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>;
