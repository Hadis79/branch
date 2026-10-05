import { useMemo } from 'react';

import useGroupStore from '../store/use-widget-store';
import type { GroupType } from './types';

export type GroupListQueryParams = {
  page: number;
  size: number;
  name?: string;
  groupType?: GroupType;
};

export type GroupListParamSource = {
  filter: { name?: string; groupType?: GroupType | '' };
  pagination: { page: number; size: number };
};

const ParamUtil = {
  groupList: ({ filter, pagination }: GroupListParamSource): GroupListQueryParams => ({
    page: pagination.page,
    size: pagination.size,
    name: filter.name?.trim() || undefined,
    groupType: filter.groupType || undefined,
  }),
};

export const useGroupListParams = (): GroupListQueryParams => {
  const name = useGroupStore((state) => state.filter.name);
  const groupType = useGroupStore((state) => state.filter.groupType);
  const page = useGroupStore((state) => state.pagination.page);
  const size = useGroupStore((state) => state.pagination.size);

  return useMemo(
    () => ParamUtil.groupList({ filter: { name, groupType }, pagination: { page, size } }),
    [name, groupType, page, size]
  );
};

export default ParamUtil;
