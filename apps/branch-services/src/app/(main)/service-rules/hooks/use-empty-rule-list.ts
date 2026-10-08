import useRulesQuery from '../queries/use-rules-query';

const useEmptyRuleList = (enabled = true) => {
  const { data, isSuccess, isFetching } = useRulesQuery();

  return enabled && isSuccess && !isFetching && data.length === 0;
};

export default useEmptyRuleList;
