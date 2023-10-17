import { useEffect, useMemo } from 'react';

import {
  useGetWorkingGroupTokenLazyQuery,
  useGetRewardsLazyQuery,
  useGetBudgetSpendingLazyQuery,
  useGetWorkingGroupsNameLazyQuery,
  WorkersFragment,
} from '@/queries';
import { asBudgetSpending, asRewardPaid, asWorkingGroupAndWork } from '@/types';

import { ForSelectedCouncil } from './types';

var worker: WorkersFragment[] = [];

export function useWorkingGroups({ council }: ForSelectedCouncil) {
  const [fetch, query] = useGetWorkingGroupsNameLazyQuery();
  const [fetchToken, tokenQuery] = useGetWorkingGroupTokenLazyQuery();
  const [fetchTokenReward, tokenQueryReward] = useGetWorkingGroupTokenLazyQuery();
  const [fetchReward, tokenReward] = useGetRewardsLazyQuery();
  const [fetchBudgetSpending, budgetSpendingQuery] = useGetBudgetSpendingLazyQuery();

  useEffect(() => {
    if (!council) return;

    var variables = {
      where: { inBlock_gt: council.electedAt.number, inBlock_lt: council.endedAt?.number },
    };

    fetch();
    fetchToken({
      variables,
    });

    fetchReward({
      variables,
    });

    fetchBudgetSpending({
      variables,
    });

    variables = {
      where: { inBlock_gt: council.electedAt.number, inBlock_lt: council.endedAt?.number },
    };

    fetchTokenReward({
      variables,
    });
  }, [council]);

  const workingGroups = useMemo(() => query.data?.workingGroups.map(asWorkingGroupAndWork), [query.data]);

  worker = [];

  const workers = useMemo(() => {
    query.data?.workingGroups.map((d) => {
      d.workers.map((k) => {
        const endAt = council?.endedAt ? council.endedAt.timestamp : Date.now();
        const endAtDate = new Date(endAt);
        const startAt = council?.electedAt ? council.electedAt.timestamp : new Date('1970-01-01T00:00:00.000Z');
        const startAtDate = new Date(startAt);

        const entry = new Date(k.entry.createdAt);
        const terminate = new Date(
          k.terminatedworkereventworker.length === 0
            ? '1970-01-01T00:00:00.000Z'
            : k.terminatedworkereventworker[k.terminatedworkereventworker.length - 1].createdAt
        );
        const exited = new Date(
          k.workerexitedeventworker.length === 0
            ? '1970-01-01T00:00:00.000Z'
            : k.workerexitedeventworker[k.workerexitedeventworker.length - 1].createdAt
        );

        if (entry.getTime() < endAtDate.getTime()) {
          if (k.terminatedworkereventworker.length === 0 && k.workerexitedeventworker.length === 0) {
            worker.push(k);
          } else if (terminate.getTime() > startAtDate.getTime() || exited.getTime() > startAtDate.getTime()) {
            worker.push(k);
          }
        }
      });
    });

    return worker;
  }, [worker]);

  const workingTokens = useMemo(() => tokenQuery.data?.budgetUpdatedEvents, [tokenQuery.data]);
  const workingTokensReward = useMemo(() => tokenQueryReward.data?.budgetUpdatedEvents, [tokenQueryReward.data]);
  const rewardToken = useMemo(() => tokenReward.data?.rewardPaidEvents.map(asRewardPaid), [tokenReward.data]);
  const budgetSpending = useMemo(
    () => budgetSpendingQuery.data?.budgetSpendingEvents.map(asBudgetSpending),
    [budgetSpendingQuery.data]
  );

  return {
    workingGroups,
    workingTokens,
    workingTokensReward,
    budgetSpending,
    rewardToken,
    workers,
    loading:
      query.loading ||
      tokenQuery.loading ||
      tokenReward.loading ||
      tokenQueryReward.loading ||
      budgetSpendingQuery.loading,
    error: query.error || tokenQuery.error || tokenQueryReward.error || tokenReward.error || budgetSpendingQuery.error,
  };
}
