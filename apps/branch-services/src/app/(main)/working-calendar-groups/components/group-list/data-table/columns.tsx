import { Box, Button, ColumnsType } from '@branch-services/ui-kit';
import { getValueOrDash } from '@branch-services/utils';
import { PaginationState } from '@branch-services/types';
import { TFunction } from 'i18next';

import { calculateRow } from '../../../utils/utils';
import { GroupListItem, ModalType } from '../../../utils/types';

import * as S from './data-table.style';

type ColumnsProps = {
  t: TFunction;
  pagination: PaginationState['pagination'];
  openModalHandler: (record: any, type: ModalType) => void;
};

export const mobileColumns = ({ t }: Pick<ColumnsProps, 't'>): ColumnsType<GroupListItem> => [
  {
    title: '',
    dataIndex: '',
    render: (value, record) => {
      return (
        <Box flexDirection='column'>
          <S.MobileTableItem>
            <span className='item__title'>{t('group_name')}</span>
            <span className='item__value'>{getValueOrDash(record?.name)}</span>
          </S.MobileTableItem>
          <S.MobileTableItem>
            <span className='item__title'>{t('unit_count')}</span>
            <span className='item__value'>{getValueOrDash(record?.size)}</span>
          </S.MobileTableItem>
        </Box>
      );
    },
  },
];

export const columns = ({ t, pagination, openModalHandler }: ColumnsProps): ColumnsType<GroupListItem> => [
  {
    title: '#',
    align: 'center',
    render: (_value, _record, index) => calculateRow({ index, pagination }),
  },
  {
    title: t('group_name'),
    dataIndex: 'name',
    align: 'center',
    render: (value) => {
      return getValueOrDash(value);
    },
  },
  {
    title: t('unit_count'),
    dataIndex: 'size',
    align: 'center',
    render: (value) => getValueOrDash(value),
  },
  {
    title: t('actions'),
    key: 'actions',
    align: 'center',
    width: 190,
    render: (_value, record) => (
      <S.ButtonWrapper>
        <Button type='link' onClick={() => openModalHandler(record, 'edit')}>
          {t('edit')}
          <i className='ri-edit-line' />
        </Button>
        <Button className='ant-btn-delete' danger type='table' onClick={() => openModalHandler(record, 'remove')}>
          {t('delete')}
          <i className='ri-delete-bin-line' />
        </Button>
      </S.ButtonWrapper>
    ),
  },
];
