import { useEffect, useMemo } from 'react';

import { useGetMembersCountLazyQuery } from '@/queries/__generated__/GetMembers.generated';
import { useGetInvitedMembersCountLazyQuery } from '@/queries/__generated__/members.generated';

import { ForSelectedCouncil } from './types';

export function useMemberships({ council }: ForSelectedCouncil) {
  const [fetchCreated, createdQuery] = useGetMembersCountLazyQuery();
  const [fetchInvited, invitedQuery] = useGetInvitedMembersCountLazyQuery();

  useEffect(() => {
    if (!council) return;
    const variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };
    fetchCreated({
      variables,
    });
    fetchInvited({
      variables,
    });
  }, [council]);

  const created = useMemo(() => createdQuery.data?.membershipsConnection.totalCount, [createdQuery.data]);
  const invited = useMemo(() => invitedQuery.data?.memberInvitedEventsConnection.totalCount, [invitedQuery.data]);

  const total = useMemo(() => {
    if (created !== undefined && invited !== undefined) return created + invited;
    if (created !== undefined) return created;
    if (invited !== undefined) return invited;
  }, [created, invited]);

  return {
    created,
    invited,
    total,
    loading: createdQuery.loading || invitedQuery.loading,
    error: createdQuery.error || invitedQuery.error,
  };
}
