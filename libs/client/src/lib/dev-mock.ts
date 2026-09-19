import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { MenuModel, MenuType, UserModel } from '@branch-services/types';

// Development-only stand-in for the layout requests (user profile and menu),
// so the app can run without access to the backend.
// Enabled with NEXT_PUBLIC_MOCK_LAYOUT_API=true (e.g. in apps/<app>/.env.development.local).
export const isLayoutMockEnabled =
  process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_MOCK_LAYOUT_API === 'true';

const menuItem = (
  id: number,
  title: string,
  href: string,
  icon = '',
  children: MenuModel[] = [],
  parentId = 0
): MenuModel => ({
  id,
  title,
  href,
  icon,
  children,
  parentId,
  order: id,
  // Items without an existing route are shown disabled
  active: !!href || children.length > 0,
  description: '',
  menuType: MenuType.MENU,
  accessScope: '',
  userType: '',
});

const mockMenu: MenuModel[] = [
  menuItem(1, 'خانه', 'home', 'ri-home-4-line'),
  menuItem(2, 'درخواست‌های جدید', 'new-requests', 'ri-add-circle-line'),
  menuItem(3, 'تاریخچه درخواست‌ها', 'operations-requests-history', 'ri-history-line'),
  menuItem(4, 'تقویم کاری خدمات', '', 'ri-calendar-2-line', [
    menuItem(41, 'قوانین', '', '', [], 4),
    menuItem(42, 'سرویس‌ها', 'working-calendar-services', '', [], 4),
    menuItem(43, 'گروه‌بندی‌ها', 'working-calendar-groups', '', [], 4),
    menuItem(44, 'واحدهای مجاز', '', '', [], 4),
    menuItem(45, 'مدیریت تعطیلات', 'working-calendar-holiday', '', [], 4),
    menuItem(46, 'نمای تقویم', '', '', [], 4),
  ]),
];

const mockUser = {
  name: 'کاربر آزمایشی',
  clientSsn: '',
  orgName: '',
  organizations: [],
  userInfo: {
    name: 'کاربر',
    family: 'آزمایشی',
    english_name: 'Test',
    english_family: 'User',
    organization: '',
    national_code: '',
    employee_id: '',
    branch_code: '0000',
    job_code: '',
    job_status_code: '',
  },
  jobInfo: { job_code: '', job_name: 'کارشناس شعبه' },
  branchInfo: { branch_code: '0000', branch_name: 'شعبه آزمایشی' },
} as unknown as UserModel;

const MOCK_RESPONSES: Array<{ pattern: RegExp; data: unknown }> = [
  { pattern: /\/user\/profile$/, data: mockUser },
  { pattern: /\/menu$/, data: mockMenu },
];

// Returns an adapter that answers the request locally, or undefined to send it as usual
export const getLayoutMockAdapter = (config: InternalAxiosRequestConfig) => {
  const url = (config.url ?? '').split('?')[0];
  const mock = MOCK_RESPONSES.find(({ pattern }) => pattern.test(url));
  if (!mock) return undefined;

  return async (): Promise<AxiosResponse> => ({
    data: structuredClone(mock.data),
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
    request: {},
  });
};
