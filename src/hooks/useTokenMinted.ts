import { useEffect, useMemo } from 'react';

// import { useGetCandidatesCountQuery, useGetCastVotesCountLazyQuery } from '@/queries/__generated__/GetElection.generated';

import { ForSelectedCouncil } from './types';

export function useTokenMinted({ council }: ForSelectedCouncil) {

  // const [fetchCandidates, CandidateQuery] = useGetCandidatesCountQuery();
  // const [fetchVotes, VotesQuery] = useGetCastVotesCountLazyQuery();

  useEffect(() => {
    if (!council) return;

    // var variables = {
    //   where: { createdAt_gt: council.electedAt.timestamp, createdAt_lt: council.endedAt?.timestamp },
    // };

    // fetchCandidates({
    //   variables,
    // });
    // fetchVotes({
    //   variables,
    // });
  }, [council]);

  // const candidates = useMemo(() => CandidateQuery.data?.candidatesConnection.totalCount, [CandidateQuery.data]);
  // const votes = useMemo(() => VotesQuery.data?.castVotesConnection.totalCount, [VotesQuery.data]);
  const proposal = "-" ///  ------
  const minted = "-"
  const councildata = "-"
  return {
    proposal,
    minted,
    councildata,
    loading: false,// CandidateQuery.loading || VotesQuery.loading,
    error: false, //CandidateQuery.error || VotesQuery.loading,
  };
}
