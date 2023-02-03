import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetElectionsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ElectionRoundWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.ElectionRoundOrderByInput> | Types.ElectionRoundOrderByInput>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetElectionsQuery = { __typename: 'Query', electionRounds: Array<{ __typename: 'ElectionRound', id: string, cycleId: number, endedAtBlock?: number | null, endedAtTime?: any | null, endedAtNetwork?: Types.Network | null, candidates: Array<{ __typename: 'Candidate', stake: string }>, castVotes: Array<{ __typename: 'CastVote', voteForId?: string | null }> }> };

export type ElectionRoundFieldsFragment = { __typename: 'ElectionRound', id: string, cycleId: number, endedAtBlock?: number | null, endedAtTime?: any | null, endedAtNetwork?: Types.Network | null, candidates: Array<{ __typename: 'Candidate', stake: string }>, castVotes: Array<{ __typename: 'CastVote', voteForId?: string | null }> };

export const ElectionRoundFieldsFragmentDoc = gql`
    fragment ElectionRoundFields on ElectionRound {
  id
  cycleId
  endedAtBlock
  endedAtTime
  endedAtNetwork
  candidates {
    stake
  }
  castVotes {
    voteForId
  }
}
    `;
export const GetElectionsDocument = gql`
    query GetElections($where: ElectionRoundWhereInput, $orderBy: [ElectionRoundOrderByInput!], $offset: Int, $limit: Int) {
  electionRounds(where: $where, orderBy: $orderBy, offset: $offset, limit: $limit) {
    ...ElectionRoundFields
    __typename
  }
}
    ${ElectionRoundFieldsFragmentDoc}`;

/**
 * __useGetElectionsQuery__
 *
 * To run a query within a React component, call `useGetElectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElectionsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetElectionsQuery(baseOptions?: Apollo.QueryHookOptions<GetElectionsQuery, GetElectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetElectionsQuery, GetElectionsQueryVariables>(GetElectionsDocument, options);
      }
export function useGetElectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetElectionsQuery, GetElectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetElectionsQuery, GetElectionsQueryVariables>(GetElectionsDocument, options);
        }
export type GetElectionsQueryHookResult = ReturnType<typeof useGetElectionsQuery>;
export type GetElectionsLazyQueryHookResult = ReturnType<typeof useGetElectionsLazyQuery>;
export type GetElectionsQueryResult = Apollo.QueryResult<GetElectionsQuery, GetElectionsQueryVariables>;