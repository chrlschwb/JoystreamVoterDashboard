import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

const defaultOptions = {} as const;

export type GetCreatedProposalVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ProposalCreatedEventWhereInput>;
}>;

export type GetExcutedProposalVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ProposalExecutedEventWhereInput>;
}>;


export type GetCreatedProposalQuery = { __typename: 'Query', proposalCreatedEventsConnection: { __typename: 'ProposalCreatedEventConnection', totalCount: number } };
export type GetExcutedProposalQuery = { __typename: 'Query', proposalExecutedEventsConnection: { __typename: 'ProposalExecutedEventConnection', totalCount: number } };


export const GetCreatedProposalDocument = gql`
query getProposalCreatedEvent($where:ProposalCreatedEventWhereInput ) {
  proposalCreatedEventsConnection(where: $where) {
    totalCount
  }
}
    `;

export const GetExcutedProposalDocument = gql`
query getProposalExecutedEvent($where:ProposalExecutedEventWhereInput ) {
  proposalExecutedEventsConnection(first:0, where: $where) {
    totalCount
  }
}
    `;


export function useGetCreatedProposalLazyQuery(baseOptions?: Apollo.QueryHookOptions<GetCreatedProposalQuery, GetCreatedProposalVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCreatedProposalQuery, GetCreatedProposalVariables>(GetCreatedProposalDocument, options);
}
export function useGetExcuetedProposalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExcutedProposalQuery, GetExcutedProposalVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetExcutedProposalQuery, GetExcutedProposalVariables>(GetExcutedProposalDocument, options);
}
export type GetNftIssuedCountQueryHookResult = ReturnType<typeof useGetCreatedProposalLazyQuery>;
export type GetNftSaleCountLazyQueryHookResult = ReturnType<typeof useGetExcuetedProposalLazyQuery>;
export type GetOwnedNftsCountQueryResult = Apollo.QueryResult<GetNftIssuedCountQueryHookResult, GetNftSaleCountLazyQueryHookResult>;