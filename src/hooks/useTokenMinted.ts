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
  const [fetchCouncilTokens, CouncilTokensQuery] = useGetCouncilTokenLazyQuery();
  const [fetchWorkingGroupTokens, WorkingGroupTokensQuery] = useGetWorkingGroupTokenLazyQuery();
  const [fetchMintedTokens, MintedTokensQuery] = useGetMintedTokenLazyQuery();


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

    var variables = {
      where: { createdAt_gt: "1970-01-01T00:00:00.000Z", createdAt_lt: council.endedAt?.timestamp },
    };
    fetchCouncilTokens({
      variables,
    });

    fetchWorkingGroupTokens({
      variables,
    });

    fetchMintedTokens({
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

  const proposals = useMemo(() => WorkingGroupTokensQuery.data?.budgetUpdatedEvents.reduce((a: number, b) => {
    return a + (b.budgetChangeAmount / 10000000000);
  }, 0), [WorkingGroupTokensQuery.data]);

  const councildatas = useMemo(() => MintedTokensQuery.data?.rewardPaymentEvents.reduce((a: number, b) => {
    return a + (b.paidBalance / 10000000000);
  }, 0), [MintedTokensQuery.data]);

  const minteds = useMemo(() => CouncilTokensQuery.data?.budgetRefillEvents.reduce((a: number, b) => {
    return a + (b.balance / 10000000000);
  }, 0), [CouncilTokensQuery.data]);

  const buffer = useMemo(() => FundedTokenQuery.data?.requestFundedEvents.reduce((a: number, b) => {
    return a + (b.amount / 10000000000);
  }, 0), [FundedTokenQuery.data]);

  const councilBudget = minteds! - councildatas! - proposals! - buffer!;

  return {
    proposal,
    minted,
    councilBudget,
    councildata,
    loading: MintedTokenQuery.loading || CouncilTokenQuery.loading || WorkingGroupTokenQuery.loading || FundedTokenQuery.loading,
    error: MintedTokenQuery.error || CouncilTokenQuery.error || WorkingGroupTokenQuery.error || FundedTokenQuery.error,
  };
}
