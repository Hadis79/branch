import { useState } from 'react';
import styled from 'styled-components';
import { TablePaginationConfig } from 'antd';
import { Box, Table, ColumnsType } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import useGroupStore from '../store/use-widget-store';
import type { GroupUnit } from '../utils/types';
import { formatCount } from '../utils/utils';

const TableTitle = styled.h4`
  margin: 0 0 1.6rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
`;

const UploadDetails = () => {
  const [t] = useTr();
  const units = useGroupStore((state) => state.uploadedUnits);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const columns: ColumnsType<GroupUnit> = [
    {
      title: '#',
      key: 'row',
      render: (_value, _record, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    { title: t('unit_name'), dataIndex: 'name', align: 'center' },
    { title: t('unit_code'), dataIndex: 'code', align: 'center' },
  ];

  const handleChange = ({ current = 1, pageSize = 10 }: TablePaginationConfig) => {
    setPagination({ current: pageSize === pagination.pageSize ? current : 1, pageSize });
  };

  return (
    <Box padding='3.2rem' flexDirection='column'>
      <TableTitle>{t('unit_list_title', { unitCount: formatCount(units.length) })}</TableTitle>
      <Table
        dataSource={units}
        columns={columns}
        mobileColumns={columns}
        rowKey='code'
        total={units.length}
        current={pagination.current}
        pagination={{ ...pagination, total: units.length, showSizeChanger: true }}
        onChange={handleChange}
        hasContainer={false}
      />
    </Box>
  );
};

export default UploadDetails;
