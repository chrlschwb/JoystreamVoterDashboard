import { useEffect, useMemo } from 'react';

import { useGetNftAuctionsCountLazyQuery, useGetNftIssuedCountLazyQuery, useGetNftSaleCountLazyQuery } from '@/queries';

import { ForSelectedCouncil } from './types';

export function useNFTs({ council }: ForSelectedCouncil) {
  const [fetchIssued, IssuedQuery] = useGetNftIssuedCountLazyQuery();
  const [totalSale, SaleQuery] = useGetNftSaleCountLazyQuery();
  const [totalAuctions, AuctionsQuery] = useGetNftAuctionsCountLazyQuery();

  useEffect(() => {
    if (!council) return;

    const variables = {
      where: { createdAt_gt: council.electedAt?.timestamp, createdAt_lt: council.endedAt?.timestamp },
    };

    fetchIssued({
      variables,
    });
    totalSale({
      variables,
    });

    totalAuctions({
      variables,
    });
  }, [council]);

  const issued = useMemo(() => IssuedQuery.data?.nftIssuedEventsConnection.totalCount, [IssuedQuery.data]);

  const sales = useMemo(() => SaleQuery.data?.nftBoughtEventsConnection.totalCount, [SaleQuery.data]);
  const auctions = useMemo(() => AuctionsQuery.data?.auctionsConnection.totalCount, [AuctionsQuery.data]);

  const sale = sales! + auctions!;

  const fee = 0; //// ???------
  return {
    issued,
    sale,
    fee,
    loading: IssuedQuery.loading || SaleQuery.loading || AuctionsQuery.loading,
    error: IssuedQuery.error || SaleQuery.error || AuctionsQuery.error,
  };
}
