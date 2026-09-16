import { useState } from 'react';
import { TablePaginationConfig } from 'antd';
import { Box, Table, ColumnsType } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import useGroupStore from '../store/use-widget-store';
import type { GroupUnit } from '../utils/types';

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
    { title: t('unit_code'), dataIndex: 'code', align: 'center' },
    { title: t('unit_name'), dataIndex: 'name', align: 'center' },
  ];

  const handleChange = ({ current = 1, pageSize = 10 }: TablePaginationConfig) => {
    setPagination({ current: pageSize === pagination.pageSize ? current : 1, pageSize });
  };

  return (
    <Box padding='3.2rem' flexDirection='column'>
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
