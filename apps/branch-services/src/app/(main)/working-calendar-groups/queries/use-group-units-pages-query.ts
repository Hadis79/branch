import { keepPreviousData, useQueries } from '@tanstack/react-query';

import { Api } from '../services';
import { groupQueryKeys } from '../utils/constants';
import type { GroupUnit } from '../utils/types';
import useQueryErrorMessage from '../hooks/use-query-error-message';

// Several service pages of a group's units at once (a table page can span two of them)
const useGroupUnitsPagesQuery = (id: string, pages: number[], size: number) => {
  const queries = useQueries({
    queries: pages.map((page) => ({
      queryKey: groupQueryKeys.groupUnitsPage(id, { page, size }),
      queryFn: () => Api.getGroupUnits({ id, page, size }),
      placeholderData: keepPreviousData,
    })),
  });

  useQueryErrorMessage(queries.find(({ error }) => error)?.error ?? null);

  const unitsByPage = new Map<number, GroupUnit[]>();
  queries.forEach(({ data }, index) => data && unitsByPage.set(pages[index], data.content));

  return {
    unitsByPage,
    // Every response carries the total, so any loaded page gives it
    totalElements: queries.find(({ data }) => data)?.data?.totalElements,
    isFetching: queries.some(({ isFetching }) => isFetching),
  };
};

export default useGroupUnitsPagesQuery;
