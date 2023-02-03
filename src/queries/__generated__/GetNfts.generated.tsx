import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

const defaultOptions = {} as const;

export type GetNftsIssuedQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.NftIssuedEventWhereInput>;
}>;

export type GetNftsSaleQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.NftBoughtEventWhereInput>;
}>;


export type GetNftIssuedCountQuery = { __typename: 'Query', nftIssuedEventsConnection: { __typename: 'NftIssuedEventConnection', totalCount: number } };
export type GetNftSaleCountQuery = { __typename: 'Query', nftBoughtEventsConnection: { __typename: 'NftBoughtEventConnection', totalCount: number } };


export const GetNftIssuedCountDocument = gql`
query GetNftIssuedCount($where: NftIssuedEventWhereInput) {
  nftIssuedEventsConnection(where:$where){
   totalCount,
   }
 }
    `;

export const GetNftSaleCountDocument = gql`
query GetNftSaleCount($where: NftBoughtEventWhereInput) {
  nftBoughtEventsConnection(where:$where){
    totalCount,
    }
  }
    `;


export function useGetNftIssuedCountLazyQuery(baseOptions?: Apollo.QueryHookOptions<GetNftIssuedCountQuery, GetNftsIssuedQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetNftIssuedCountQuery, GetNftsIssuedQueryVariables>(GetNftIssuedCountDocument, options);
}
export function useGetNftSaleCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNftSaleCountQuery, GetNftsSaleQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetNftSaleCountQuery, GetNftsSaleQueryVariables>(GetNftSaleCountDocument, options);
}
export type GetNftIssuedCountQueryHookResult = ReturnType<typeof useGetNftIssuedCountLazyQuery>;
export type GetNftSaleCountLazyQueryHookResult = ReturnType<typeof useGetNftSaleCountLazyQuery>;
export type GetOwnedNftsCountQueryResult = Apollo.QueryResult<GetNftIssuedCountQueryHookResult, GetNftSaleCountLazyQueryHookResult>;