import { TFunction } from 'i18next';

import { ITheme } from '@branch-services/types';
import { Button, ColumnsType, Text } from '@branch-services/ui-kit';

import type { ServiceItem, ServicePagination } from '../../../utils/types';

type ColumnsParams = {
  t: TFunction;
  theme: ITheme;
  pagination: ServicePagination;
  onEdit: (service: ServiceItem) => void;
};

export const getServiceColumns = ({ t, theme, pagination, onEdit }: ColumnsParams): ColumnsType<ServiceItem> => [
  {
    title: '#',
    key: 'row',
    align: 'center',
    width: 70,
    render: (_value, _record, index) => (pagination.page - 1) * pagination.size + index + 1,
  },
  { title: t('service_name'), dataIndex: 'persianName', align: 'center' },
  { title: t('service_english_name'), dataIndex: 'englishName', align: 'center' },
  {
    title: t('status'),
    dataIndex: 'active',
    align: 'center',
    render: (active: boolean) => (
      <Text as='span' color={active ? theme.success : theme.error}>
        {t(active ? 'active' : 'inactive')}
      </Text>
    ),
  },
  {
    title: t('actions'),
    key: 'actions',
    align: 'center',
    width: 140,
    render: (_value, service) => (
      <Button type='link' onClick={() => onEdit(service)}>
        {t('edit')}
        <i className='ri-edit-line' />
      </Button>
    ),
  },
];
