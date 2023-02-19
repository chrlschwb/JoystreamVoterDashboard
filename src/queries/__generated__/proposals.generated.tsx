import * as Types from './baseTypes.generated';

import { gql } from '@apollo/client';
import { MemberFieldsFragmentDoc } from './members.generated';
import * as Apollo from '@apollo/client';

const defaultOptions = {} as const;
export type GetCreatedProposalsCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ProposalCreatedEventWhereInput>;
}>;


export type GetCreatedProposalsCountQuery = { __typename: 'Query', proposalCreatedEventsConnection: { __typename: 'ProposalCreatedEventConnection', totalCount: number } };

export type GetExecutedProposalsCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ProposalExecutedEventWhereInput>;
}>;


export type GetExecutedProposalsCountQuery = { __typename: 'Query', proposalExecutedEventsConnection: { __typename: 'ProposalExecutedEventConnection', totalCount: number } };

export type GetProposalsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ProposalWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.ProposalOrderByInput> | Types.ProposalOrderByInput>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetProposalsQuery = { __typename: 'Query', proposals: Array<{ __typename: 'Proposal', id: string, title: string, statusSetAtTime: any, createdAt: any, councilApprovals: number, exactExecutionBlock?: number | null, status: { __typename: 'ProposalStatusCanceledByRuntime' } | { __typename: 'ProposalStatusCancelled' } | { __typename: 'ProposalStatusDeciding' } | { __typename: 'ProposalStatusDormant' } | { __typename: 'ProposalStatusExecuted' } | { __typename: 'ProposalStatusExecutionFailed' } | { __typename: 'ProposalStatusExpired' } | { __typename: 'ProposalStatusGracing' } | { __typename: 'ProposalStatusRejected' } | { __typename: 'ProposalStatusSlashed' } | { __typename: 'ProposalStatusVetoed' }, details: { __typename: 'AmendConstitutionProposalDetails' } | { __typename: 'CancelWorkingGroupLeadOpeningProposalDetails' } | { __typename: 'CreateWorkingGroupLeadOpeningProposalDetails' } | { __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails' } | { __typename: 'FillWorkingGroupLeadOpeningProposalDetails' } | { __typename: 'FundingRequestProposalDetails' } | { __typename: 'RuntimeUpgradeProposalDetails' } | { __typename: 'SetCouncilBudgetIncrementProposalDetails' } | { __typename: 'SetCouncilorRewardProposalDetails' } | { __typename: 'SetInitialInvitationBalanceProposalDetails' } | { __typename: 'SetInitialInvitationCountProposalDetails' } | { __typename: 'SetMaxValidatorCountProposalDetails' } | { __typename: 'SetMembershipLeadInvitationQuotaProposalDetails' } | { __typename: 'SetMembershipPriceProposalDetails' } | { __typename: 'SetReferralCutProposalDetails' } | { __typename: 'SetWorkingGroupLeadRewardProposalDetails' } | { __typename: 'SignalProposalDetails' } | { __typename: 'SlashWorkingGroupLeadProposalDetails' } | { __typename: 'TerminateWorkingGroupLeadProposalDetails' } | { __typename: 'UpdateWorkingGroupBudgetProposalDetails' } | { __typename: 'VetoProposalDetails' }, creator: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, boundAccounts: Array<string>, handle: string, isVerified: boolean, isFoundingMember: boolean, isCouncilMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null, about?: string | null, avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri', avatarUri: string } | null }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }>, stakingaccountaddedeventmember?: Array<{ __typename: 'StakingAccountAddedEvent', createdAt: any, inBlock: number, network: Types.Network, account: string }> | null }, votes: Array<VoteFieldsFragment>, discussionThread: { proposalId: number, posts: Array<ProposalPostFragment> } }> };

export type VoteFieldsFragment = { __typename: "Vote", voter: { handle: string }, voteKind: string, votingRound: number }
export type ProposalPostFragment = { __typeName: "PostProposal", author: { handle: string }, text: string }

export type ProposalFieldsFragment = { __typename: 'Proposal', id: string, title: string, statusSetAtTime: any, createdAt: any, councilApprovals: number, exactExecutionBlock?: number | null, status: { __typename: 'ProposalStatusCanceledByRuntime' } | { __typename: 'ProposalStatusCancelled' } | { __typename: 'ProposalStatusDeciding' } | { __typename: 'ProposalStatusDormant' } | { __typename: 'ProposalStatusExecuted' } | { __typename: 'ProposalStatusExecutionFailed' } | { __typename: 'ProposalStatusExpired' } | { __typename: 'ProposalStatusGracing' } | { __typename: 'ProposalStatusRejected' } | { __typename: 'ProposalStatusSlashed' } | { __typename: 'ProposalStatusVetoed' }, details: { __typename: 'AmendConstitutionProposalDetails' } | { __typename: 'CancelWorkingGroupLeadOpeningProposalDetails' } | { __typename: 'CreateWorkingGroupLeadOpeningProposalDetails' } | { __typename: 'DecreaseWorkingGroupLeadStakeProposalDetails' } | { __typename: 'FillWorkingGroupLeadOpeningProposalDetails' } | { __typename: 'FundingRequestProposalDetails' } | { __typename: 'RuntimeUpgradeProposalDetails' } | { __typename: 'SetCouncilBudgetIncrementProposalDetails' } | { __typename: 'SetCouncilorRewardProposalDetails' } | { __typename: 'SetInitialInvitationBalanceProposalDetails' } | { __typename: 'SetInitialInvitationCountProposalDetails' } | { __typename: 'SetMaxValidatorCountProposalDetails' } | { __typename: 'SetMembershipLeadInvitationQuotaProposalDetails' } | { __typename: 'SetMembershipPriceProposalDetails' } | { __typename: 'SetReferralCutProposalDetails' } | { __typename: 'SetWorkingGroupLeadRewardProposalDetails' } | { __typename: 'SignalProposalDetails' } | { __typename: 'SlashWorkingGroupLeadProposalDetails' } | { __typename: 'TerminateWorkingGroupLeadProposalDetails' } | { __typename: 'UpdateWorkingGroupBudgetProposalDetails' } | { __typename: 'VetoProposalDetails' }, creator: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, boundAccounts: Array<string>, handle: string, isVerified: boolean, isFoundingMember: boolean, isCouncilMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null, about?: string | null, avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri', avatarUri: string } | null }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }>, stakingaccountaddedeventmember?: Array<{ __typename: 'StakingAccountAddedEvent', createdAt: any, inBlock: number, network: Types.Network, account: string }> | null }, votes: Array<VoteFieldsFragment>, discussionThread: { proposalId: number, posts: Array<ProposalPostFragment> } };

export const ProposalFieldsFragmentDoc = gql`
    fragment ProposalFields on Proposal {
  id
  title
  status {
    __typename
  }
  statusSetAtTime
  details {
    __typename
  }
  creator {
    ...MemberFields
  }
  createdAt
  councilApprovals
  exactExecutionBlock
  votes{
    voter{
      handle
    }
    voteKind
    votingRound
  }
  discussionThread{
    proposalId

    posts{
      author{
        handle
      }
      text

    }
  }
}
    ${MemberFieldsFragmentDoc}`;
export const GetCreatedProposalsCountDocument = gql`
    query getCreatedProposalsCount($where: ProposalCreatedEventWhereInput) {
  proposalCreatedEventsConnection(where: $where) {
    totalCount
  }
}
    `;


export function useGetCreatedProposalsCountQuery(baseOptions?: Apollo.QueryHookOptions<GetCreatedProposalsCountQuery, GetCreatedProposalsCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCreatedProposalsCountQuery, GetCreatedProposalsCountQueryVariables>(GetCreatedProposalsCountDocument, options);
}
export function useGetCreatedProposalsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCreatedProposalsCountQuery, GetCreatedProposalsCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCreatedProposalsCountQuery, GetCreatedProposalsCountQueryVariables>(GetCreatedProposalsCountDocument, options);
}
export type GetCreatedProposalsCountQueryHookResult = ReturnType<typeof useGetCreatedProposalsCountQuery>;
export type GetCreatedProposalsCountLazyQueryHookResult = ReturnType<typeof useGetCreatedProposalsCountLazyQuery>;
export type GetCreatedProposalsCountQueryResult = Apollo.QueryResult<GetCreatedProposalsCountQuery, GetCreatedProposalsCountQueryVariables>;
export const GetExecutedProposalsCountDocument = gql`
    query getExecutedProposalsCount($where: ProposalExecutedEventWhereInput) {
  proposalExecutedEventsConnection(where: $where) {
    totalCount
  }
}
    `;


export function useGetExecutedProposalsCountQuery(baseOptions?: Apollo.QueryHookOptions<GetExecutedProposalsCountQuery, GetExecutedProposalsCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetExecutedProposalsCountQuery, GetExecutedProposalsCountQueryVariables>(GetExecutedProposalsCountDocument, options);
}
export function useGetExecutedProposalsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExecutedProposalsCountQuery, GetExecutedProposalsCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetExecutedProposalsCountQuery, GetExecutedProposalsCountQueryVariables>(GetExecutedProposalsCountDocument, options);
}
export type GetExecutedProposalsCountQueryHookResult = ReturnType<typeof useGetExecutedProposalsCountQuery>;
export type GetExecutedProposalsCountLazyQueryHookResult = ReturnType<typeof useGetExecutedProposalsCountLazyQuery>;
export type GetExecutedProposalsCountQueryResult = Apollo.QueryResult<GetExecutedProposalsCountQuery, GetExecutedProposalsCountQueryVariables>;
export const GetProposalsDocument = gql`
    query getProposals($where: ProposalWhereInput, $orderBy: [ProposalOrderByInput!], $limit: Int, $offset: Int) {
  proposals(where: $where, orderBy: $orderBy, limit: $limit, offset: $offset) {
    ...ProposalFields
  }
}
    ${ProposalFieldsFragmentDoc}`;


export function useGetProposalsQuery(baseOptions?: Apollo.QueryHookOptions<GetProposalsQuery, GetProposalsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProposalsQuery, GetProposalsQueryVariables>(GetProposalsDocument, options);
}
export function useGetProposalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProposalsQuery, GetProposalsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProposalsQuery, GetProposalsQueryVariables>(GetProposalsDocument, options);
}
export type GetProposalsQueryHookResult = ReturnType<typeof useGetProposalsQuery>;
export type GetProposalsLazyQueryHookResult = ReturnType<typeof useGetProposalsLazyQuery>;
export type GetProposalsQueryResult = Apollo.QueryResult<GetProposalsQuery, GetProposalsQueryVariables>;