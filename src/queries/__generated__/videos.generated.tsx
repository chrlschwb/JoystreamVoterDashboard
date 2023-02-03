import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import { BasicChannelFieldsFragmentDoc } from './channels.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetVideoCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.VideoWhereInput>;
}>;


export type GetVideoCountQuery = { __typename: 'Query', videosConnection: { __typename: 'VideoConnection', totalCount: number } };

export type GetVideosQueryVariables = Types.Exact<{
  whereVideo?: Types.InputMaybe<Types.VideoWhereInput>;
  whereChannel?: Types.InputMaybe<Types.ChannelWhereInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  text: Types.Scalars['String'];
}>;


export type GetVideosQuery = { __typename: 'Query', search: Array<{ __typename: 'SearchFTSOutput', rank: string, item: { __typename: 'Channel', id: string, title?: string | null, createdAt: any, rewardAccount: string, channelStateBloatBond: string, avatarPhoto?: { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } } | null } | { __typename: 'Video', id: string, title?: string | null, createdAt: any } }> };

export type BasicVideoFieldsFragment = { __typename: 'Video', id: string, title?: string | null, createdAt: any };

export const BasicVideoFieldsFragmentDoc = gql`
    fragment BasicVideoFields on Video {
  id
  title
  createdAt
}
    `;
export const GetVideoCountDocument = gql`
    query GetVideoCount($where: VideoWhereInput) {
  videosConnection(first: 0, where: $where) {
    totalCount
  }
}
    `;

/**
 * __useGetVideoCountQuery__
 *
 * To run a query within a React component, call `useGetVideoCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideoCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideoCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetVideoCountQuery(baseOptions?: Apollo.QueryHookOptions<GetVideoCountQuery, GetVideoCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideoCountQuery, GetVideoCountQueryVariables>(GetVideoCountDocument, options);
      }
export function useGetVideoCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideoCountQuery, GetVideoCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideoCountQuery, GetVideoCountQueryVariables>(GetVideoCountDocument, options);
        }
export type GetVideoCountQueryHookResult = ReturnType<typeof useGetVideoCountQuery>;
export type GetVideoCountLazyQueryHookResult = ReturnType<typeof useGetVideoCountLazyQuery>;
export type GetVideoCountQueryResult = Apollo.QueryResult<GetVideoCountQuery, GetVideoCountQueryVariables>;
export const GetVideosDocument = gql`
    query GetVideos($whereVideo: VideoWhereInput, $whereChannel: ChannelWhereInput, $skip: Int = 0, $limit: Int = 5, $text: String!) {
  search(
    whereVideo: $whereVideo
    whereChannel: $whereChannel
    skip: $skip
    limit: $limit
    text: $text
  ) {
    rank
    item {
      __typename
      ... on Channel {
        ...BasicChannelFields
      }
      ... on Video {
        ...BasicVideoFields
      }
    }
  }
}
    ${BasicChannelFieldsFragmentDoc}
${BasicVideoFieldsFragmentDoc}`;

/**
 * __useGetVideosQuery__
 *
 * To run a query within a React component, call `useGetVideosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVideosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVideosQuery({
 *   variables: {
 *      whereVideo: // value for 'whereVideo'
 *      whereChannel: // value for 'whereChannel'
 *      skip: // value for 'skip'
 *      limit: // value for 'limit'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useGetVideosQuery(baseOptions: Apollo.QueryHookOptions<GetVideosQuery, GetVideosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVideosQuery, GetVideosQueryVariables>(GetVideosDocument, options);
      }
export function useGetVideosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideosQuery, GetVideosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVideosQuery, GetVideosQueryVariables>(GetVideosDocument, options);
        }
export type GetVideosQueryHookResult = ReturnType<typeof useGetVideosQuery>;
export type GetVideosLazyQueryHookResult = ReturnType<typeof useGetVideosLazyQuery>;
export type GetVideosQueryResult = Apollo.QueryResult<GetVideosQuery, GetVideosQueryVariables>;