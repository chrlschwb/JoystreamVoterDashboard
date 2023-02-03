import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import { MemberFieldsFragmentDoc } from './members.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetWorkingGroupsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WorkingGroupWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.WorkingGroupOrderByInput> | Types.WorkingGroupOrderByInput>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetWorkingGroupsQuery = { __typename: 'Query', workingGroups: Array<{ __typename: 'WorkingGroup', id: string, name: string, budget: string, metadata?: { __typename: 'WorkingGroupMetadata', about?: string | null, description?: string | null, status?: string | null, statusMessage?: string | null } | null, workers: Array<{ __typename: 'Worker', stake: string }>, leader?: { __typename: 'Worker', membershipId: string, isActive: boolean } | null }> };

export type GetWorkersQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WorkerWhereInput>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetWorkersQuery = { __typename: 'Query', workers: Array<{ __typename: 'Worker', id: string, runtimeId: number, applicationId: string, isLead: boolean, rewardPerBlock: string, missingRewardAmount?: string | null, stake: string, membership: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, boundAccounts: Array<string>, handle: string, isVerified: boolean, isFoundingMember: boolean, isCouncilMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null, about?: string | null, avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri', avatarUri: string } | null }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }>, stakingaccountaddedeventmember?: Array<{ __typename: 'StakingAccountAddedEvent', createdAt: any, inBlock: number, network: Types.Network, account: string }> | null }, group: { __typename: 'WorkingGroup', id: string, name: string }, status: { __typename: 'WorkerStatusActive' } | { __typename: 'WorkerStatusLeaving' } | { __typename: 'WorkerStatusLeft' } | { __typename: 'WorkerStatusTerminated' } }> };

export type WorkingGroupFieldsFragment = { __typename: 'WorkingGroup', id: string, name: string, budget: string, metadata?: { __typename: 'WorkingGroupMetadata', about?: string | null, description?: string | null, status?: string | null, statusMessage?: string | null } | null, workers: Array<{ __typename: 'Worker', stake: string }>, leader?: { __typename: 'Worker', membershipId: string, isActive: boolean } | null };

export type WorkingGroupMetadataFieldsFragment = { __typename: 'WorkingGroupMetadata', about?: string | null, description?: string | null, status?: string | null, statusMessage?: string | null };

export type WorkerFieldsFragment = { __typename: 'Worker', id: string, runtimeId: number, applicationId: string, isLead: boolean, rewardPerBlock: string, missingRewardAmount?: string | null, stake: string, membership: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, boundAccounts: Array<string>, handle: string, isVerified: boolean, isFoundingMember: boolean, isCouncilMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null, about?: string | null, avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri', avatarUri: string } | null }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }>, stakingaccountaddedeventmember?: Array<{ __typename: 'StakingAccountAddedEvent', createdAt: any, inBlock: number, network: Types.Network, account: string }> | null }, group: { __typename: 'WorkingGroup', id: string, name: string }, status: { __typename: 'WorkerStatusActive' } | { __typename: 'WorkerStatusLeaving' } | { __typename: 'WorkerStatusLeft' } | { __typename: 'WorkerStatusTerminated' } };

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
    stake
  }
  leader {
    membershipId
    isActive
  }
}
    ${WorkingGroupMetadataFieldsFragmentDoc}`;
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
export const GetWorkingGroupsDocument = gql`
    query GetWorkingGroups($where: WorkingGroupWhereInput, $orderBy: [WorkingGroupOrderByInput!], $offset: Int, $limit: Int) {
  workingGroups(where: $where, orderBy: $orderBy, offset: $offset, limit: $limit) {
    ...WorkingGroupFields
  }
}
    ${WorkingGroupFieldsFragmentDoc}`;

/**
 * __useGetWorkingGroupsQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetWorkingGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>(GetWorkingGroupsDocument, options);
      }
export function useGetWorkingGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>(GetWorkingGroupsDocument, options);
        }
export type GetWorkingGroupsQueryHookResult = ReturnType<typeof useGetWorkingGroupsQuery>;
export type GetWorkingGroupsLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupsLazyQuery>;
export type GetWorkingGroupsQueryResult = Apollo.QueryResult<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>;
export const GetWorkersDocument = gql`
    query GetWorkers($where: WorkerWhereInput, $offset: Int, $limit: Int) {
  workers(where: $where, offset: $offset, limit: $limit) {
    ...WorkerFields
  }
}
    ${WorkerFieldsFragmentDoc}`;

/**
 * __useGetWorkersQuery__
 *
 * To run a query within a React component, call `useGetWorkersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkersQuery({
 *   variables: {
 *      where: // value for 'where'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetWorkersQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkersQuery, GetWorkersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkersQuery, GetWorkersQueryVariables>(GetWorkersDocument, options);
      }
export function useGetWorkersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkersQuery, GetWorkersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkersQuery, GetWorkersQueryVariables>(GetWorkersDocument, options);
        }
export type GetWorkersQueryHookResult = ReturnType<typeof useGetWorkersQuery>;
export type GetWorkersLazyQueryHookResult = ReturnType<typeof useGetWorkersLazyQuery>;
export type GetWorkersQueryResult = Apollo.QueryResult<GetWorkersQuery, GetWorkersQueryVariables>;