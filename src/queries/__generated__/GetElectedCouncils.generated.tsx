import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetElectedCouncilsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ElectedCouncilWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.ElectedCouncilOrderByInput> | Types.ElectedCouncilOrderByInput>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetElectedCouncilsQuery = { __typename: 'Query', electedCouncils: Array<{ __typename: 'ElectedCouncil', id: string, electedAtBlock: number, endedAtBlock?: number | null, electedAtTime: any, endedAtTime?: any | null, electedAtNetwork: Types.Network, endedAtNetwork?: Types.Network | null, councilMembers: Array<{ __typename: 'CouncilMember', id: string, unpaidReward: string, stake: string, member: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, boundAccounts: Array<string>, handle: string, isVerified: boolean, isFoundingMember: boolean, isCouncilMember: boolean, inviteCount: number, createdAt: any, councilMembers: Array<{ __typename: 'CouncilMember' }>, metadata: { __typename: 'MemberMetadata', name?: string | null, about?: string | null, avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri', avatarUri: string } | null }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }>, stakingaccountaddedeventmember?: Array<{ __typename: 'StakingAccountAddedEvent', createdAt: any, inBlock: number, network: Types.Network, account: string }> | null } }> }> };

export type ElectedCouncilFieldsFragment = { __typename: 'ElectedCouncil', id: string, electedAtBlock: number, endedAtBlock?: number | null, electedAtTime: any, endedAtTime?: any | null, electedAtNetwork: Types.Network, endedAtNetwork?: Types.Network | null, councilMembers: Array<{ __typename: 'CouncilMember', id: string, unpaidReward: string, stake: string, member: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, boundAccounts: Array<string>, handle: string, isVerified: boolean, isFoundingMember: boolean, isCouncilMember: boolean, inviteCount: number, createdAt: any, councilMembers: Array<{ __typename: 'CouncilMember' }>, metadata: { __typename: 'MemberMetadata', name?: string | null, about?: string | null, avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri', avatarUri: string } | null }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }>, stakingaccountaddedeventmember?: Array<{ __typename: 'StakingAccountAddedEvent', createdAt: any, inBlock: number, network: Types.Network, account: string }> | null } }> };

export type CouncilMemberFieldsFragment = { __typename: 'CouncilMember', id: string, unpaidReward: string, stake: string, member: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, boundAccounts: Array<string>, handle: string, isVerified: boolean, isFoundingMember: boolean, isCouncilMember: boolean, inviteCount: number, createdAt: any, councilMembers: Array<{ __typename: 'CouncilMember' }>, metadata: { __typename: 'MemberMetadata', name?: string | null, about?: string | null, avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri', avatarUri: string } | null }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }>, stakingaccountaddedeventmember?: Array<{ __typename: 'StakingAccountAddedEvent', createdAt: any, inBlock: number, network: Types.Network, account: string }> | null } };

export type MemberFieldsFragment = { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, boundAccounts: Array<string>, handle: string, isVerified: boolean, isFoundingMember: boolean, isCouncilMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null, about?: string | null, avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri', avatarUri: string } | null }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }>, stakingaccountaddedeventmember?: Array<{ __typename: 'StakingAccountAddedEvent', createdAt: any, inBlock: number, network: Types.Network, account: string }> | null };

export const MemberFieldsFragmentDoc = gql`
    fragment MemberFields on Membership {
  id
  rootAccount
  controllerAccount
  boundAccounts
  handle
  metadata {
    name
    about
    avatar {
      __typename
      ... on AvatarUri {
        avatarUri
        __typename
      }
    }
    __typename
  }
  isVerified
  isFoundingMember
  isCouncilMember
  inviteCount
  roles {
    id
    group {
      name
      __typename
    }
    createdAt
    isLead
    __typename
  }
  createdAt
  stakingaccountaddedeventmember {
    createdAt
    inBlock
    network
    account
    __typename
  }
  __typename
}
    `;
export const CouncilMemberFieldsFragmentDoc = gql`
    fragment CouncilMemberFields on CouncilMember {
  id
  member {
    ...MemberFields
    councilMembers {
      __typename
    }
    __typename
  }
  unpaidReward
  stake
  __typename
}
    ${MemberFieldsFragmentDoc}`;
export const ElectedCouncilFieldsFragmentDoc = gql`
    fragment ElectedCouncilFields on ElectedCouncil {
  id
  electedAtBlock
  endedAtBlock
  electedAtTime
  endedAtTime
  electedAtNetwork
  endedAtNetwork
  councilMembers {
    ...CouncilMemberFields
  }
}
    ${CouncilMemberFieldsFragmentDoc}`;
export const GetElectedCouncilsDocument = gql`
    query GetElectedCouncils($where: ElectedCouncilWhereInput, $orderBy: [ElectedCouncilOrderByInput!], $offset: Int, $limit: Int) {
  electedCouncils(where: $where, orderBy: $orderBy) {
    ...ElectedCouncilFields
    __typename
  }
}
    ${ElectedCouncilFieldsFragmentDoc}`;

/**
 * __useGetElectedCouncilsQuery__
 *
 * To run a query within a React component, call `useGetElectedCouncilsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElectedCouncilsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElectedCouncilsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetElectedCouncilsQuery(baseOptions?: Apollo.QueryHookOptions<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>(GetElectedCouncilsDocument, options);
      }
export function useGetElectedCouncilsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>(GetElectedCouncilsDocument, options);
        }
export type GetElectedCouncilsQueryHookResult = ReturnType<typeof useGetElectedCouncilsQuery>;
export type GetElectedCouncilsLazyQueryHookResult = ReturnType<typeof useGetElectedCouncilsLazyQuery>;
export type GetElectedCouncilsQueryResult = Apollo.QueryResult<GetElectedCouncilsQuery, GetElectedCouncilsQueryVariables>;