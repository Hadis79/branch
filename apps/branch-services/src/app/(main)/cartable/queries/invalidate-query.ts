import { queryClient } from '@branch-services/hooks';

/**
 * Invalidates queries with the given key in React Query.
 *
 * @param queryKey - The key of the query to invalidate.
 * @returns A Promise that resolves after the query is invalidated.
 */
export function invalidateQueryByKey(queryKey: string | string[]) {
  if (!queryClient) {
    console.warn('QueryClient is not initialized. Unable to invalidate queries.');
    return;
  }

  try {
    queryClient.invalidateQueries({ queryKey: [...queryKey] });
    console.info(`Query with key "${queryKey}" invalidated successfully.`);
  } catch (error) {
    console.error(`Failed to invalidate query with key "${queryKey}":`, error);
  }
}
