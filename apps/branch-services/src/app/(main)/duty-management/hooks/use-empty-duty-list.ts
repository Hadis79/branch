import useDutiesQuery from '../queries/use-duties-query';

// Nothing defined yet (as opposed to still loading or failed)
const useEmptyDutyList = (enabled = true) => {
  const { data, isSuccess, isFetching } = useDutiesQuery(enabled);

  return enabled && isSuccess && !isFetching && data.length === 0;
};

export default useEmptyDutyList;
