import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

const defaultOptions = {} as const;

export type GetWorkerGroupsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WorkingGroupWhereInput>;
}>;


export type GetWorkerGroupsQuery = {
  __typename: 'Query', workingGroupsConnection: {
    __typename: 'WorkingGroupConnection', totalCount: number, edges: {
      node: {
        id: string,
        name: string,
        budget: string,
        rewardpaideventgroup: {
          amount: string
        },
        workers: {
          id: string
        }
      }
    }
  }
};


export const GetForumPostsCountDocument = gql`
query getProposalCreatedEvent($where:WorkingGroupWhereInput ) {
  workingGroupsConnection(where: $where) {
    totalCount,
		edges{node{
      id,
      name,
      budget,  
      rewardpaideventgroup{
        amount,        
      },
      workers{
      	id
      }
    }
    }
  }

}
    `;

export function useGetWorkerGroupsLazyQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkerGroupsQuery, GetWorkerGroupsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkerGroupsQuery, GetWorkerGroupsQueryVariables>(GetForumPostsCountDocument, options);
}

export type GetForumPostsCountLazyQueryHookResult = ReturnType<typeof useGetWorkerGroupsLazyQuery>;
export type GetForumPostsCountQueryResult = Apollo.QueryResult<GetWorkerGroupsQuery, GetWorkerGroupsQueryVariables>;