import { TFunction } from 'i18next';

import { ColumnsType } from '@branch-services/ui-kit';

import RowActions from './row-actions';
import { getHolidayInfoColumns } from '../../holidays-table/holiday-info-columns';
import type { Holiday, HolidayModalType, PageParams } from '../../../utils/types';
import { calculateRow } from '../../../utils/utils';

type ColumnsParams = {
  t: TFunction;
  pagination: PageParams;
  openModalHandler: (holiday: Holiday, type: HolidayModalType) => void;
};

export const getHolidayColumns = ({ t, pagination, openModalHandler }: ColumnsParams): ColumnsType<Holiday> => [
  {
    title: '#',
    key: 'row',
    align: 'center',
    width: 70,
    render: (_value, _record, index) => calculateRow(index, pagination.page, pagination.size),
  },
  ...getHolidayInfoColumns<Holiday>(t),
  {
    title: t('actions'),
    key: 'actions',
    align: 'center',
    width: 180,
    render: (_value, holiday) => <RowActions holiday={holiday} openModalHandler={openModalHandler} />,
  },
];
