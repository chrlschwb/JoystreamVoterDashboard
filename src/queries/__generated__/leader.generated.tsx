import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

const defaultOptions = {} as const;


///////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////       get leader                 ///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
export type GetLeaderQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.OpeningFilledEventWhereInput>;
}>;


export type LeaderNameFragment = { __typename: 'Leader', membership: { handle: string } };
export type LeaderFragment = { createdAt: any | undefined, groupId: string, workersHired: Array<LeaderNameFragment>, opening: { type: string } }

export type GetLeaderQuery = { __typename: 'Query', openingFilledEvents: Array<LeaderFragment> };

export const GetLeaderDocument = gql`
query getLead($where:OpeningFilledEventWhereInput){
  openingFilledEvents(where:$where){
    createdAt
    groupId
    workersHired{
      membership{
        handle
      }
    }
    opening{
      type     
    }
  }
}
`;


export function useLeadersQuery(baseOptions?: Apollo.QueryHookOptions<GetLeaderQuery, GetLeaderQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetLeaderQuery, GetLeaderQueryVariables>(GetLeaderDocument, options);
}
export function useLeadersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLeaderQuery, GetLeaderQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetLeaderQuery, GetLeaderQueryVariables>(GetLeaderDocument, options);
}
export type GetLeadersQueryHookResult = ReturnType<typeof useLeadersQuery>;
export type GetLeadersLazyQueryHookResult = ReturnType<typeof useLeadersLazyQuery>;
export type GetLeadersQueryResult = Apollo.QueryResult<GetLeaderQuery, GetLeaderQueryVariables>;

///////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////            get port of leader            /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
export type GetPostOfLeaderQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ProposalDiscussionPostWhereInput>;
}>;


export type PostOfLeaderFragment = { __typename: "Leader", createdAt: any | undefined, author: { handle: string }, text: string }
export type GetPostOfLeaderQuery = { __typename: 'Query', proposalDiscussionPosts: Array<PostOfLeaderFragment> };

export const GetPostOfLeaderDocument = gql`
query getPostOfLead($where:ProposalDiscussionPostWhereInput){
  proposalDiscussionPosts(where:$where){ #count, average, max
    createdAt
    author{
      handle
    }
    text
  }
}
`;


export function usePostOfLeadersQuery(baseOptions?: Apollo.QueryHookOptions<GetPostOfLeaderQuery, GetPostOfLeaderQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPostOfLeaderQuery, GetPostOfLeaderQueryVariables>(GetPostOfLeaderDocument, options);
}
export function usePostOfLeadersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostOfLeaderQuery, GetPostOfLeaderQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPostOfLeaderQuery, GetPostOfLeaderQueryVariables>(GetPostOfLeaderDocument, options);
}
export type GetPostOfLeadersQueryHookResult = ReturnType<typeof usePostOfLeadersQuery>;
export type GetPostOfLeadersLazyQueryHookResult = ReturnType<typeof usePostOfLeadersLazyQuery>;
export type GetPostOfLeadersQueryResult = Apollo.QueryResult<GetPostOfLeaderQuery, GetPostOfLeaderQueryVariables>;
