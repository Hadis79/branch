import { useRouter, useSearchParams } from 'next/navigation';

import { SERVICE_RULES_PATH, ServiceRulesPage } from '../utils/constants';

// `step` is also read by the layout breadcrumb, which shows its value as the last crumb
const isValidPage = (value: string | null): value is ServiceRulesPage =>
  Object.values(ServiceRulesPage).includes(value as ServiceRulesPage);

const useServiceRulesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  const currentPage = isValidPage(step) ? step : ServiceRulesPage.LIST;

  const navigateTo = (page: ServiceRulesPage) => {
    if (page === ServiceRulesPage.LIST) {
      router.push(SERVICE_RULES_PATH);
      return;
    }

    router.push(`${SERVICE_RULES_PATH}?step=${page}`);
  };

  return { currentPage, navigateTo };
};

export default useServiceRulesPage;
