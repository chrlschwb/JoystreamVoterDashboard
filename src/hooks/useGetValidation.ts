import { useEffect, useMemo } from 'react';

// import { useGetCandidatesCountQuery, useGetCastVotesCountLazyQuery } from '@/queries/__generated__/GetElection.generated';

import { ForSelectedCouncil } from './types';

export function useValidation({ council }: ForSelectedCouncil) {

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
  const validator = "-" ///  ------
  const stake = "-"
  const mint = "-"
  return {
    validator,
    stake,
    mint,
    loading: false,// CandidateQuery.loading || VotesQuery.loading,
    error: false, //CandidateQuery.error || VotesQuery.loading,
  };
}
