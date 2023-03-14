import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;

export type GetForumPostsCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ForumPostWhereInput>;
}>;

export type ForumPostFragment = {
  node: {
    createdAt: string,
    text: string,
    author: {
      handle: string
    }
  }
}

export type GetForumPostsCountQuery = {
  __typename: 'Query', forumPostsConnection: { __typename: 'ForumPostConnection', totalCount: number, edges: Array<ForumPostFragment> }, forumPosts: Array<{
    __typename: 'ForumPost', createdAt: any, author: {
      handle: string
    }, text: string
  }>
};


export const GetForumPostsCountDocument = gql`
    query GetForumPostsCount($where: ForumPostWhereInput) {
  forumPostsConnection(where: $where ) {
    totalCount
    edges{      
      node{
        createdAt
        text
        author{
          handle
        }
      }
    }
  }
  forumPosts (limit:10000){
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