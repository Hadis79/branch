import { Box, ColumnsType } from '@branch-services/ui-kit';
import { addThousandSeparator, datetimeLocale, getValueOrDash, timeLocale } from '@branch-services/utils';

import * as S from './data-table.style';

export const mobileColumns = ({ t }): ColumnsType<any> => [
  {
    title: '',
    dataIndex: '',
    render: (value, record) => {
      return (
        <Box flexDirection='column'>
          <S.MobileTableItem>
            <span className='item__title'>{t('request_date')}</span>
            <span className='item__value'>{getValueOrDash(datetimeLocale(record?.createdOn))}</span>
          </S.MobileTableItem>
          <S.MobileTableItem>
            <span className='item__title'>{t('account_number')}</span>
            <span className='item__value'>{getValueOrDash(record?.accountNumber)}</span>
          </S.MobileTableItem>
          <S.MobileTableItem>
            <span className='item__title'>{t('transaction_type')}</span>
            <span className='item__value'>{getValueOrDash(record?.paymentType)}</span>
          </S.MobileTableItem>
          <S.MobileTableItem>
            <span className='item__title'>{t('amount')}</span>
            <span className='item__value'>
              {record?.featureType === 'CURRENCY_TRANSFER'
                ? `${addThousandSeparator(record?.totalAmount)}`
                : `${addThousandSeparator(record?.totalAmount)} ${t('common.rial')}`}
            </span>
          </S.MobileTableItem>
        </Box>
      );
    },
  },
];

export const columns = ({ t }): ColumnsType<any> => [
  {
    title: '#',
    align: 'center',
    render: (text, record, index) => {
      return index + 1;
    },
  },
  {
    title: t('request_time'),
    dataIndex: 'createdOn',
    align: 'center',
    render: (value) => {
      return getValueOrDash(timeLocale(value));
    },
  },
  {
    title: t('trace_code'),
    dataIndex: 'traceCode',
    align: 'center',
    render: (value) => getValueOrDash(value),
  },
  {
    title: t('ssn'),
    dataIndex: 'accountOwnerSsn',
    align: 'center',
    render: (value) => getValueOrDash(value),
  },
  {
    title: t('account_number'),
    dataIndex: 'accountNumber',
    align: 'center',
    render: (value) => {
      return getValueOrDash(value);
    },
  },
  {
    title: t('request_type'),
    dataIndex: 'requestTypeTitle',
    align: 'center',
    render: (value) => {
      return getValueOrDash(value);
    },
  },
  {
    title: `${t('deposit_amount')} (${t('common.rial')})`,
    dataIndex: 'totalAmount',
    align: 'center',
    render: (value, item) => {
      const amount = addThousandSeparator(value);
      return amount ? `${addThousandSeparator(amount)}` : getValueOrDash(value);
    },
  },
];
