export type ActiveBackBtnOnPathname = {
  pathnames: string[];
  searchParams: string[];
  searchParamValues: string[];
};

export const activeBackBtnOnPathname: ActiveBackBtnOnPathname = {
  pathnames: [
    '/cartable/file-details',
    '/batch-ach-request/file-details',
    '/batch-ach-history/file-details',
    '/new-requests/file-details',
    '/list-request',
  ],
  searchParams: ['id', 'ssn'],
  searchParamValues: ['file-details', 'query-status'],
};
