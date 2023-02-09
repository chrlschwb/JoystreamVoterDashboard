import { useEffect, useMemo } from 'react';

import { useGetCouncilMembersLazyQuery } from '@/queries';

import { ForSelectedCouncil } from './types';
import { asCouncilMember } from '@/types';

export function useCouncilMembers({ council }: ForSelectedCouncil) {

  const [fetch, query] = useGetCouncilMembersLazyQuery();

  useEffect(() => {

    if (!council) return;

    const variables = {
      where: { electedInCouncil: { id_eq: council.id } },
    };

    fetch({
      variables,
    });
  }, [council]);


  const member = useMemo(() => query.data?.councilMembers.map(asCouncilMember), [query.data]);

  return {
    member,
    loading: query.loading,
    error: query.error,
  };
}
