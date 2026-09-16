import { useMemo } from 'react';

import useGroupStore from '../store/use-widget-store';

export type GroupListQueryParams = {
  page: number;
  size: number;
  name?: string;
};

export type GroupListParamSource = {
  filter: { name?: string };
  pagination: { page: number; size: number };
};

const ParamUtil = {
  groupList: ({ filter, pagination }: GroupListParamSource): GroupListQueryParams => ({
    page: pagination.page,
    size: pagination.size,
    name: filter.name?.trim() || undefined,
  }),
};

export const useGroupListParams = (): GroupListQueryParams => {
  const name = useGroupStore((state) => state.filter.name);
  const page = useGroupStore((state) => state.pagination.page);
  const size = useGroupStore((state) => state.pagination.size);

  return useMemo(() => ParamUtil.groupList({ filter: { name }, pagination: { page, size } }), [name, page, size]);
};

export default ParamUtil;
