import { useEffect, useMemo } from 'react';

import {  useGetMembersLazyQuery } from '@/queries';

import { ForSelectedCouncil } from './types';

export function useMembers({ council }: ForSelectedCouncil) {
  const [fetchMembers, membersQuery] = useGetMembersLazyQuery();

  useEffect(() => {
    if (!council) return;
    let variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    fetchMembers({
      variables,
    });
  }, [council]);

  const members = useMemo(() => membersQuery.data, [membersQuery.data]);

  return {
    members,
    loading: membersQuery.loading,
    error: membersQuery.error,
  };
}
