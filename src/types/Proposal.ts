import { lowerFirstLetter } from '@/helpers';
import { ProposalFieldsFragment } from '@/queries';

import { asMember, Member } from './Member';

export type ProposalStatus =
  | 'deciding'
  | 'gracing'
  | 'dormant'
  | 'vetoed'
  | 'executed'
  | 'executionFailed'
  | 'slashed'
  | 'rejected'
  | 'expired'
  | 'cancelled'
  | 'canceledByRuntime';

export type ProposalType =
  | 'signal'
  | 'runtimeUpgrade'
  | 'fundingRequest'
  | 'setMaxValidatorCount'
  | 'createWorkingGroupLeadOpening'
  | 'fillWorkingGroupLeadOpening'
  | 'updateWorkingGroupBudget'
  | 'decreaseWorkingGroupLeadStake'
  | 'slashWorkingGroupLead'
  | 'setWorkingGroupLeadReward'
  | 'terminateWorkingGroupLead'
  | 'amendConstitution'
  | 'cancelWorkingGroupLeadOpening'
  | 'setMembershipPrice'
  | 'setCouncilBudgetIncrement'
  | 'setCouncilorReward'
  | 'setInitialInvitationBalance'
  | 'setInitialInvitationCount'
  | 'setMembershipLeadInvitationQuota'
  | 'setReferralCut'
  | 'createBlogPost'
  | 'editBlogPost'
  | 'lockBlogPost'
  | 'unlockBlogPost'
  | 'veto';

export interface Proposal {
  id: string;
  title: string;
  status: ProposalStatus;
  type: ProposalType;
  proposer: Member;
  createdAt: string;
  endedAt?: string;
  councilApprovals: number;
  exactExecutionBlock?: number;
}

export const typenameToProposalStatus = (typename: string): ProposalStatus => {
  const status = typename.replace('ProposalStatus', '');

  return lowerFirstLetter(status) as ProposalStatus;
};

export const typenameToProposalDetails = (typename: string): ProposalType => {
  const details = typename.replace('ProposalDetails', '');

  return lowerFirstLetter(details) as ProposalType;
};

export const proposalActiveStatuses: ProposalStatus[] = ['deciding', 'gracing', 'dormant'];

export const isProposalActive = (status: ProposalStatus) => proposalActiveStatuses.includes(status);

export const asProposal = (fields: ProposalFieldsFragment): Proposal => {
  const proposal: Proposal = {
    id: fields.id,
    title: fields.title,
    status: typenameToProposalStatus(fields.status.__typename),
    type: typenameToProposalDetails(fields.details.__typename),
    proposer: asMember(fields.creator),
    createdAt: fields.createdAt,
    councilApprovals: fields.councilApprovals,
    exactExecutionBlock: fields.exactExecutionBlock ?? undefined,
  };

  if (!isProposalActive(proposal.status)) {
    proposal.endedAt = fields.statusSetAtTime;
  }

  return proposal;
};
