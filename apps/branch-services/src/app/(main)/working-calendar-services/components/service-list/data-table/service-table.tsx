import { useMemo } from 'react';
import { TablePaginationConfig } from 'antd';

import { useAppTheme } from '@branch-services/hooks';
import { useTr } from '@branch-services/translation';
import { EmptyData, Table } from '@branch-services/ui-kit';

import { getServiceColumns } from './columns';
import useServicesQuery from '../../../queries/use-services-query';
import useServiceStore from '../../../store/use-widget-store';
import type { ServiceItem } from '../../../utils/types';

const ServiceTable = () => {
  const [t] = useTr();
  const theme = useAppTheme();
  const pagination = useServiceStore((state) => state.pagination);
  const setPagination = useServiceStore((state) => state.setPagination);
  const openModal = useServiceStore((state) => state.openModal);
  const { data, isFetching } = useServicesQuery();

  const columns = useMemo(
    () =>
      getServiceColumns({
        t,
        theme,
        pagination,
        onEdit: (service: ServiceItem) => openModal('edit', service),
      }),
    [t, theme, pagination, openModal]
  );

  const handleTableChange = ({ current = 1, pageSize = pagination.size }: TablePaginationConfig) => {
    setPagination({ size: pageSize, page: pageSize === pagination.size ? current : 1 });
  };

  return (
    <Table
      loading={isFetching}
      dataSource={data?.content}
      columns={columns}
      mobileColumns={columns}
      onChange={handleTableChange}
      hasContainer={false}
      total={data?.totalElements}
      current={pagination.page}
      pagination={{
        current: pagination.page,
        pageSize: pagination.size,
      }}
      locale={{ emptyText: <EmptyData description={t('no_matching_services')} /> }}
      rowKey='id'
    />
  );
};

export default ServiceTable;
