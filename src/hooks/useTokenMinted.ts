import { useEffect, useMemo } from 'react';
import { ForSelectedCouncil } from './types';
import {
  useGetCouncilTokenLazyQuery, useGetWorkingGroupTokenLazyQuery,
  useGetMintedTokenLazyQuery, useGetFundedTokenLazyQuery
} from '@/queries'

export function useTokenMinted({ council }: ForSelectedCouncil) {

  const [fetchCouncilToken, CouncilTokenQuery] = useGetCouncilTokenLazyQuery();
  const [fetchWorkingGroupToken, WorkingGroupTokenQuery] = useGetWorkingGroupTokenLazyQuery();
  const [fetchMintedToken, MintedTokenQuery] = useGetMintedTokenLazyQuery();
  const [fetchFundedToken, FundedTokenQuery] = useGetFundedTokenLazyQuery();

  useEffect(() => {
    if (!council) return;

    var variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    fetchCouncilToken({
      variables,
    });

    fetchWorkingGroupToken({
      variables,
    });

    fetchMintedToken({
      variables,
    });

    fetchFundedToken({
      variables
    })
  }, [council]);

  const proposal = useMemo(() => WorkingGroupTokenQuery.data?.budgetUpdatedEvents.reduce((a: number, b) => {
    return a + (b.budgetChangeAmount / 10000000000);
  }, 0), [WorkingGroupTokenQuery.data]);

  const councildata = useMemo(() => MintedTokenQuery.data?.rewardPaymentEvents.reduce((a: number, b) => {
    return a + (b.paidBalance / 10000000000);
  }, 0), [MintedTokenQuery.data]);

  const minted = useMemo(() => CouncilTokenQuery.data?.budgetRefillEvents.reduce((a: number, b) => {
    return a + (b.balance / 10000000000);
  }, 0), [CouncilTokenQuery.data]);

  const buffer = useMemo(() => FundedTokenQuery.data?.requestFundedEvents.reduce((a: number, b) => {
    return a + (b.amount / 10000000000);
  }, 0), [FundedTokenQuery.data]);

  const councilBudget = minted! - councildata! - proposal! - buffer!;

  return {
    proposal,
    minted,
    councilBudget,
    councildata,
    loading: MintedTokenQuery.loading || CouncilTokenQuery.loading || WorkingGroupTokenQuery.loading || FundedTokenQuery.loading,
    error: MintedTokenQuery.error || CouncilTokenQuery.error || WorkingGroupTokenQuery.error || FundedTokenQuery.error,
  };
}
