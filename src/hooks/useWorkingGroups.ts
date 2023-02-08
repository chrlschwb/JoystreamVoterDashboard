import { useEffect, useMemo } from 'react';

import { useGetWorkingGroupsLazyQuery, useGetWorkingGroupTokenLazyQuery, useGetRewardsLazyQuery } from '@/queries';
import { asWorkingGroup } from '@/types';

import { ForSelectedCouncil } from './types';

export function useWorkingGroups({ council }: ForSelectedCouncil) {

  const [fetch, query] = useGetWorkingGroupsLazyQuery();
  const [fetchToken, tokenQuery] = useGetWorkingGroupTokenLazyQuery();
  const [fetchTokenReward, tokenQueryReward] = useGetWorkingGroupTokenLazyQuery();
  const [fetchReward, tokenReward] = useGetRewardsLazyQuery();

  useEffect(() => {
    if (!council) return;

    var variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };


    fetch();
    fetchToken({
      variables
    })


    variables = {
      where: { createdAt_gt: "1970-01-01T00:00:00.000Z", createdAt_lt: council.endedAt?.timestamp },
    };

    fetchTokenReward({
      variables
    })

    fetchReward({
      variables
    })
  }, [council]);

  const workingGroups = useMemo(() => query.data?.workingGroups.map(asWorkingGroup), [query.data]);
  const workingTokens = useMemo(() => tokenQuery.data?.budgetUpdatedEvents, [tokenQuery.data]);
  const workingTokensReward = useMemo(() => tokenQueryReward.data?.budgetUpdatedEvents, [tokenQueryReward.data]);
  const rewardToken = useMemo(() => tokenReward.data?.rewardPaidEvents, [tokenReward.data]);

  return {
    workingGroups,
    workingTokens,
    workingTokensReward,
    rewardToken,
    loading: query.loading || tokenQuery.loading || tokenReward.loading || tokenQueryReward.loading,
    error: query.error || tokenQuery.error || tokenReward.error || tokenQueryReward.error,
  };
}
