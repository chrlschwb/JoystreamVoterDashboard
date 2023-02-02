import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCandidatesCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CandidateWhereInput>;
}>;

export type GetCandidatesCountQuery = {
  __typename: 'Query';
  candidatesConnection: { __typename: 'CandidateConnection'; totalCount: number };
};

export const GetCandidatesCountDocument = gql`
  query GetCandidatesCount($where: CandidateWhereInput) {
    candidatesConnection(first: 0, where: $where) {
      totalCount
    }
  }
`;

/**
 * __useGetCandidatesCountQuery__
 *
 * To run a query within a React component, call `useGetCandidatesCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCandidatesCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCandidatesCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetCandidatesCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCandidatesCountQuery, GetCandidatesCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCandidatesCountQuery, GetCandidatesCountQueryVariables>(
    GetCandidatesCountDocument,
    options
  );
}
export function useGetCandidatesCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCandidatesCountQuery, GetCandidatesCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCandidatesCountQuery, GetCandidatesCountQueryVariables>(
    GetCandidatesCountDocument,
    options
  );
}
export type GetCandidatesCountQueryHookResult = ReturnType<typeof useGetCandidatesCountQuery>;
export type GetCandidatesCountLazyQueryHookResult = ReturnType<typeof useGetCandidatesCountLazyQuery>;
export type GetCandidatesCountQueryResult = Apollo.QueryResult<
  GetCandidatesCountQuery,
  GetCandidatesCountQueryVariables
>;
