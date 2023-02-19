import { useEffect, useMemo } from 'react';

import { useLeadersLazyQuery, usePostOfLeadersLazyQuery, useTerminatedLazyQuery, useExitedLazyQuery, useSlashedLazyQuery } from '@/queries';

import { ForSelectedCouncil } from './types';
import { asExitedWorker, asLeader, asLeaderPost, asSlashedWorker, asTerminatedWorker, Block } from '@/types';

export function useLeader({ council }: ForSelectedCouncil) {

  const [leader, leaderQuery] = useLeadersLazyQuery();
  const [fetchFireWorker, hireWorkerQuery] = useLeadersLazyQuery();
  const [postOfLeader, postOfLeaderQuery] = usePostOfLeadersLazyQuery();
  const [terminatedWorker, terminatedQuery] = useTerminatedLazyQuery();
  const [exitedWorker, exitedQuery] = useExitedLazyQuery();
  const [slashedWorker, slashedQuery] = useSlashedLazyQuery();

  useEffect(() => {
    if (!council) return;

    let variables = {
      where: { createdAt_gt: "2022-12-17T00:00:00.000Z", createdAt_lt: council.endedAt?.timestamp },
    };

    leader({ variables });

    variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    postOfLeader({ variables });
    terminatedWorker({ variables });
    exitedWorker({ variables });
    slashedWorker({ variables })
    fetchFireWorker({ variables });

  }, [council]);

  const leaders = useMemo(() => leaderQuery.data?.openingFilledEvents.map(asLeader), [leaderQuery.data]);
  const postOfLeaders = useMemo(() => postOfLeaderQuery.data?.proposalDiscussionPosts.map(asLeaderPost), [postOfLeaderQuery.data]);
  const terminated = useMemo(() => terminatedQuery.data?.terminatedWorkerEvents.map(asTerminatedWorker), [terminatedQuery.data]);
  const exited = useMemo(() => exitedQuery.data?.workerExitedEvents.map(asExitedWorker), [exitedQuery.data]);
  const slashed = useMemo(() => slashedQuery.data?.workEntrySlashedEvents.map(asSlashedWorker), [slashedQuery.data]);
  const hair = useMemo(() => hireWorkerQuery.data?.openingFilledEvents.map(asLeader), [hireWorkerQuery.data]);

  return {
    leaders,
    postOfLeaders,
    terminated,
    exited,
    slashed,
    hair,
    loading: leaderQuery.loading || postOfLeaderQuery.loading || terminatedQuery.loading || exitedQuery.loading || slashedQuery.loading,
    error: leaderQuery.error || postOfLeaderQuery.error || terminatedQuery.error || exitedQuery.error || slashedQuery.error,
  };
}
