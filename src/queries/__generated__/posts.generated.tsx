import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetForumPostsCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ForumPostWhereInput>;
}>;


export type GetForumPostsCountQuery = {
  __typename: 'Query', forumPostsConnection: { __typename: 'ForumPostConnection', totalCount: number }, forumPosts: Array<{
    __typename: 'ForumPost', createdAt: any, author: {
      handle: string
    }, text: string
  }>
};


export const GetForumPostsCountDocument = gql`
    query GetForumPostsCount($where: ForumPostWhereInput) {
  forumPostsConnection(first: 0, where: $where) {
    totalCount
  }
  forumPosts {
    createdAt
    author{
      handle
    }
    text 
  }
}
    `;

export function useGetForumPostsCountQuery(baseOptions?: Apollo.QueryHookOptions<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>(GetForumPostsCountDocument, options);
}
export function useGetForumPostsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>(GetForumPostsCountDocument, options);
}
export type GetForumPostsCountQueryHookResult = ReturnType<typeof useGetForumPostsCountQuery>;
export type GetForumPostsCountLazyQueryHookResult = ReturnType<typeof useGetForumPostsCountLazyQuery>;
export type GetForumPostsCountQueryResult = Apollo.QueryResult<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>;