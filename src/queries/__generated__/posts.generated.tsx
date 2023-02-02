import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetForumPostsCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ForumPostWhereInput>;
}>;


export type GetForumPostsCountQuery = { __typename: 'Query', forumPostsConnection: { __typename: 'ForumPostConnection', totalCount: number } };


export const GetForumPostsCountDocument = gql`
    query GetForumPostsCount($where: ForumPostWhereInput) {
  forumPostsConnection(first: 0, where: $where) {
    totalCount
  }
}
    `;

/**
 * __useGetForumPostsCountQuery__
 *
 * To run a query within a React component, call `useGetForumPostsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumPostsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumPostsCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumPostsCountQuery(baseOptions?: Apollo.QueryHookOptions<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>(GetForumPostsCountDocument, options);
      }
export function useGetForumPostsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>(GetForumPostsCountDocument, options);
        }
export type GetForumPostsCountQueryHookResult = ReturnType<typeof useGetForumPostsCountQuery>;
export type GetForumPostsCountLazyQueryHookResult = ReturnType<typeof useGetForumPostsCountLazyQuery>;
export type GetForumPostsCountQueryResult = Apollo.QueryResult<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>;