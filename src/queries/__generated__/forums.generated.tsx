import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetForumCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ForumPostWhereInput>;
}>;


export type GetForumCountQuery = { __typename: 'Query', forumPostsConnection: { __typename: 'ForumPostConnection', totalCount: number } };


export const GetForumCountDocument = gql`
    query GetForumCount($where: ForumPostWhereInput) {
  forumPostsConnection(first: 0, where: $where) {
    totalCount
  }
}
    `;

/**
 * __useGetForumCountQuery__
 *
 * To run a query within a React component, call `useGetForumCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumCountQuery(baseOptions?: Apollo.QueryHookOptions<GetForumCountQuery, GetForumCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetForumCountQuery, GetForumCountQueryVariables>(GetForumCountDocument, options);
      }
export function useGetForumCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetForumCountQuery, GetForumCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetForumCountQuery, GetForumCountQueryVariables>(GetForumCountDocument, options);
        }
export type GetForumCountQueryHookResult = ReturnType<typeof useGetForumCountQuery>;
export type GetForumCountLazyQueryHookResult = ReturnType<typeof useGetForumCountLazyQuery>;
export type GetForumCountQueryResult = Apollo.QueryResult<GetForumCountQuery, GetForumCountQueryVariables>;