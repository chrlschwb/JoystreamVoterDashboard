import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

const defaultOptions = {} as const;

export type GetVideosCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.VideoWhereInput>;
}>;

export type GetVideosCountQuery = { __typename: 'Query', videosConnection: { __typename: 'VideoConnection', totalCount: number } };

export const GetVideosCountDocument = gql`
    query GetVideosCount($where: VideoWhereInput) {
      videosConnection(where: $where) {
        totalCount
      }
    }
`;

export function useGetVideosCountQuery(baseOptions?: Apollo.QueryHookOptions<GetVideosCountQuery, GetVideosCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetVideosCountQuery, GetVideosCountQueryVariables>(GetVideosCountDocument, options);
}
export function useGetVideosCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVideosCountQuery, GetVideosCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetVideosCountQuery, GetVideosCountQueryVariables>(GetVideosCountDocument, options);
}
export type GetChannelsCountQueryHookResult = ReturnType<typeof useGetVideosCountQuery>;
export type GetChannelsCountLazyQueryHookResult = ReturnType<typeof useGetVideosCountLazyQuery>;
export type GetChannelsCountQueryResult = Apollo.QueryResult<GetVideosCountQuery, GetVideosCountQueryVariables>;