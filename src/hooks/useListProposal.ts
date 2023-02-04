import { useEffect, useMemo } from 'react';

import { useGetListPorposalLazyQuery } from '@/queries/__generated__/GetListProposal.generated';

import { ForSelectedCouncil } from './types';

export function useListProposal({ council }: ForSelectedCouncil) {

  const [fetchCreated, createdQuery] = useGetListPorposalLazyQuery();

  useEffect(() => {
    if (!council) return;
    var variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    fetchCreated({
      variables,
    });


  }, [council]);

  const listProposal = useMemo(() => createdQuery.data?.proposalCreatedEventsConnection.edges, [createdQuery.data]);

  return {
    listProposal,
    loading: createdQuery.loading,
    error: createdQuery.error,
  };
}
