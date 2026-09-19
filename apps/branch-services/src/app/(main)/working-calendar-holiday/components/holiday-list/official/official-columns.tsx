import { TFunction } from 'i18next';

import { Button, ColumnsType } from '@branch-services/ui-kit';

import type { OfficialYear, PageParams } from '../../../utils/types';
import { calculateRow, formatDateTime } from '../../../utils/utils';

type ColumnsParams = {
  t: TFunction;
  pagination: PageParams;
  onShowDetails: (year: number) => void;
};

export const getOfficialColumns = ({ t, pagination, onShowDetails }: ColumnsParams): ColumnsType<OfficialYear> => [
  {
    title: '#',
    key: 'row',
    align: 'center',
    width: 70,
    render: (_value, _record, index) => calculateRow(index, pagination.page, pagination.size),
  },
  { title: t('year'), dataIndex: 'year', align: 'center' },
  {
    title: t('last_modified'),
    dataIndex: 'lastModified',
    align: 'center',
    render: (value: string) => formatDateTime(value),
  },
  {
    title: t('actions'),
    key: 'actions',
    align: 'center',
    width: 180,
    render: (_value, { year }) => (
      <Button type='link' icon={<i className='ri-file-list-3-line' />} onClick={() => onShowDetails(year)}>
        {t('show_details')}
      </Button>
    ),
  },
];
