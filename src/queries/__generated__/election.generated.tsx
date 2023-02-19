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


export function useGetElectionsQuery(baseOptions?: Apollo.QueryHookOptions<GetElectionsQuery, GetElectionsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetElectionsQuery, GetElectionsQueryVariables>(GetElectionsDocument, options);
}
export function useGetElectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetElectionsQuery, GetElectionsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetElectionsQuery, GetElectionsQueryVariables>(GetElectionsDocument, options);
}
export type GetElectionsQueryHookResult = ReturnType<typeof useGetElectionsQuery>;
export type GetElectionsLazyQueryHookResult = ReturnType<typeof useGetElectionsLazyQuery>;
export type GetElectionsQueryResult = Apollo.QueryResult<GetElectionsQuery, GetElectionsQueryVariables>;