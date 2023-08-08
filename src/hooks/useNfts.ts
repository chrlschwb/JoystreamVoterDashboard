import { useEffect, useMemo } from 'react';

import { useGetNftIssuedCountLazyQuery, useGetNftSaleCountLazyQuery } from '@/queries';

import { ForSelectedCouncil } from './types';

export function useNFTs({ council }: ForSelectedCouncil) {
  const [fetchIssued, IssuedQuery] = useGetNftIssuedCountLazyQuery();
  const [totalSale, SaleQuery] = useGetNftSaleCountLazyQuery();

  useEffect(() => {
    if (!council) return;

    const variables = {
      where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    fetchIssued({
      variables,
    });
    totalSale({
      variables,
    });
  }, [council]);

  const issued = useMemo(() => IssuedQuery.data?.nftIssuedEventsConnection.totalCount, [IssuedQuery.data]);
  const sale = useMemo(() => SaleQuery.data?.nftBoughtEventsConnection.totalCount, [SaleQuery.data]);
  const fee = 0; //// ???------
  return {
    issued,
    sale,
    fee,
    loading: IssuedQuery.loading || SaleQuery.loading,
    error: IssuedQuery.error || SaleQuery.loading,
  };
}
