import {
  ElectedCouncilOrderByInput,
  GetElectedCouncilsQueryVariables,
  useGetElectedCouncilsQuery,
} from '@/queries/__generated__';

export const useElectedCouncils = ({
  orderBy = ElectedCouncilOrderByInput.CreatedAtDesc,
  ...rest
}: GetElectedCouncilsQueryVariables) => {
  return useGetElectedCouncilsQuery({ variables: { orderBy, ...rest } });
};
