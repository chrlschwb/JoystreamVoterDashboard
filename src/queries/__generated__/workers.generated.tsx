import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import { BasicChannelFieldsFragmentDoc } from './channels.generated';
import * as Apollo from '@apollo/client';

const defaultOptions = {} as const;

export type GetTerminatedWorkersQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.TerminatedWorkerEventWhereInput>;
}>;
export type GetTerminatedWorkersQuery = { __typename: 'Query', terminatedWorkerEvents: Array<{ __typename: 'TerminatedWorkerEvent', groupId: string, worker: Array<{ memberShip: number }> }> };

export type GetWorkderExitedVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.WorkerExitedEventWhereInput>;
}>;
export type GetWorkedExitedQuery = { __typename: 'Query', workerExitedEvents: Array<{ groupId: string, worker: Array<{ membershipId: string }> }> };

export type GetOpeningFilledQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.OpeningFilledEventWhereInput>;
}>
export type GetOpeningFilledQuery = { __typename: 'Query', openingFilledEvents: Array<{ groupId: string, workersHired: Array<{ membershipId: string }> }> };


export const GetTerminatedWorkersDocument = gql`
query getTerminatedWorkders($where:TerminatedWorkerEventWhereInput) {
  terminatedWorkerEvents(where:$where,limit:50000) {

        groupId
        workerId
    createdAt
    __typename
    worker{
      membershipId
     
    }
  }	
}
    `;

export function useGetTerminatedWorkersQuery(baseOptions?: Apollo.QueryHookOptions<GetTerminatedWorkersQuery, GetTerminatedWorkersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTerminatedWorkersQuery, GetTerminatedWorkersQueryVariables>(GetTerminatedWorkersDocument, options);
}
export function useGetTerminatedWorkdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTerminatedWorkersQuery, GetTerminatedWorkersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTerminatedWorkersQuery, GetTerminatedWorkersQueryVariables>(GetTerminatedWorkersDocument, options);
}
export type GetTerminatedWorkersQueryHookResult = ReturnType<typeof useGetTerminatedWorkersQuery>;
export type GetTerminatedWorkersLazyQueryHookResult = ReturnType<typeof useGetTerminatedWorkdersLazyQuery>;
export type GetTerminatedWorkersQueryResult = Apollo.QueryResult<GetTerminatedWorkersQuery, GetTerminatedWorkersQueryVariables>;


export const GetWorkerExitedDocument = gql`
query getWorkerExited($where:WorkerExitedEventWhereInput) {
  workerExitedEvents(where:$where, limit:50000) {
     createdAt
    groupId
    workerId
    __typename
    worker{
      membershipId
    }
  }	
}`;

export function useGetWorkedExitedQuery(baseOptions: Apollo.QueryHookOptions<GetWorkedExitedQuery, GetWorkderExitedVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkedExitedQuery, GetWorkderExitedVariables>(GetWorkerExitedDocument, options);
}
export function useGetWorkedExitedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkedExitedQuery, GetWorkderExitedVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkedExitedQuery, GetWorkderExitedVariables>(GetWorkerExitedDocument, options);
}
export type GetWorkedExitedQueryHookResult = ReturnType<typeof useGetWorkedExitedQuery>;
export type GetWorkedExitedLazyQueryHookResult = ReturnType<typeof useGetWorkedExitedLazyQuery>;
export type GetWorkedExitedQueryResult = Apollo.QueryResult<GetWorkedExitedQuery, GetWorkderExitedVariables>;


export const GetOpeningFilledDocument = gql`
query getOpeningFilled($where:OpeningFilledEventWhereInput){
  openingFilledEvents(where:$where, limit:50000){
    createdAt
    groupId
    workersHired{
      membershipId
    }
  }
}
`;

export function useGetOpeningFilledQuery(baseOptions: Apollo.QueryHookOptions<GetOpeningFilledQuery, GetOpeningFilledQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetOpeningFilledQuery, GetOpeningFilledQueryVariables>(GetOpeningFilledDocument, options);
}
export function useGetOpeningFilledLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOpeningFilledQuery, GetOpeningFilledQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetOpeningFilledQuery, GetOpeningFilledQueryVariables>(GetOpeningFilledDocument, options);
}
export type GetOpeningFilledQueryHookResult = ReturnType<typeof useGetOpeningFilledQuery>;
export type GetOpeningFilledLazyQueryHookResult = ReturnType<typeof useGetOpeningFilledLazyQuery>;
export type GetOpeningFilledQueryResult = Apollo.QueryResult<GetOpeningFilledQuery, GetOpeningFilledQueryVariables>;