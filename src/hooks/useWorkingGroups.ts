import { useEffect, useMemo } from 'react';

import { useGetWorkingGroupsLazyQuery, useGetWorkingGroupTokenLazyQuery } from '@/queries';
import { asWorkingGroup } from '@/types';

import { ForSelectedCouncil } from './types';

export function useWorkingGroups({ council }: ForSelectedCouncil) {
  const [fetch, query] = useGetWorkingGroupsLazyQuery();
  const [fetchToken, tokenQuery] = useGetWorkingGroupTokenLazyQuery();

  useEffect(() => {
    if (!council) return;

    var variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    fetch();
    fetchToken({
      variables
    })
  }, [council]);

  const workingGroups = useMemo(() => query.data?.workingGroups.map(asWorkingGroup), [query.data]);
  const workingTokens = useMemo(() => tokenQuery.data?.budgetUpdatedEvents, [tokenQuery.data]);

  return {
    workingGroups,
    workingTokens,
    loading: query.loading || tokenQuery.loading,
    error: query.error || tokenQuery.error,
  };
}
