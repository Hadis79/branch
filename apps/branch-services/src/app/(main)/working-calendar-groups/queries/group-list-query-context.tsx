'use client';

import { createContext, useContext, type ReactNode } from 'react';

import useGroupListQuery from './use-group-list-query';

type GroupListQueryResult = ReturnType<typeof useGroupListQuery>;

const GroupListQueryContext = createContext<GroupListQueryResult | null>(null);

export const GroupListQueryProvider = ({ enabled, children }: { enabled: boolean; children: ReactNode }) => {
  const query = useGroupListQuery(enabled);
  return <GroupListQueryContext.Provider value={query}>{children}</GroupListQueryContext.Provider>;
};

export const useGroupListQueryContext = (): GroupListQueryResult => {
  const query = useContext(GroupListQueryContext);
  if (!query) throw new Error('useGroupListQueryContext must be used inside GroupListQueryProvider');
  return query;
};
