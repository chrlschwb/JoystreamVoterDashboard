import { useEffect, useMemo } from 'react';

import {
  useGetTerminatedWorkdersLazyQuery,
  useGetWorkedExitedLazyQuery,
  useGetOpeningFilledLazyQuery,
} from '@/queries';

import { ForSelectedCouncil } from './types';

export function useWorker({ council }: ForSelectedCouncil) {
  const [fetchTerminated, terminatedQuery] = useGetTerminatedWorkdersLazyQuery();
  const [fetchExited, exitedQuery] = useGetWorkedExitedLazyQuery();
  const [fetchFilled, filledQuery] = useGetOpeningFilledLazyQuery();

  useEffect(() => {
    if (!council) return;

    var variables = {
      where: { createdAt_gt: '2019-01-01T00:00:00.000Z', createdAt_lt: council.endedAt?.timestamp },
    };

    fetchTerminated({ variables });
    fetchExited({
      variables,
    });
    fetchFilled({
      variables,
    });
  }, [council]);

  const terminatedWorker = useMemo(() => terminatedQuery.data?.terminatedWorkerEvents, [terminatedQuery.data]);
  const exitedWorker = useMemo(() => exitedQuery.data?.workerExitedEvents, [exitedQuery.data]);
  const filledWorker = useMemo(() => filledQuery.data?.openingFilledEvents, [filledQuery.data]);

  return {
    terminatedWorker,
    exitedWorker,
    filledWorker,
    loading: terminatedQuery.loading || exitedQuery.loading || filledQuery.loading,
    error: terminatedQuery.error || exitedQuery.error || filledQuery.error,
  };
}
