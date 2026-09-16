import { useQuery } from '@tanstack/react-query';
import { Api } from '../services';
import { organizationCodeQueryKeys } from '../utils/constants';

const useOrganizationNameQuery = (organizationCode: string) =>
  useQuery({
    queryKey: organizationCodeQueryKeys.name(organizationCode),
    queryFn: () => Api.getOrganizationName({ organizationCode }),
    enabled: false,
    retry: false,
  });

export default useOrganizationNameQuery;
