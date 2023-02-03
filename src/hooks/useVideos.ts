import { useEffect, useMemo } from 'react';

import { useGetVideosCountLazyQuery } from '@/queries/__generated__/GetVideos.generated';

import { ForSelectedCouncil } from './types';

export function useVideos({ council }: ForSelectedCouncil) {

  const [fetchCreated, createdQuery] = useGetVideosCountLazyQuery();
  const [totalCreated, totalQuery] = useGetVideosCountLazyQuery();

  useEffect(() => {
    if (!council) return;

    var variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    fetchCreated({
      variables,
    });

    variables = {
      where: { createdAt_gt: "2013-01-10T22:50:12.000Z", createdAt_lt: council.endedAt?.timestamp },
    };

    totalCreated({
      variables,
    });
  }, [council]);

  const created = useMemo(() => createdQuery.data?.videosConnection.totalCount, [createdQuery.data]);
  const total = useMemo(() => totalQuery.data?.videosConnection.totalCount, [totalQuery.data]);

  return {
    created,
    total,
    loading: createdQuery.loading,
    error: createdQuery.error,
  };
}
