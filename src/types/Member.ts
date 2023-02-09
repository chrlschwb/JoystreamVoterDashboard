import { MemberFieldsFragment, MembershipExternalResourceType, CouncilMemberFragment, GetCouncilMembersQuery } from '@/queries';

import { Address, asBlock, Block, castQueryResult } from './common';
import { asWorkingGroupName } from './WorkingGroup';

type ID = string;

export interface BoundAccountEvent {
  createdAtBlock: Block;
  account: Address;
}

export interface MemberRole {
  id: string;
  groupName: string;
  createdAt?: string;
  isLead: boolean;
}

export interface Member {
  id: ID;
  handle: string;
  rootAccount: Address;
  controllerAccount: Address;
  boundAccounts: Address[];
  name?: string;
  avatar?: string;
  inviteCount: number;
  roles: MemberRole[];
  isVerified: boolean;
  isFoundingMember: boolean;
  isCouncilMember: boolean;
  createdAt: string;
  boundAccountsEvents?: BoundAccountEvent[];
}

export type GenesisEntry = {
  type: 'genesis';
};

export type InvitedEntry = {
  type: 'invited';
  block: Block;
};

export type PaidEntry = {
  type: 'paid';
  block: Block;
};

export type MemberEntry = GenesisEntry | InvitedEntry | PaidEntry;
// Temporary fix for: https://github.com/Joystream/pioneer/issues/1493
export type InvitedMember = Member; // & { entry: InvitedEntry }

interface MembershipExternalResource {
  source: MembershipExternalResourceType;
  value: string;
}

export interface MemberWithDetails extends Member {
  about?: string;
  invitedBy?: Member;
  entry: MemberEntry;
  invitees: InvitedMember[];
  externalResources?: MembershipExternalResource[];
}

export const asMember = (data: Omit<MemberFieldsFragment, '__typename'>): Member => ({
  id: data.id,
  handle: data.handle,
  name: data.metadata.name ?? undefined,
  avatar: castQueryResult(data.metadata.avatar, 'AvatarUri')?.avatarUri,
  inviteCount: data.inviteCount,
  isFoundingMember: data.isFoundingMember,
  isCouncilMember: data.isCouncilMember,
  isVerified: data.isVerified,
  rootAccount: data.rootAccount,
  controllerAccount: data.controllerAccount,
  boundAccounts: [...data?.boundAccounts],
  boundAccountsEvents: data.stakingaccountaddedeventmember?.map(asBoundAccountsEvent) ?? [],
  roles: data.roles.map(asMemberRole),
  createdAt: data.createdAt,
});

const asBoundAccountsEvent = (
  fields: NonNullable<MemberFieldsFragment['stakingaccountaddedeventmember']>[0]
): BoundAccountEvent => ({
  createdAtBlock: asBlock({
    createdAt: fields.createdAt,
    inBlock: fields.inBlock,
    network: fields.network,
  }),
  account: fields.account,
});

export const asMemberRole = (data: MemberFieldsFragment['roles'][0]): MemberRole => ({
  id: data.id,
  isLead: data.isLead,
  groupName: asWorkingGroupName(data.group.name),
  createdAt: data.createdAt,
});

export interface CouncilMember {
  electedInCouncilId: string;
  handler: string;
}
export const asCouncilMember = (data: CouncilMemberFragment): CouncilMember => {
  return {
    electedInCouncilId: data.electedInCouncilId,
    handler: data.member.handle ?? ''
  }
}