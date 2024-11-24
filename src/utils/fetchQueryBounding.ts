import { FetchQueryOptions, QueryClient, QueryKey } from '@tanstack/react-query';

export const fetchQueryBonding = async <T>(
  queryClient: QueryClient,
  option: FetchQueryOptions<T, Error, T, QueryKey>,
  errorFn?: () => void,
) => {
  try {
    const data = await queryClient.fetchQuery<T>(option);
    return data;
  } catch (error) {
    if (errorFn) {
      errorFn();
    }
    return null;
  }
};
