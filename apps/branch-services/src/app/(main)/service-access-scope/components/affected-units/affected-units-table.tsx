import { useMemo, useState } from 'react';
import { Skeleton, TablePaginationConfig } from 'antd';

import { useTr } from '@branch-services/translation';
import { Table } from '@branch-services/ui-kit';

import * as S from './affected-units.style';
import { getAffectedUnitColumns } from './affected-units-columns';
import ErrorState from '../error-state/error-state';
import { TableSkeleton } from '../loading-skeletons/loading-skeletons';
import useQueryErrorMessage from '../../hooks/use-query-error-message';
import useGroupUnitsQuery from '../../queries/use-group-units-query';
import { DEFAULT_PAGE_PARAMS } from '../../utils/constants';
import { formatCount } from '../../utils/utils';
import type { PageParams } from '../../utils/types';

// A group's units, a page at a time; a skeleton on the first load, the table's own spinner after that
const AffectedUnitsTable = ({ groupId }: { groupId: string }) => {
  const [t] = useTr();
  const [pagination, setPagination] = useState<PageParams>(DEFAULT_PAGE_PARAMS);
  const { data, isLoading, isFetching, error, refetch, isRefetching } = useGroupUnitsQuery(groupId, pagination);
  useQueryErrorMessage(error);

  const columns = useMemo(
    () => getAffectedUnitColumns({ nameTitle: t('unit_name'), codeTitle: t('unit_code'), pagination }),
    [t, pagination]
  );

  // A new page size starts over from the first page
  const handleChange = ({ current = 1, pageSize = pagination.size }: TablePaginationConfig) =>
    setPagination({ size: pageSize, page: pageSize === pagination.size ? current : 1 });

  if (error && !data) return <ErrorState onRetry={() => refetch()} retrying={isRefetching} />;

  return (
    <S.Page>
      {isLoading ? (
        <Skeleton.Input active size='small' style={{ width: '18rem' }} />
      ) : (
        <S.Title>{t('affected_units_title', { unitCount: formatCount(data?.totalElements ?? 0) })}</S.Title>
      )}
      {isLoading ? (
        <TableSkeleton rows={pagination.size} />
      ) : (
        <Table
          minHeight='0'
          loading={isFetching}
          dataSource={data?.content}
          columns={columns}
          mobileColumns={columns}
          rowKey='code'
          total={data?.totalElements}
          current={pagination.page}
          pagination={{ current: pagination.page, pageSize: pagination.size }}
          onChange={handleChange}
          hasContainer={false}
        />
      )}
    </S.Page>
  );
};

export default AffectedUnitsTable;
