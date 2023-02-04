import { useEffect, useMemo } from 'react';

import { useGetCreatedProposalLazyQuery, useGetExcuetedProposalLazyQuery } from '@/queries/__generated__/GetNumberProposal.generated';

import { ForSelectedCouncil } from './types';
import { create } from 'domain';

export function useNumberProposal({ council }: ForSelectedCouncil) {

  const [fetchCreated, createdQuery] = useGetCreatedProposalLazyQuery();
  const [fetchExcuted, excutedQuery] = useGetExcuetedProposalLazyQuery();

  useEffect(() => {
    if (!council) return;

    var variables = {
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
  const wait = "-"   /// -----
  return {
    created,
    executed,
    failed,
    wait,
    loading: createdQuery.loading || excutedQuery.loading,
    error: createdQuery.error || excutedQuery.loading,
  };
}
