import { useEffect, useMemo } from 'react';

import {
  useLeadersLazyQuery,
  usePostOfLeadersLazyQuery,
  useTerminatedLazyQuery,
  useExitedLazyQuery,
  useSlashedLazyQuery,
  useTerminatedLeadLazyQuery,
} from '@/queries';

import { ForSelectedCouncil } from './types';
import { asExitedWorker, asLeader, asLeaderPost, asSlashedWorker, asTerminatedWorker, Block } from '@/types';

export function useLeader({ council }: ForSelectedCouncil) {
  const [leader, leaderQuery] = useLeadersLazyQuery();
  const [leaderTerminated, leaderTerminatedQuery] = useTerminatedLeadLazyQuery();
  const [leaderExited, leaderExitedQuery] = useExitedLazyQuery();

  const [fetchFireWorker, hireWorkerQuery] = useLeadersLazyQuery();
  const [postOfLeader, postOfLeaderQuery] = usePostOfLeadersLazyQuery();
  const [terminatedWorker, terminatedQuery] = useTerminatedLazyQuery();
  const [exitedWorker, exitedQuery] = useExitedLazyQuery();
  const [slashedWorker, slashedQuery] = useSlashedLazyQuery();

  useEffect(() => {
    if (!council) return;

    let variables = {
      where: { createdAt_gt: '2022-12-17T00:00:00.000Z', createdAt_lt: council.endedAt?.timestamp },
    };

    leader({ variables });

    variables = {
      where: { createdAt_gt: '2022-12-17T00:00:00.000Z', createdAt_lt: council.electedAt?.timestamp },
    };

    leaderTerminated({ variables });
    leaderExited({ variables });

    variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    postOfLeader({ variables });
    terminatedWorker({ variables });
    exitedWorker({ variables });
    slashedWorker({ variables });
    fetchFireWorker({ variables });
  }, [council]);

  const data = useMemo(() => leaderQuery.data?.openingFilledEvents.map(asLeader), [leaderQuery.data]);

  const leadersTerminated = useMemo(
    () => leaderTerminatedQuery.data?.terminatedLeaderEvents,
    [leaderTerminatedQuery.data]
  );

  const leadersOpening = data?.filter((i) => i.type === 'LEADER');

  const terminatedLeader = leadersOpening?.filter((obj) => {
    const obj3 = leadersTerminated?.find((obj2) => {
      const openingDate = new Date(obj.createAt);
      const terminatedDate = new Date(obj2.createdAt);
      return (
        obj2.groupId === obj.groupId &&
        terminatedDate > openingDate &&
        obj.leader[0].membership.handle === obj2.worker.membership.handle
      );
    });

    if (obj3) {
      return false;
    } else {
      return true;
    }
  });

  const leadersExited = useMemo(() => leaderExitedQuery.data?.workerExitedEvents, [leaderExitedQuery.data]);

  const leaders = terminatedLeader?.filter(
    (item) =>
      !leadersExited?.some((otherItem) => {
        const exitedDate = new Date(otherItem.createdAt);
        const openingDate = new Date(item.createAt);

        return (
          item.leader[0].membership.handle === otherItem.worker.membership.handle &&
          item.groupId === otherItem.groupId &&
          exitedDate > openingDate
        );
      })
  );

  const postOfLeaders = useMemo(
    () => postOfLeaderQuery.data?.proposalDiscussionPosts.map(asLeaderPost),
    [postOfLeaderQuery.data]
  );
  const terminated = useMemo(
    () => terminatedQuery.data?.terminatedWorkerEvents.map(asTerminatedWorker),
    [terminatedQuery.data]
  );
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
    loading:
      leaderQuery.loading ||
      postOfLeaderQuery.loading ||
      terminatedQuery.loading ||
      exitedQuery.loading ||
      slashedQuery.loading ||
      leaderTerminatedQuery.loading ||
      leaderExitedQuery.loading,
    error:
      leaderQuery.error ||
      postOfLeaderQuery.error ||
      terminatedQuery.error ||
      exitedQuery.error ||
      slashedQuery.error ||
      leaderTerminatedQuery.error ||
      leaderExitedQuery.error,
  };
}
