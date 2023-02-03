import { useEffect, useMemo } from 'react';

import { useGetMembersCountLazyQuery } from '@/queries/__generated__/GetMembers.generated';
import { useGetInvitedMembersCountLazyQuery } from '@/queries/__generated__/members.generated';

import { ForSelectedCouncil } from './types';

export function useMemberships({ council }: ForSelectedCouncil) {
  const [fetchTotal, totalQuery] = useGetMembersCountLazyQuery();
  const [fetchCreated, createdQuery] = useGetMembersCountLazyQuery();
  const [fetchInvited, invitedQuery] = useGetInvitedMembersCountLazyQuery();

  useEffect(() => {
    if (!council) return;
    var variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };
    fetchCreated({
      variables,
    });

    fetchInvited({
      variables,
    });

    variables = {
      where: { createdAt_gt: "2013-01-10T22:50:12.000Z", createdAt_lt: council.endedAt?.timestamp },
    };

    fetchTotal({
      variables,
    });

  }, [council]);

  const created = useMemo(() => createdQuery.data?.membershipsConnection.totalCount, [createdQuery.data]);
  const invited = useMemo(() => invitedQuery.data?.memberInvitedEventsConnection.totalCount, [invitedQuery.data]);
  const total = useMemo(() => totalQuery.data?.membershipsConnection.totalCount, [totalQuery.data]);

  return {
    created,
    invited,
    total,
    loading: createdQuery.loading || invitedQuery.loading,
    error: createdQuery.error || invitedQuery.error,
  };
}
