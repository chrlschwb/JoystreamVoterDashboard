import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetOwnedNftsCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.OwnedNftWhereInput>;
}>;

export type GetOwnedNftsCountQuery = {
  __typename: 'Query';
  ownedNftsConnection: { __typename: 'OwnedNftConnection'; totalCount: number };
};

export const GetOwnedNftsCountDocument = gql`
  query GetOwnedNftsCount($where: OwnedNftWhereInput) {
    ownedNftsConnection(first: 0, where: $where) {
      totalCount
    }
  }
`;

/**
 * __useGetOwnedNftsCountQuery__
 *
 * To run a query within a React component, call `useGetOwnedNftsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOwnedNftsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOwnedNftsCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetOwnedNftsCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetOwnedNftsCountQuery, GetOwnedNftsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetOwnedNftsCountQuery, GetOwnedNftsCountQueryVariables>(GetOwnedNftsCountDocument, options);
}
export function useGetOwnedNftsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetOwnedNftsCountQuery, GetOwnedNftsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetOwnedNftsCountQuery, GetOwnedNftsCountQueryVariables>(
    GetOwnedNftsCountDocument,
    options
  );
}
export type GetOwnedNftsCountQueryHookResult = ReturnType<typeof useGetOwnedNftsCountQuery>;
export type GetOwnedNftsCountLazyQueryHookResult = ReturnType<typeof useGetOwnedNftsCountLazyQuery>;
export type GetOwnedNftsCountQueryResult = Apollo.QueryResult<GetOwnedNftsCountQuery, GetOwnedNftsCountQueryVariables>;
