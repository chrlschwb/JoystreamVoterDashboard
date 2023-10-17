import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;

export type GetForumThreadsCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ForumThreadWhereInput>;
}>;


export type GetForumThreadsCountQuery = { __typename: 'Query', forumThreadsConnection: { __typename: 'ForumThreadConnection', totalCount: number } };


export const GetForumThreadsCountDocument = gql`
    query GetForumThreadsCount($where: ForumThreadWhereInput) {
  forumThreadsConnection(first: 0, where: $where) {
    totalCount
  }
}
    `;


export function useGetForumThreadsCountQuery(baseOptions?: Apollo.QueryHookOptions<GetForumThreadsCountQuery, GetForumThreadsCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumThreadsCountQuery, GetForumThreadsCountQueryVariables>(GetForumThreadsCountDocument, options);
}
export function useGetForumThreadsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetForumThreadsCountQuery, GetForumThreadsCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumThreadsCountQuery, GetForumThreadsCountQueryVariables>(GetForumThreadsCountDocument, options);
}
export type GetForumThreadsCountQueryHookResult = ReturnType<typeof useGetForumThreadsCountQuery>;
export type GetForumThreadsCountLazyQueryHookResult = ReturnType<typeof useGetForumThreadsCountLazyQuery>;
export type GetForumThreadsCountQueryResult = Apollo.QueryResult<GetForumThreadsCountQuery, GetForumThreadsCountQueryVariables>;