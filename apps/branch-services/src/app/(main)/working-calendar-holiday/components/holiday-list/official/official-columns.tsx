import { TFunction } from 'i18next';

import { Box, Button, ColumnsType } from '@branch-services/ui-kit';

import type { OfficialYear, PageParams } from '../../../utils/types';
import { calculateRow, formatDateTime } from '../../../utils/utils';

type ColumnsParams = {
  t: TFunction;
  pagination: PageParams;
  onShowDetails: (row: OfficialYear) => void;
  onEdit: (row: OfficialYear) => void;
};

export const getOfficialColumns = ({
  t,
  pagination,
  onShowDetails,
  onEdit,
}: ColumnsParams): ColumnsType<OfficialYear> => [
  {
    title: '#',
    key: 'row',
    align: 'center',
    width: 70,
    render: (_value, _record, index) => calculateRow(index, pagination.page, pagination.size),
  },
  {
    title: t('last_modified'),
    dataIndex: 'modifiedOn',
    align: 'center',
    render: (value: string) => formatDateTime(value),
  },
  { title: t('year'), dataIndex: 'year', align: 'center' },
  {
    title: t('actions'),
    key: 'actions',
    align: 'center',
    width: 180,
    render: (_value, row) => (
      <Box>
        <Button type='link' onClick={() => onShowDetails(row)}>
          {t('show_details')}
          <i className='ri-file-list-3-line' />
        </Button>
        <Button type='link' onClick={() => onEdit(row)}>
          {t('edit')}
          <i className='ri-pencil-line'></i>
        </Button>
      </Box>
    ),
  },
];
