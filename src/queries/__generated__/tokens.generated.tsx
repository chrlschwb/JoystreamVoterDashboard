import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;

export type GetMintedTokenQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.RewardPaymentEventWhereInput>;
}>;

export type GetWorkingGroupsTokenVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.NftBoughtEventWhereInput>;
}>;

export type GetCouncilTokenVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BudgetRefillEventWhereInput>;
}>;

export type GetMintedTokenCountQuery = { __typename: 'Query', rewardPaymentEvents: Array<{ __typename: 'RewardPaymentEvent', paidBalance: number }> };

export type GetWorkingGroupTokenQuery = { __typename: 'Query', budgetUpdatedEvents: Array<{ __typename: 'BudgetUpdatedEvent', budgetChangeAmount: number, groupId: string }> };

export type GetCouncilTokenQuery = { __typename: 'Query', budgetRefillEvents: Array<{ __typename: 'BudgetRefillEvent', balance: number }> };


export const GetMintedTokenCountDocument = gql`
query mintedTokens($where:RewardPaymentEventWhereInput) {
  rewardPaymentEvents(where: $where, limit:1000) {
    inBlock
    councilMemberId
    id
    paidBalance
    missingBalance
    councilMember {
      electedInCouncilId
      member {
        id
      }
    }
  }
}
    `;


export function useGetMintedTokenCountQuery(baseOptions?: Apollo.QueryHookOptions<GetMintedTokenCountQuery, GetMintedTokenQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMintedTokenCountQuery, GetMintedTokenQueryVariables>(GetMintedTokenCountDocument, options);
}
export function useGetMintedTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMintedTokenCountQuery, GetMintedTokenQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMintedTokenCountQuery, GetMintedTokenQueryVariables>(GetMintedTokenCountDocument, options);
}
export type GetMintedTokenCountQueryHookResult = ReturnType<typeof useGetMintedTokenCountQuery>;
export type GetMintedTokenLazyQueryHookResult = ReturnType<typeof useGetMintedTokenLazyQuery>;
export type GetMintedTokenQueryResult = Apollo.QueryResult<GetMintedTokenCountQuery, GetMintedTokenQueryVariables>;


export const GetWorkingGroupTokenDocument = gql`

query workingGroupToken($where:BudgetUpdatedEventWhereInput) {
  budgetUpdatedEvents(where:$where, limit:50000) {    
    groupId
    budgetChangeAmount
    inBlock
    id
  }
}
    `;


export function useGetWorkingGroupTokenQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkingGroupTokenQuery, GetWorkingGroupsTokenVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupTokenQuery, GetWorkingGroupsTokenVariables>(GetWorkingGroupTokenDocument, options);
}
export function useGetWorkingGroupTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupTokenQuery, GetWorkingGroupsTokenVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupTokenQuery, GetWorkingGroupsTokenVariables>(GetWorkingGroupTokenDocument, options);
}
export type GetWorkingGroupTokenQueryHookResult = ReturnType<typeof useGetWorkingGroupTokenQuery>;
export type GetWorkingGropupLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupTokenLazyQuery>;
export type GetWorkingGroupTokenQueryResult = Apollo.QueryResult<GetWorkingGroupTokenQueryHookResult, GetWorkingGroupsTokenVariables>;


export const GetCouncilDocument = gql`

query councilTokens ($where:BudgetRefillEventWhereInput){
  budgetRefillEvents(where: $where, limit:50000) {
    id
    balance
    inBlock
  }
}
    `;

export function useGetCouncilTokenQuery(baseOptions?: Apollo.QueryHookOptions<GetCouncilTokenQuery, GetCouncilTokenVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCouncilTokenQuery, GetCouncilTokenVariables>(GetCouncilDocument, options);
}
export function useGetCouncilTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCouncilTokenQuery, GetCouncilTokenVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCouncilTokenQuery, GetCouncilTokenVariables>(GetCouncilDocument, options);
}
export type GetCouncilQueryHookResult = ReturnType<typeof useGetCouncilTokenQuery>;
export type GetCouncilLazyQueryHookResult = ReturnType<typeof useGetCouncilTokenLazyQuery>;
export type GetCouncilQueryResult = Apollo.QueryResult<GetCouncilTokenQuery, GetCouncilTokenVariables>;


export type GetFundedTokenQuery = {
  __typename: 'Query',
  requestFundedEvents:
  Array<{ __typename: 'RequestFundedEvents', amount: number, id: string }>
};

export type GetFundedVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.RequestFundedEventWhereInput>;
}>;


export const GetFundedTokenDocument = gql`
  query getFunded($where: RequestFundedEventWhereInput) {
    requestFundedEvents(where: $where) {
      id
      amount
    }
  }
`;

export function useGetFundedTokenQuery(baseOptions?: Apollo.QueryHookOptions<GetFundedTokenQuery, GetFundedVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetFundedTokenQuery, GetFundedVariables>(GetFundedTokenDocument, options);
}
export function useGetFundedTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFundedTokenQuery, GetFundedVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetFundedTokenQuery, GetFundedVariables>(GetFundedTokenDocument, options);
}
export type GetFundedTokenQueryHookResult = ReturnType<typeof useGetFundedTokenQuery>;
export type GetFundedTokenLazyQueryHookResult = ReturnType<typeof useGetFundedTokenLazyQuery>;
export type GetFundedTokenQueryResult = Apollo.QueryResult<GetFundedTokenQuery, GetFundedVariables>;
