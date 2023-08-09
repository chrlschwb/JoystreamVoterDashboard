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

// const arr1 = [{id: 1, name: 'John'}, {id: 2, name: 'Jane'},{id:5, name: 'test'}];
// const arr2 = [{id: 1, name: 'John'}, {id: 3, name: 'Bob'},{id:4, name:"Jande"}];

// const str1 = JSON.stringify(arr1);
// const str2 = JSON.stringify(arr2);

// if (str1!== str2) {
//   const data1 = JSON.parse(str1);
//   const data2 = JSON.parse(str2);
//   const notSameData = data1.filter(item =>!data2.some(otherItem => item.id === otherItem.id));
//   console.log('The data that is not the same is:', notSameData);
// } else {
//   console.log('The two arrays are the same');
// }
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

  const leaders = useMemo(() => leaderQuery.data?.openingFilledEvents.map(asLeader), [leaderQuery.data]);

  const leadersTerminated = useMemo(
    () => leaderTerminatedQuery.data?.TerminatedLeaderEvent,
    [leaderTerminatedQuery.data]
  );

  console.log(leaders);

  const leadersExited = useMemo(() => leaderExitedQuery.data?.workerExitedEvents, [leaderExitedQuery.data]);

  // const leaders = leadersOpening?.filter(
  //   (item) => !leadersTerminated?.some((otherItem) => item.leader === otherItem.worker.membership.handle)
  // );

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
      slashedQuery.loading,
    error:
      leaderQuery.error || postOfLeaderQuery.error || terminatedQuery.error || exitedQuery.error || slashedQuery.error,
  };
}
