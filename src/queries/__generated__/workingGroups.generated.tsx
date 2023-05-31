import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import { MemberFieldsFragmentDoc } from './members.generated';
import * as Apollo from '@apollo/client';

const defaultOptions = {} as const;

/////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////           working groups         ///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

export type SpendingRewardFieldsFragment = { __typename: "RewardPaidEvent", createdAt: any | undefined, deletedAt: any | undefined, amount: number, worker: { membership: { handle: string } } };
export type SpendingBudgetFieldsFragment = { __typename: "BudgetSpendingEvent", createdAt: any | undefined, deletedAt: any | undefined, amount: number };
export type HireOpeningFillFieldsFragment = { __typename: "OpeningFilledEvent", createdAt: any | undefined, deletedAt: any | undefined, workersHired: { membership: { handle: string } } };
export type FireTerminatedFieldsFragment = { __typename: "TerminatedWorkerEvent", createdAt: any | undefined, deletedAt: any | undefined, worker: { membership: { handle: string } } };
export type FireExitedFieldsFragment = { __typename: "WorkerExitedEvent", createdAt: any | undefined, deletedAt: any | undefined, worker: { membership: { handle: string } } };
export type SlashStakeFieldsFragment = { __typename: "StakeSlashedEvent", createdAt: any | undefined, deletedAt: any | undefined, worker: { membership: { handle: string } } };
export type WorkerMemberFragment = { __typename: 'Worker',membership:{handle:string}, stake: string };

export type WorkingGroupFieldsFragment = {
  __typename: 'WorkingGroup',
  id: string,
  name: string,
  budget: string,
  metadata?: {
    __typename: 'WorkingGroupMetadata',
    about?: string | null,
    description?: string | null,
    status?: string | null,
    statusMessage?: string | null
  } | null,
  rewardpaideventgroup: Array<SpendingRewardFieldsFragment>,
  budgetspendingeventgroup: Array<SpendingBudgetFieldsFragment>,
  openingfilledeventgroup: Array<HireOpeningFillFieldsFragment>,
  terminatedworkereventgroup: Array<FireTerminatedFieldsFragment>,
  workerexitedeventgroup: Array<FireExitedFieldsFragment>,
  stakeslashedeventgroup: Array<SlashStakeFieldsFragment>,
  workers: Array<WorkerMemberFragment>,
  leader: { __typename: 'Worker', membershipId: string, isActive: boolean, membership: { handle: string } } | null
};

export const SpendingRewardFieldsFragmentDoc = gql`
fragment SpendingRewardFields on RewardPaidEvent {
  createdAt
  deletedAt
    amount
    worker{
      membership{
        handle
      }
    }
} 
`
export const SpendingBudgetFieldsFragmentDoc = gql`
fragment SpendingBudgetFields on BudgetSpendingEvent {
  createdAt
  deletedAt
   amount
}
`
export const HireOpeningFillFieldsFragmentDoc = gql`
fragment HireOpeningFillFields on OpeningFilledEvent{
  createdAt
  deletedAt
   workersHired{
        membership{
          handle
        }
      }
}
`
export const FireTerminatedFieldsFragmentDoc = gql`
fragment FireTerminatedWorkerFields on TerminatedWorkerEvent {
  createdAt
  deletedAt
  worker{
        membership{
          handle
        }
      }
}
`
export const FireExitedFieldsFragmentDoc = gql`
fragment FireWorkeredExitedFields on WorkerExitedEvent{
  createdAt
  deletedAt
  worker{
        membership{
          handle
        }
      }
}
`
export const SlashStakeFieldsFragmentDoc = gql`
fragment SlashStakeFields on StakeSlashedEvent{
  createdAt
  deletedAt
      worker{
        membership{
          handle
        }
      }
}
`

export type GetWorkingGroupsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WorkingGroupWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.WorkingGroupOrderByInput> | Types.WorkingGroupOrderByInput>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type GetWorkingGroupsQuery = { __typename: 'Query', workingGroups: Array<WorkingGroupFieldsFragment> };

export const WorkingGroupMetadataFieldsFragmentDoc = gql`
    fragment WorkingGroupMetadataFields on WorkingGroupMetadata {
  about
  description
  status
  statusMessage
}
    `;

export const WorkingGroupFieldsFragmentDoc = gql`
    fragment WorkingGroupFields on WorkingGroup {
  id
  name
  budget
  metadata {
    ...WorkingGroupMetadataFields
  }
  workers {
    membership{
      handle
    }
    stake
  }
  rewardpaideventgroup{
    ...SpendingRewardFields
  }
  budgetspendingeventgroup{
    ...SpendingBudgetFields
  }
  openingfilledeventgroup{
    ...HireOpeningFillFields
  }
  terminatedworkereventgroup{
    ...FireTerminatedWorkerFields
  }
  workerexitedeventgroup{
    ...FireWorkeredExitedFields
  }
  stakeslashedeventgroup{
    ...SlashStakeFields
  }
  leader {
    membershipId
    isActive
    membership {
      handle
    }
  }
}
    ${WorkingGroupMetadataFieldsFragmentDoc}
    ${SpendingRewardFieldsFragmentDoc}
    ${SpendingBudgetFieldsFragmentDoc}
    ${HireOpeningFillFieldsFragmentDoc}
    ${FireTerminatedFieldsFragmentDoc}
    ${FireExitedFieldsFragmentDoc}
    ${SlashStakeFieldsFragmentDoc}
    `;


export const GetWorkingGroupsDocument = gql`
query GetWorkingGroups($where: WorkingGroupWhereInput, $orderBy: [WorkingGroupOrderByInput!], $offset: Int, $limit: Int) {
workingGroups(where: $where, orderBy: $orderBy, offset: $offset, limit: $limit) {
...WorkingGroupFields
}
}
${WorkingGroupFieldsFragmentDoc}`;



export function useGetWorkingGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>(GetWorkingGroupsDocument, options);
}
export function useGetWorkingGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>(GetWorkingGroupsDocument, options);
}
export type GetWorkingGroupsQueryHookResult = ReturnType<typeof useGetWorkingGroupsQuery>;
export type GetWorkingGroupsLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupsLazyQuery>;
export type GetWorkingGroupsQueryResult = Apollo.QueryResult<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>;

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
  rewardAccount: string,
  createdAt: any,
  groupId: string,
  group: {
    leader: {
      membership: {
        handle: string
      }
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
    rewardAccount
    createdAt
    groupId
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
  budgetSpendingEvents(where: $where,limit:100000) {
    amount
    createdAt
    groupId
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
