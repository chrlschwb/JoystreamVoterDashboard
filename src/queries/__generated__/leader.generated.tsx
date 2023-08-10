import { GroupIdName } from '@/types';
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
export type LeaderFragment = { createdAt: any | undefined, groupId: GroupIdName, workersHired: Array<LeaderNameFragment>, opening: { type: string } }

export type GetLeaderQuery = { __typename: 'Query', openingFilledEvents: Array<LeaderFragment> };

export const GetLeaderDocument = gql`
query getLead($where:OpeningFilledEventWhereInput){
  openingFilledEvents(where:$where,limit:50000){
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

///////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////            get termiated worker          /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
export type GetTerminatedWorkerQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.TerminatedWorkerEventWhereInput>;
}>;


export type TerminatedWorkerFragment = {
  __typename: "TerminatedWorkder",
  createdAt: any | undefined,
  groupId: string,
  group: {
    leader: {
      membership: {
        handle: string
      }
    }
  }
  worker: {
    membership: {
      handle: string
    },
    isLead: boolean
  }
}
export type GetTerminatedWorkerQuery = {
  __typename: 'Query', terminatedWorkerEvents: Array<TerminatedWorkerFragment>
};

export const GetTerminatedDocument = gql`
query getTerminatedWorker($where: TerminatedWorkerEventWhereInput) {
  terminatedWorkerEvents(where: $where,  limit:50000) {
    createdAt
    groupId
    group{
      leader{
        membership{
          handle
        }
      }
    }
    worker {
      membership {
        handle
      }
      isLead
    }
  }
}
`;


export function useTerminatedQuery(baseOptions?: Apollo.QueryHookOptions<GetTerminatedWorkerQuery, GetTerminatedWorkerQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTerminatedWorkerQuery, GetTerminatedWorkerQueryVariables>(GetTerminatedDocument, options);
}
export function useTerminatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTerminatedWorkerQuery, GetTerminatedWorkerQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTerminatedWorkerQuery, GetTerminatedWorkerQueryVariables>(GetTerminatedDocument, options);
}
export type GetTerminatedWorkerQueryHookResult = ReturnType<typeof useTerminatedQuery>;
export type GetTerminatedWorkerLazyQueryHookResult = ReturnType<typeof useTerminatedLazyQuery>;
export type GetTerminatedWorkderQueryResult = Apollo.QueryResult<GetTerminatedWorkerQuery, GetTerminatedWorkerQueryVariables>;


///////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////               get exited worker          /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
export type GetExiteddWorkerQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WorkerExitedEventWhereInput>;
}>;


export type ExitedWorkerFragment = {
  __typename: "ExitedWorker",
  createdAt: any | undefined,
  groupId: string,
  group: {
    leader: {
      membership: {
        handle: string
      }
    }
  },
  worker: {
    membership: {
      handle: string
    },
    isLead: boolean
  }
}
export type GetExitedWorkerQuery = {
  __typename: 'Query', workerExitedEvents: Array<ExitedWorkerFragment>
};

export const GetExitedDocument = gql`
query getExitedWorker($where: WorkerExitedEventWhereInput) {
  workerExitedEvents(where: $where,limit:50000) {
    createdAt
    groupId
    group {
      leader {
        membership {
          handle
        }
      }
    }
    worker {
      membership {
        handle
      }
      isLead
    }
  }
}

`;


export function useExitedQuery(baseOptions?: Apollo.QueryHookOptions<GetExitedWorkerQuery, GetExiteddWorkerQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetExitedWorkerQuery, GetExiteddWorkerQueryVariables>(GetExitedDocument, options);
}
export function useExitedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExitedWorkerQuery, GetExiteddWorkerQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetExitedWorkerQuery, GetExiteddWorkerQueryVariables>(GetExitedDocument, options);
}
export type GetExitedWorkerQueryHookResult = ReturnType<typeof useExitedQuery>;
export type GetExitedWorkerLazyQueryHookResult = ReturnType<typeof useExitedLazyQuery>;
export type GetExitedWorkderQueryResult = Apollo.QueryResult<GetExitedWorkerQuery, GetExiteddWorkerQueryVariables>;


///////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////               get slashed worker         /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
export type GetSlasheddWorkerQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WorkEntrySlashedEventWhereInput>;
}>;


export type SlashedWorkerFragment = {
  __typename: "WorkEntrySlashedEvents",
  createdAt: any | undefined,
  entry: {
    worker: {
      handle: string
    }
  }
}
export type GetSlashedWorkerQuery = {
  __typename: 'Query', workEntrySlashedEvents: Array<SlashedWorkerFragment>
};

export const GetSlashedDocument = gql`
query getSlashWorker($where: WorkEntrySlashedEventWhereInput) {
  workEntrySlashedEvents(where: $where,limit:50000) {
    createdAt
    entry {
      worker {
        handle
      }
    }
  }
}

`;


export function useSlashedQuery(baseOptions?: Apollo.QueryHookOptions<GetSlashedWorkerQuery, GetSlasheddWorkerQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetSlashedWorkerQuery, GetSlasheddWorkerQueryVariables>(GetSlashedDocument, options);
}
export function useSlashedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSlashedWorkerQuery, GetSlasheddWorkerQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetSlashedWorkerQuery, GetSlasheddWorkerQueryVariables>(GetSlashedDocument, options);
}
export type GetSlashedWorkerQueryHookResult = ReturnType<typeof useSlashedQuery>;
export type GetslashedWorkerLazyQueryHookResult = ReturnType<typeof useSlashedLazyQuery>;
export type GetSlashedWorkderQueryResult = Apollo.QueryResult<GetSlashedWorkerQuery, GetSlasheddWorkerQueryVariables>;

///////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////               get leader terminated      /////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
export type GetTerminatedLeadQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.TerminatedLeaderEventWhereInput>;
}>;

export type TerminatedLeadagment = {
  createdAt: any | undefined;
  groupId: string;
  worker: {
    membership: {
      handle: string;
    };
  };
};

export type GetTerminatedLeadQuery = {
  __typename: 'Query',
  terminatedLeaderEvents: Array<TerminatedLeadagment>
};

export const GetTerminatedLeadDocument = gql`
  query getTerminatedLead($where: TerminatedLeaderEventWhereInput) {
    terminatedLeaderEvents(where: $where,limit:50000) {

      createdAt
      groupId
      worker {
        membership {
          handle
        }
      }
    }
  }
`;

export function useTermiatedLeadQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTerminatedLeadQuery, GetTerminatedLeadQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTerminatedLeadQuery, GetTerminatedLeadQueryVariables>(GetTerminatedLeadDocument, options);
}


export function useTerminatedLeadLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetTerminatedLeadQuery, GetTerminatedLeadQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTerminatedLeadQuery, GetTerminatedLeadQueryVariables>(GetTerminatedLeadDocument, options);
}


export type GetTerminatedLeadQueryHookResult = ReturnType<typeof useTermiatedLeadQuery>;
export type GetTerminatedLeadLazyQueryHookResult = ReturnType<typeof useTerminatedLeadLazyQuery>;
export type GetTerminatedLeadQueryResult = Apollo.QueryResult<GetTerminatedLeadQuery, GetSlasheddWorkerQueryVariables>;
