import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { title } from 'process';

const defaultOptions = {} as const;

export type GetListPorposalQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ProposalCreatedEventWhereInput>;
}>;


export type GetListProposalQuery = {
  __typename: 'Query', proposalCreatedEventsConnection: {
    __typename: 'ProposalCreatedEventConnection', totalCount: number,
    edges: {
      node: {
        proposal:
        {
          id: string,
          title: string,
          createAt: string,
          status: {
            __typename: string
          }
        }
      }
    }
  }
};


export const GetForumPostsCountDocument = gql`
query getProposalCreatedEvent($where:ProposalCreatedEventWhereInput ) {
  proposalCreatedEventsConnection(where: $where,last:10000) {
 		   totalCount,
    edges{
      node{
    
        proposal{
          id
          title,
          createdAt,
          status{
            __typename
          }
        
        }
      }
    }
  }
}

  `;

export function useGetListPorposalLazyQuery(baseOptions?: Apollo.QueryHookOptions<GetListProposalQuery, GetListPorposalQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetListProposalQuery, GetListPorposalQueryVariables>(GetForumPostsCountDocument, options);
}

export type GetForumPostsCountLazyQueryHookResult = ReturnType<typeof useGetListPorposalLazyQuery>;
export type GetForumPostsCountQueryResult = Apollo.QueryResult<GetListProposalQuery, GetListPorposalQueryVariables>;