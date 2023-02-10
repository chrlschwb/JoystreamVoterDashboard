import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetChannelsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ChannelWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.ChannelOrderByInput> | Types.ChannelOrderByInput>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetChannelsQuery = { __typename: 'Query', channels: Array<{ __typename: 'Channel', activeVideosCounter: number, description?: string | null, isPublic?: boolean | null, isCensored: boolean, id: string, title?: string | null, createdAt: any, rewardAccount: string, channelStateBloatBond: string, language?: { __typename: 'Language', id: string, iso: string } | null, ownerMember?: { __typename: 'Membership', id: string, handle: string, metadata: { __typename: 'MemberMetadata', about?: string | null, avatar?: { __typename: 'AvatarObject', avatarObject?: { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } } | null } | { __typename: 'AvatarUri', avatarUri: string } | null } } | null, coverPhoto?: { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } } | null, avatarPhoto?: { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } } | null }> };

export type GetChannelsCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ChannelWhereInput>;
}>;


export type GetChannelsCountQuery = { __typename: 'Query', channelsConnection: { __typename: 'ChannelConnection', totalCount: number } };

export type FullChannelFieldsFragment = { __typename: 'Channel', activeVideosCounter: number, description?: string | null, isPublic?: boolean | null, isCensored: boolean, id: string, title?: string | null, createdAt: any, rewardAccount: string, channelStateBloatBond: string, language?: { __typename: 'Language', id: string, iso: string } | null, ownerMember?: { __typename: 'Membership', id: string, handle: string, metadata: { __typename: 'MemberMetadata', about?: string | null, avatar?: { __typename: 'AvatarObject', avatarObject?: { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } } | null } | { __typename: 'AvatarUri', avatarUri: string } | null } } | null, coverPhoto?: { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } } | null, avatarPhoto?: { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } } | null };

export type BasicMembershipFieldsFragment = { __typename: 'Membership', id: string, handle: string, metadata: { __typename: 'MemberMetadata', about?: string | null, avatar?: { __typename: 'AvatarObject', avatarObject?: { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } } | null } | { __typename: 'AvatarUri', avatarUri: string } | null } };

export type BasicChannelFieldsFragment = { __typename: 'Channel', id: string, title?: string | null, createdAt: any, rewardAccount: string, channelStateBloatBond: string, avatarPhoto?: { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } } | null };

export type StorageDataObjectFieldsFragment = { __typename: 'StorageDataObject', id: string, createdAt: any, size: string, isAccepted: boolean, ipfsHash: string, storageBag: { __typename: 'StorageBag', id: string }, type: { __typename: 'DataObjectTypeChannelAvatar' } | { __typename: 'DataObjectTypeChannelCoverPhoto' } | { __typename: 'DataObjectTypeUnknown' } | { __typename: 'DataObjectTypeVideoMedia' } | { __typename: 'DataObjectTypeVideoSubtitle' } | { __typename: 'DataObjectTypeVideoThumbnail' } };

export const StorageDataObjectFieldsFragmentDoc = gql`
    fragment StorageDataObjectFields on StorageDataObject {
  id
  createdAt
  size
  isAccepted
  ipfsHash
  storageBag {
    id
  }
  type {
    __typename
  }
}
    `;
export const BasicChannelFieldsFragmentDoc = gql`
    fragment BasicChannelFields on Channel {
  id
  title
  createdAt
  rewardAccount
  channelStateBloatBond
  avatarPhoto {
    ...StorageDataObjectFields
  }
}
    ${StorageDataObjectFieldsFragmentDoc}`;
export const BasicMembershipFieldsFragmentDoc = gql`
    fragment BasicMembershipFields on Membership {
  id
  handle
  metadata {
    avatar {
      ... on AvatarObject {
        avatarObject {
          ...StorageDataObjectFields
        }
      }
      ... on AvatarUri {
        avatarUri
      }
    }
    about
  }
}
    ${StorageDataObjectFieldsFragmentDoc}`;
export const FullChannelFieldsFragmentDoc = gql`
    fragment FullChannelFields on Channel {
  ...BasicChannelFields
  activeVideosCounter
  description
  isPublic
  isCensored
  language {
    id
    iso
  }
  ownerMember {
    ...BasicMembershipFields
  }
  coverPhoto {
    ...StorageDataObjectFields
  }
}
    ${BasicChannelFieldsFragmentDoc}
${BasicMembershipFieldsFragmentDoc}
${StorageDataObjectFieldsFragmentDoc}`;
export const GetChannelsDocument = gql`
    query GetChannels($where: ChannelWhereInput, $orderBy: [ChannelOrderByInput!], $offset: Int, $limit: Int) {
  channels(where: $where, orderBy: $orderBy, offset: $offset, limit: $limit) {
    ...FullChannelFields
  }
}
    ${FullChannelFieldsFragmentDoc}`;


export function useGetChannelsQuery(baseOptions?: Apollo.QueryHookOptions<GetChannelsQuery, GetChannelsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetChannelsQuery, GetChannelsQueryVariables>(GetChannelsDocument, options);
}
export function useGetChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelsQuery, GetChannelsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetChannelsQuery, GetChannelsQueryVariables>(GetChannelsDocument, options);
}
export type GetChannelsQueryHookResult = ReturnType<typeof useGetChannelsQuery>;
export type GetChannelsLazyQueryHookResult = ReturnType<typeof useGetChannelsLazyQuery>;
export type GetChannelsQueryResult = Apollo.QueryResult<GetChannelsQuery, GetChannelsQueryVariables>;
export const GetChannelsCountDocument = gql`
    query GetChannelsCount($where: ChannelWhereInput) {
  channelsConnection(where: $where) {
    totalCount
  }
}
    `;

export function useGetChannelsCountQuery(baseOptions?: Apollo.QueryHookOptions<GetChannelsCountQuery, GetChannelsCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetChannelsCountQuery, GetChannelsCountQueryVariables>(GetChannelsCountDocument, options);
}
export function useGetChannelsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelsCountQuery, GetChannelsCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetChannelsCountQuery, GetChannelsCountQueryVariables>(GetChannelsCountDocument, options);
}
export type GetChannelsCountQueryHookResult = ReturnType<typeof useGetChannelsCountQuery>;
export type GetChannelsCountLazyQueryHookResult = ReturnType<typeof useGetChannelsCountLazyQuery>;
export type GetChannelsCountQueryResult = Apollo.QueryResult<GetChannelsCountQuery, GetChannelsCountQueryVariables>;