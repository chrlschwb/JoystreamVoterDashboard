import { useEffect, useMemo } from 'react';

import { useGetForumPostsCountLazyQuery } from '@/queries';

import { ForSelectedCouncil } from './types';
import { asFroumPost } from '@/types';

export function usePostTokenData({ council }: ForSelectedCouncil) {
  const [fetchCreated, createdQuery] = useGetForumPostsCountLazyQuery();
  const [totalCreated, totalQuery] = useGetForumPostsCountLazyQuery();
  const [fetchForumPost, forumPostQuery] = useGetForumPostsCountLazyQuery();

  useEffect(() => {
    if (!council) return;
    let variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    fetchCreated({
      variables,
    });
    fetchForumPost({
      variables
    })

    variables = {
      where: { createdAt_gt: '2013-01-10T22:50:12.000Z', createdAt_lt: council.endedAt?.timestamp },
    };

    totalCreated({
      variables,
    });
  }, [council]);

  const created = useMemo(() => createdQuery.data?.forumPostsConnection.totalCount, [createdQuery.data]);
  const total = useMemo(() => totalQuery.data?.forumPostsConnection.totalCount, [totalQuery.data]);
  const forum = useMemo(() => totalQuery.data?.forumPosts, [totalQuery.data]);
  const forumPost = useMemo(() => forumPostQuery.data?.forumPostsConnection.edges.map(asFroumPost), [forumPostQuery.data]);

  return {
    created,
    total,
    forum,
    forumPost,
    loading: createdQuery.loading,
    error: createdQuery.error,
  };
}
