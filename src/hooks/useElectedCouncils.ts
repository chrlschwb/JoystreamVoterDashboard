import {
  ElectedCouncilOrderByInput,
  GetElectedCouncilsQueryVariables,
  useGetElectedCouncilsQuery,
} from '@/queries/__generated__';
import { asElectedCouncil } from '@/types';

export const useElectedCouncils = ({
  orderBy = ElectedCouncilOrderByInput.CreatedAtDesc,
  ...rest
}: GetElectedCouncilsQueryVariables) => {
  const { data, error, loading } = useGetElectedCouncilsQuery({ variables: { orderBy, ...rest } });

  return { error, loading, data: data?.electedCouncils.map(asElectedCouncil) };
};
