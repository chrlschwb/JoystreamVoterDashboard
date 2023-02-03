import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

const defaultOptions = {} as const;

export type GetChannelsCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ChannelWhereInput>;
}>;

export type GetChannelsCountQuery = { __typename: 'Query', channelsConnection: { __typename: 'ChannelConnection', totalCount: number } };

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