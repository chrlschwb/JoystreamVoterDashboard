import { useEffect, useMemo } from 'react';

import { useGetForumThreadsCountLazyQuery } from '@/queries';

import { ForSelectedCouncil } from './types';

export function useThreadData({ council }: ForSelectedCouncil) {
  const [fetchCreated, createdQuery] = useGetForumThreadsCountLazyQuery();
  const [totalCreated, totalQuery] = useGetForumThreadsCountLazyQuery();

  useEffect(() => {
    if (!council) return;
    let variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    fetchCreated({
      variables,
    });

    variables = {
      where: { createdAt_gt: '2013-01-10T22:50:12.000Z', createdAt_lt: council.endedAt?.timestamp },
    };

    totalCreated({
      variables,
    });
  }, [council]);

  const created = useMemo(() => createdQuery.data?.forumThreadsConnection.totalCount, [createdQuery.data]);
  const total = useMemo(() => totalQuery.data?.forumThreadsConnection.totalCount, [totalQuery.data]);

  return {
    created,
    total,
    loading: createdQuery.loading,
    error: createdQuery.error,
  };
}
