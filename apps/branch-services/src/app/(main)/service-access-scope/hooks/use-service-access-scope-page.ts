import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { SERVICE_ACCESS_SCOPE_PATH, ServiceAccessScopePage } from '../utils/constants';

// `step` is also read by the layout breadcrumb, which shows its value as the last crumb
const isValidPage = (value: string | null): value is ServiceAccessScopePage =>
  Object.values(ServiceAccessScopePage).includes(value as ServiceAccessScopePage);

const getPageUrl = (page: ServiceAccessScopePage) =>
  page === ServiceAccessScopePage.LIST ? SERVICE_ACCESS_SCOPE_PATH : `${SERVICE_ACCESS_SCOPE_PATH}?step=${page}`;

const useServiceAccessScopePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  const currentPage = isValidPage(step) ? step : ServiceAccessScopePage.LIST;

  const navigateTo = useCallback((page: ServiceAccessScopePage) => router.push(getPageUrl(page)), [router]);

  // Without a history entry, so going back skips the page left
  const replaceWith = useCallback((page: ServiceAccessScopePage) => router.replace(getPageUrl(page)), [router]);

  return { currentPage, navigateTo, replaceWith };
};

export default useServiceAccessScopePage;
