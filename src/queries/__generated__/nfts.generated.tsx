import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;

export type GetNftIssuedCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.NftIssuedEventWhereInput>;
}>;


export type GetNftIssuedCountQuery = { __typename: 'Query', nftIssuedEventsConnection: { __typename: 'NftIssuedEventConnection', totalCount: number } };

export type GetNftSaleCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.NftBoughtEventWhereInput>;
}>;


export type GetNftSaleCountQuery = { __typename: 'Query', nftBoughtEventsConnection: { __typename: 'NftBoughtEventConnection', totalCount: number } };


export const GetNftIssuedCountDocument = gql`
    query GetNftIssuedCount($where: NftIssuedEventWhereInput) {
  nftIssuedEventsConnection(where: $where) {
    totalCount
  }
}
    `;

/**
 * __useGetNftIssuedCountQuery__
 *
 * To run a query within a React component, call `useGetNftIssuedCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNftIssuedCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNftIssuedCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetNftIssuedCountQuery(baseOptions?: Apollo.QueryHookOptions<GetNftIssuedCountQuery, GetNftIssuedCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNftIssuedCountQuery, GetNftIssuedCountQueryVariables>(GetNftIssuedCountDocument, options);
      }
export function useGetNftIssuedCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNftIssuedCountQuery, GetNftIssuedCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNftIssuedCountQuery, GetNftIssuedCountQueryVariables>(GetNftIssuedCountDocument, options);
        }
export type GetNftIssuedCountQueryHookResult = ReturnType<typeof useGetNftIssuedCountQuery>;
export type GetNftIssuedCountLazyQueryHookResult = ReturnType<typeof useGetNftIssuedCountLazyQuery>;
export type GetNftIssuedCountQueryResult = Apollo.QueryResult<GetNftIssuedCountQuery, GetNftIssuedCountQueryVariables>;

export const GetNftSaleCountDocument = gql`
    query GetNftSaleCount($where: NftBoughtEventWhereInput) {
  nftBoughtEventsConnection(where: $where) {
    totalCount
  }
}
    `;

/**
 * __useGetNftSaleCountQuery__
 *
 * To run a query within a React component, call `useGetNftSaleCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNftSaleCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNftSaleCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetNftSaleCountQuery(baseOptions?: Apollo.QueryHookOptions<GetNftSaleCountQuery, GetNftSaleCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNftSaleCountQuery, GetNftSaleCountQueryVariables>(GetNftSaleCountDocument, options);
      }
export function useGetNftSaleCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNftSaleCountQuery, GetNftSaleCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNftSaleCountQuery, GetNftSaleCountQueryVariables>(GetNftSaleCountDocument, options);
        }
export type GetNftSaleCountQueryHookResult = ReturnType<typeof useGetNftSaleCountQuery>;
export type GetNftSaleCountLazyQueryHookResult = ReturnType<typeof useGetNftSaleCountLazyQuery>;
export type GetNftSaleCountQueryResult = Apollo.QueryResult<GetNftSaleCountQuery, GetNftSaleCountQueryVariables>;


////get auctions count
export type GetNftAuctionsCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.AuctionWhereInput>;
}>;

export type GetNftAuctionsCountQuery = { __typename: 'Query', auctionsConnection: { __typename: 'AuctionConnection', totalCount: number } };

export const GetNftAuctionsCountDocument = gql`
  query GetNftAuctionsAcount($where: AuctionWhereInput) {
    auctionsConnection(where: $where) {
      totalCount
    }
  }
`;
    
export function useGetNftAuctionsCountQuery(baseOptions?: Apollo.QueryHookOptions<GetNftAuctionsCountQuery, GetNftAuctionsCountQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return Apollo.useQuery<GetNftAuctionsCountQuery, GetNftAuctionsCountQueryVariables>(GetNftAuctionsCountDocument, options);
}
export function useGetNftAuctionsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNftAuctionsCountQuery, GetNftAuctionsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useLazyQuery<GetNftAuctionsCountQuery, GetNftAuctionsCountQueryVariables>(GetNftAuctionsCountDocument, options);
      }
export type GetNftAuctionsCountQueryHookResult = ReturnType<typeof useGetNftAuctionsCountQuery>;
export type GetNftAuctionsCountLazyQueryHookResult = ReturnType<typeof useGetNftAuctionsCountLazyQuery>;
export type GetNftAuctionsCountQueryResult = Apollo.QueryResult<GetNftAuctionsCountQuery, GetNftAuctionsCountQueryVariables>;