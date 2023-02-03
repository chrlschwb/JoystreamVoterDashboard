import { useEffect, useMemo } from 'react';

import { useGetProposalsLazyQuery } from '@/queries';
import { asProposal } from '@/types';

import { ForSelectedCouncil } from './types';

export function useProposals({ council }: ForSelectedCouncil) {
  const [fetchProposals, proposalsQuery] = useGetProposalsLazyQuery();

  useEffect(() => {
    if (!council) return;
    const variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    fetchProposals({
      variables,
    });
  }, [council]);

  const proposals = useMemo(() => proposalsQuery.data?.proposals.map(asProposal), [proposalsQuery.data]);

  return {
    proposals,
    loading: proposalsQuery.loading,
    error: proposalsQuery.error,
  };
}
