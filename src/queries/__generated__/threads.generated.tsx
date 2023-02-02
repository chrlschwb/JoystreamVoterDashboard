import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetForumThreadsCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ForumThreadWhereInput>;
}>;

export type GetForumThreadsCountQuery = {
  __typename: 'Query';
  forumThreadsConnection: { __typename: 'ForumThreadConnection'; totalCount: number };
};

export const GetForumThreadsCountDocument = gql`
  query GetForumThreadsCount($where: ForumThreadWhereInput) {
    forumThreadsConnection(first: 0, where: $where) {
      totalCount
    }
  }
`;

/**
 * __useGetForumThreadsCountQuery__
 *
 * To run a query within a React component, call `useGetForumThreadsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumThreadsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumThreadsCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumThreadsCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetForumThreadsCountQuery, GetForumThreadsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetForumThreadsCountQuery, GetForumThreadsCountQueryVariables>(
    GetForumThreadsCountDocument,
    options
  );
}
export function useGetForumThreadsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumThreadsCountQuery, GetForumThreadsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetForumThreadsCountQuery, GetForumThreadsCountQueryVariables>(
    GetForumThreadsCountDocument,
    options
  );
}
export type GetForumThreadsCountQueryHookResult = ReturnType<typeof useGetForumThreadsCountQuery>;
export type GetForumThreadsCountLazyQueryHookResult = ReturnType<typeof useGetForumThreadsCountLazyQuery>;
export type GetForumThreadsCountQueryResult = Apollo.QueryResult<
  GetForumThreadsCountQuery,
  GetForumThreadsCountQueryVariables
>;
