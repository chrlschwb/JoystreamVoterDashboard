import { useEffect, useMemo } from 'react';

import { useGetWorkingGroupsLazyQuery } from '@/queries';
import { asWorkingGroup } from '@/types';

import { ForSelectedCouncil } from './types';

export function useWorkingGroups({ council }: ForSelectedCouncil) {
  const [fetch, query] = useGetWorkingGroupsLazyQuery();

  useEffect(() => {
    if (!council) return;

    fetch();
  }, [council]);

  const workingGroups = useMemo(() => query.data?.workingGroups.map(asWorkingGroup), [query.data]);

  return {
    workingGroups,
    loading: query.loading,
    error: query.error,
  };
}
