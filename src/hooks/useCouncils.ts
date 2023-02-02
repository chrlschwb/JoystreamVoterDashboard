import { useGetElectedCouncilsQuery } from '@/queries/__generated__/GetElectedCouncils.generated';

export const useElectedCouncil = () => {
  return useGetElectedCouncilsQuery();
};
