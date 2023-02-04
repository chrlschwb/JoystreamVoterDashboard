import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;

export type GetCandidatesCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CandidateWhereInput>;
}>;

export type GetCastVotesCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CastVoteWhereInput>;
}>;



export type GetCandidatesCountQuery = { __typename: 'Query', candidatesConnection: { __typename: 'CandidateConnection', totalCount: number } };
export type GetCastVotesCountQuery = { __typename: 'Query', castVotesConnection: { __typename: 'CastVoteConnection', totalCount: number } };


export const GetCandidatesCountDocument = gql`
  query GetCandidatesCount($where: CandidateWhereInput) {
  candidatesConnection(first: 0, where: $where) {
    totalCount
  }
}
    `;

export const GetCastVotesCountDocument = gql`
query GetCastVotesCount($where: CastVoteWhereInput) {
  castVotesConnection(first: 0, where: $where) {
    totalCount
  }
}
    `;


export function useGetCandidatesCountQuery(baseOptions?: Apollo.QueryHookOptions<GetCandidatesCountQuery, GetCandidatesCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCandidatesCountQuery, GetCandidatesCountQueryVariables>(GetCandidatesCountDocument, options);
}
export function useGetCastVotesCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCastVotesCountQuery, GetCastVotesCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCastVotesCountQuery, GetCastVotesCountQueryVariables>(GetCastVotesCountDocument, options);
}
