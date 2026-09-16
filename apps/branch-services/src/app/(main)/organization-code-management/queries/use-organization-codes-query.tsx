import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Api } from '../services';
import useOrganizationCodeStore from '../store/use-widget-store';
import { organizationCodeQueryKeys } from '../utils/constants';
import { getOrganizationCodeListParams } from '../utils/utils';

const useOrganizationCodesQuery = () => {
  const pagination = useOrganizationCodeStore((state) => state.pagination);
  const filter = useOrganizationCodeStore((state) => state.filter);
  const params = getOrganizationCodeListParams(pagination, filter);

  return useQuery({
    queryKey: organizationCodeQueryKeys.list(params),
    queryFn: () => Api.getOrganizationCodes(params),
    staleTime: 0,
    refetchOnMount: 'always',
    placeholderData: keepPreviousData,
  });
};

export default useOrganizationCodesQuery;
