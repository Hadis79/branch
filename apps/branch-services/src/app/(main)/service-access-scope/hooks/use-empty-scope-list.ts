import useScopesQuery from '../queries/use-scopes-query';

// Nothing defined yet (as opposed to still loading or failed)
const useEmptyScopeList = (enabled = true) => {
  const { data, isSuccess, isFetching } = useScopesQuery(enabled);

  return enabled && isSuccess && !isFetching && data.length === 0;
};

export default useEmptyScopeList;
