import { useState } from 'react';
import styled from 'styled-components';
import { TablePaginationConfig } from 'antd';
import { Box, ColumnsType, Table } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import useGroupUnitsQuery from '../queries/use-group-units-query';
import useWorkingCalendarGroupPage from '../hooks/use-working-calendar-group-page';
import type { GroupUnit, PageParams } from '../utils/types';
import { calculateRow, formatCount } from '../utils/utils';

const TableTitle = styled.h4`
  margin: 0 0 1.6rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
`;

// Read-only list of one group's units, opened from the list's "show details" action
const GroupDetails = () => {
  const [t] = useTr();
  const { groupId } = useWorkingCalendarGroupPage();
  const [pagination, setPagination] = useState<PageParams>({ page: 1, size: 10 });
  const { data, isFetching } = useGroupUnitsQuery(groupId, pagination);

  const columns: ColumnsType<GroupUnit> = [
    {
      title: '#',
      key: 'row',
      align: 'center',
      render: (_value, _record, index) => calculateRow({ index, pagination }),
    },
    { title: t('unit_name'), dataIndex: 'name', align: 'center' },
    { title: t('unit_code'), dataIndex: 'code', align: 'center' },
  ];

  const handleChange = ({ current = 1, pageSize = pagination.size }: TablePaginationConfig) => {
    setPagination({ size: pageSize, page: pageSize === pagination.size ? current : 1 });
  };

  return (
    <Box padding='3.2rem' flexDirection='column'>
      <TableTitle>{t('unit_list_title', { unitCount: formatCount(data?.totalElements ?? 0) })}</TableTitle>
      <Table
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
    </Box>
  );
};

export default GroupDetails;
