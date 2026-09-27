import { useState } from 'react';
import { TablePaginationConfig } from 'antd';
import { Box, Table } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import useGroupStore from '../store/use-widget-store';
import { formatCount } from '../utils/utils';

import { unitColumns } from '../components/group-details/columns';
import { DetailsPage, TableTitle } from '../components/group-details/style';

const UploadDetails = () => {
  const [t] = useTr();
  const units = useGroupStore((state) => state.uploadedUnits);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const columns = unitColumns({
    nameTitle: t('unit_name'),
    codeTitle: t('unit_code'),
    pagination: { page: pagination.current, size: pagination.pageSize },
  });

  const handleChange = ({ current = 1, pageSize = 10 }: TablePaginationConfig) => {
    setPagination({ current: pageSize === pagination.pageSize ? current : 1, pageSize });
  };

  return (
    <DetailsPage>
      <Box marginBottom='1.6rem'>
        <TableTitle>{t('unit_list_title', { unitCount: formatCount(units.length) })}</TableTitle>
      </Box>
      <Table
        minHeight='0'
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
    </DetailsPage>
  );
};

export default UploadDetails;
