import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { DUTY_PATH, DutyPage } from '../utils/constants';

// `step` is also read by the layout breadcrumb, which shows its value as the last crumb
const isValidPage = (value: string | null): value is DutyPage => Object.values(DutyPage).includes(value as DutyPage);

const getPageUrl = (page: DutyPage) => (page === DutyPage.LIST ? DUTY_PATH : `${DUTY_PATH}?step=${page}`);

const useDutyPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  const currentPage = isValidPage(step) ? step : DutyPage.LIST;

  const navigateTo = useCallback((page: DutyPage) => router.push(getPageUrl(page)), [router]);

  // Without a history entry, so going back skips the page left
  const replaceWith = useCallback((page: DutyPage) => router.replace(getPageUrl(page)), [router]);

  return { currentPage, navigateTo, replaceWith };
};

export default useDutyPage;
