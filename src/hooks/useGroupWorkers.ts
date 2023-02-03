import { useEffect, useMemo } from 'react';

import { useGetWorkersLazyQuery } from '@/queries';
import { asWorker, WorkingGroup } from '@/types';

import { ForSelectedCouncil } from './types';

export interface UseGroupWorkers extends ForSelectedCouncil {
  workingGroup: WorkingGroup;
}

export function useGroupWorkers({ council, workingGroup }: UseGroupWorkers) {
  const [fetch, query] = useGetWorkersLazyQuery();

  useEffect(() => {
    fetch({ variables: { where: { groupId_contains: workingGroup.id } } });
  }, [council, workingGroup]);

  const workers = useMemo(() => {
    return query.data?.workers.map(asWorker);
  }, [query.data]);

  return { workers, loading: query.loading, error: query.error };
}
