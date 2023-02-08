import { useEffect, useMemo } from 'react';

import { useGetCreatedProposalsCountLazyQuery, useGetExecutedProposalsCountLazyQuery, useGetProposalsLazyQuery } from '@/queries';

import { ForSelectedCouncil } from './types';

export function useNumberProposal({ council }: ForSelectedCouncil) {
  const [fetchCreated, createdQuery] = useGetCreatedProposalsCountLazyQuery();
  const [fetchExcuted, excutedQuery] = useGetExecutedProposalsCountLazyQuery();
  const [fetchProposals, proposalsQuery] = useGetProposalsLazyQuery();

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
    fetchProposals({
      variables,
    });
  }, [council]);

  const created = useMemo(() => createdQuery.data?.proposalCreatedEventsConnection.totalCount, [createdQuery.data]);
  const executed = useMemo(() => excutedQuery.data?.proposalExecutedEventsConnection.totalCount, [excutedQuery.data]);

  const wait = useMemo(() => {
    var test: number = 0;
    proposalsQuery.data?.proposals.map(d => {
      if (d.status.__typename === "ProposalStatusDormant")
        test = test + 1;
    }
    )
    return (test)
  }, [proposalsQuery.data]);

  const deciding = useMemo(() => {
    var test: number = 0;
    proposalsQuery.data?.proposals.map(d => {
      if (d.status.__typename === "ProposalStatusDeciding")
        test = test + 1;
    }
    )
    return (test)
  }, [proposalsQuery.data]);

  const failed = created! - executed! - wait - deciding;
  return {
    created,
    executed,
    failed,
    wait,
    loading: createdQuery.loading || excutedQuery.loading,
    error: createdQuery.error || excutedQuery.loading,
  };
}
