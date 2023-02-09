import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

const defaultOptions = {} as const;

export type GetCouncilMembersQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CouncilMemberWhereInput>;
}>;

export type CouncilMemberFragment = { __typename: 'CouncilMember', electedInCouncilId: string, member: { handle: string } };
export type GetCouncilMembersQuery = { __typename: 'Query', councilMembers: Array<CouncilMemberFragment> };

export const GetCouncilMembersDocument = gql`
query getCouncilMembers($where:CouncilMemberWhereInput){
  councilMembers(where:$where){
    electedInCouncilId
    member{
      handle
    }
  }
}

    `;

export function useGetCouncilMembersQuery(baseOptions?: Apollo.QueryHookOptions<GetCouncilMembersQuery, GetCouncilMembersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCouncilMembersQuery, GetCouncilMembersQueryVariables>(GetCouncilMembersDocument, options);
}
export function useGetCouncilMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCouncilMembersQuery, GetCouncilMembersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCouncilMembersQuery, GetCouncilMembersQueryVariables>(GetCouncilMembersDocument, options);
}
export type GetCouncilMembersQueryHookResult = ReturnType<typeof useGetCouncilMembersQuery>;
export type GetCouncilMembersLazyQueryHookResult = ReturnType<typeof useGetCouncilMembersLazyQuery>;
export type GetCouncilMembersQueryResult = Apollo.QueryResult<GetCouncilMembersQuery, GetCouncilMembersQueryVariables>;

