import { useEffect, useMemo } from 'react';

import { useGetChannelsCountLazyQuery } from '@/queries/__generated__/GetChannels.generated';

import { ForSelectedCouncil } from './types';

export function useChannels({ council }: ForSelectedCouncil) {

  const [fetchCreated, createdQuery] = useGetChannelsCountLazyQuery();
  const [totalCreated, totalQuery] = useGetChannelsCountLazyQuery();

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

  const created = useMemo(() => createdQuery.data?.channelsConnection.totalCount, [createdQuery.data]);
  const total = useMemo(() => totalQuery.data?.channelsConnection.totalCount, [totalQuery.data]);

  return {
    created,
    total,
    loading: createdQuery.loading,
    error: createdQuery.error,
  };
}
