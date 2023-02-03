import { useEffect, useMemo } from 'react';

import { useGetElectionsLazyQuery } from '@/queries';

import { ForSelectedCouncil } from './types';

export function useElection({ council }: ForSelectedCouncil) {
  const [fetch, query] = useGetElectionsLazyQuery();

  useEffect(() => {
    if (!council) return;

    const variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    fetch({
      variables,
    });
  }, [council]);

  const election = useMemo(
    () => ((query.data?.electionRounds.length || 0) > 0 ? query.data?.electionRounds[0] : undefined),
    [query.data]
  );
  return {
    election,
    loading: query.loading,
    error: query.error,
  };
}
