import { useEffect, useMemo } from 'react';

import { useGetCreatedProposalsCountLazyQuery, useGetExecutedProposalsCountLazyQuery } from '@/queries';

import { ForSelectedCouncil } from './types';

export function useNumberProposal({ council }: ForSelectedCouncil) {
  const [fetchCreated, createdQuery] = useGetCreatedProposalsCountLazyQuery();
  const [fetchExcuted, excutedQuery] = useGetExecutedProposalsCountLazyQuery();

  useEffect(() => {
    if (!council) return;

    const variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    fetchCreated({
      variables,
    });
    fetchExcuted({
      variables,
    });
  }, [council]);

  const created = useMemo(() => createdQuery.data?.proposalCreatedEventsConnection.totalCount, [createdQuery.data]);
  const executed = useMemo(() => excutedQuery.data?.proposalExecutedEventsConnection.totalCount, [excutedQuery.data]);
  const failed = created! - executed!;
  const wait = '-'; /// -----
  return {
    created,
    executed,
    failed,
    wait,
    loading: createdQuery.loading || excutedQuery.loading,
    error: createdQuery.error || excutedQuery.loading,
  };
}
