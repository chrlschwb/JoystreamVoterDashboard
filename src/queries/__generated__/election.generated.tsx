import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCastVotesCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CastVoteWhereInput>;
}>;


export type GetCastVotesCountQuery = { __typename: 'Query', castVotesConnection: { __typename: 'CastVoteConnection', totalCount: number } };


export const GetCastVotesCountDocument = gql`
    query GetCastVotesCount($where: CastVoteWhereInput) {
  castVotesConnection(first: 0, where: $where) {
    totalCount
  }
}
    `;

/**
 * __useGetCastVotesCountQuery__
 *
 * To run a query within a React component, call `useGetCastVotesCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCastVotesCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCastVotesCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCastVotesCountQuery(baseOptions?: Apollo.QueryHookOptions<GetCastVotesCountQuery, GetCastVotesCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCastVotesCountQuery, GetCastVotesCountQueryVariables>(GetCastVotesCountDocument, options);
      }
export function useGetCastVotesCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCastVotesCountQuery, GetCastVotesCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCastVotesCountQuery, GetCastVotesCountQueryVariables>(GetCastVotesCountDocument, options);
        }
export type GetCastVotesCountQueryHookResult = ReturnType<typeof useGetCastVotesCountQuery>;
export type GetCastVotesCountLazyQueryHookResult = ReturnType<typeof useGetCastVotesCountLazyQuery>;
export type GetCastVotesCountQueryResult = Apollo.QueryResult<GetCastVotesCountQuery, GetCastVotesCountQueryVariables>;