import { useEffect, useMemo } from 'react';

import { useLeadersLazyQuery, usePostOfLeadersLazyQuery } from '@/queries';

import { ForSelectedCouncil } from './types';
import { asLeader, asLeaderPost } from '@/types';

export function useLeader({ council }: ForSelectedCouncil) {
  const [leader, leaderQuery] = useLeadersLazyQuery();
  const [postOfLeader, postOfLeaderQuery] = usePostOfLeadersLazyQuery();

  useEffect(() => {
    if (!council) return;

    let variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    leader({ variables })
    postOfLeader({ variables })

  }, [council]);

  const leaders = useMemo(() => leaderQuery.data?.openingFilledEvents.map(asLeader), [leaderQuery.data]);
  const postOfLeaders = useMemo(() => postOfLeaderQuery.data?.proposalDiscussionPosts.map(asLeaderPost), [postOfLeaderQuery.data]);

  return {
    leaders,
    postOfLeaders,
    loading: leaderQuery.loading || postOfLeaderQuery.loading,
    error: leaderQuery.error || postOfLeaderQuery.error,
  };
}
