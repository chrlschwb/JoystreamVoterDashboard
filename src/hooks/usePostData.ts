import { useEffect, useMemo } from 'react';

import { useGetForumPostsCountLazyQuery } from '@/queries';

import { ForSelectedCouncil } from './types';
import { asFroumPost } from '@/types';

export function usePostTokenData({ council }: ForSelectedCouncil) {
  const [fetchCreated, createdQuery] = useGetForumPostsCountLazyQuery();
  const [totalCreated, totalQuery] = useGetForumPostsCountLazyQuery();

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

  const buffer1 = useMemo(() => createdQuery.data, [createdQuery.data]);
  const created = buffer1?.forumPostsConnection.totalCount;
  const forumPost = buffer1?.forumPostsConnection.edges.map(asFroumPost);

  const buffer2 = useMemo(() => totalQuery.data, [totalQuery.data]);
  const total = buffer2?.forumPostsConnection.totalCount;
  const forum = buffer2?.forumPosts;

  return {
    created,
    total,
    forum,
    forumPost,
    loading: createdQuery.loading || totalQuery.loading,
    error: createdQuery.error || totalQuery.error,
  };
}
