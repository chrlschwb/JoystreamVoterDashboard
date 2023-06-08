import { useEffect, useMemo } from 'react';

import { useGetWorkingGroupsLazyQuery, useGetWorkingGroupTokenLazyQuery, useGetRewardsLazyQuery, useGetBudgetSpendingLazyQuery, WorkingGroupFieldsFragment, WorkerMemberFragment } from '@/queries';
import { asBudgetSpending, asRewardPaid, asWorkingGroup } from '@/types';

import { ForSelectedCouncil } from './types';

var worker: WorkerMemberFragment[] = [];
export function useWorkingGroups({ council }: ForSelectedCouncil) {

  const [fetch, query] = useGetWorkingGroupsLazyQuery();
  const [fetchToken, tokenQuery] = useGetWorkingGroupTokenLazyQuery();
  const [fetchTokenReward, tokenQueryReward] = useGetWorkingGroupTokenLazyQuery();
  const [fetchTokenRewardNow, tokenQueryRewardNow] = useGetWorkingGroupTokenLazyQuery();
  const [fetchReward, tokenReward] = useGetRewardsLazyQuery();
  const [fetchBudgetSpending, budgetSpendingQuery] = useGetBudgetSpendingLazyQuery();

  useEffect(() => {
    if (!council) return;

    var variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    fetch();
    fetchToken({
      variables
    })


    fetchReward({
      variables
    })

    fetchBudgetSpending({
      variables
    })

    fetchTokenRewardNow({
      variables
    })

    variables = {
      where: { createdAt_gt: "1970-01-01T00:00:00.000Z", createdAt_lt: council.endedAt?.timestamp },
    };

    fetchTokenReward({
      variables
    })

  }, [council]);

  const workingGroups = useMemo(() => query.data?.workingGroups.map(asWorkingGroup), [query.data]);

  const workers = useMemo(() => {
    worker = [];
    query.data?.workingGroups.map(d => {
      d.workers.map(k => {

        const endAt = council?.endedAt ? (council.endedAt).timestamp : Date.now();
        const endAtDate = new Date(endAt);
        const startAt = council?.electedAt ? council.electedAt.timestamp : new Date("1970-01-01T00:00:00.000Z")
        const startAtDate = new Date(startAt);

        const entry = new Date(k.entry.createdAt)
        const terminate = new Date(k.terminatedworkereventworker.length === 0 ? "1970-01-01T00:00:00.000Z": k.terminatedworkereventworker[k.terminatedworkereventworker.length-1].createdAt );
        const exited = new Date(k.workerexitedeventworker.length === 0 ? "1970-01-01T00:00:00.000Z":
          k.workerexitedeventworker[k.workerexitedeventworker.length-1].createdAt
           );

        if (entry.getTime() < endAtDate.getTime()) {

          if (k.terminatedworkereventworker.length===0 && k.workerexitedeventworker.length===0) {
            worker.push(k);
          } else if (terminate.getTime() > startAtDate.getTime() || exited.getTime() > startAtDate.getTime()) {
            worker.push(k);
          }
        }
      })
    })

    return (worker)
  }, [worker]);

  const workingTokens = useMemo(() => tokenQuery.data?.budgetUpdatedEvents, [tokenQuery.data]);
  const workingTokensReward = useMemo(() => tokenQueryReward.data?.budgetUpdatedEvents, [tokenQueryReward.data]);
  const workingTokensRewardNow = useMemo(() => tokenQueryRewardNow.data?.budgetUpdatedEvents, [tokenQueryRewardNow.data]);
  const rewardToken = useMemo(() => tokenReward.data?.rewardPaidEvents.map(asRewardPaid), [tokenReward.data]);
  const budgetSpending = useMemo(() => budgetSpendingQuery.data?.budgetSpendingEvents.map(asBudgetSpending), [budgetSpendingQuery.data]);


  return {
    workingGroups,
    workingTokens,
    workingTokensReward,
    workingTokensRewardNow,
    budgetSpending,
    rewardToken,
    workers,
    loading: query.loading || tokenQuery.loading || tokenReward.loading || tokenQueryReward.loading || budgetSpendingQuery.loading || tokenQueryRewardNow.loading,
    error: query.error || tokenQuery.error || tokenReward.error || tokenQueryReward.error || budgetSpendingQuery.error || tokenQueryRewardNow.error,
  };
}
