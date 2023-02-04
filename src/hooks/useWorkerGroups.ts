import { useEffect, useMemo } from 'react';

import { useGetWorkerGroupsLazyQuery } from '@/queries/__generated__/GetWorkingGroups.generated';

import { ForSelectedCouncil } from './types';

export function useWorkerGroups({ council }: ForSelectedCouncil) {

  const [fetchCreated, createdQuery] = useGetWorkerGroupsLazyQuery();

  useEffect(() => {
    if (!council) return;
    var variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    fetchCreated({
      variables,
    });


  }, [council]);

  const workerGroups = useMemo(() => createdQuery.data?.workingGroupsConnection.edges.node, [createdQuery.data]);

  return {
    workerGroups,
    loading: createdQuery.loading,
    error: createdQuery.error,
  };
}
