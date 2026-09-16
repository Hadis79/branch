import { Progress, Tooltip } from 'antd';
import { InfoWrapper } from './list.style';
import * as S from '../../validation-step/validation-result/success-box/success-box.style';
import { addThousandSeparator, getValueOrDash } from '@branch-services/utils';
import { Box, ColumnsType } from '@branch-services/ui-kit';

function calculateRow(index: number, pagination) {
  return pagination.page * pagination.size + index + 1;
}

export const columns = (t: (key: string) => string, pagination: any, pageTable?: string): ColumnsType<any> => {
  if (pageTable !== 'ADD_INFO') {
    return [
      {
        title: '#',
        dataIndex: '',
        key: 'index',
        width: 'min-content',
        align: 'center',
        render: (value, record, index) => <S.Index>{calculateRow(index, pagination)}</S.Index>,
      },
      {
        title: t('field.dest_iban_number'),
        dataIndex: 'counterPartyAccount',
        key: 'id',
        align: 'center',
        render: (value) => getValueOrDash(value),
      },
      // {
      //   title: t('deposit_ID'),
      //   dataIndex: 'depositId',
      //   key: 'id',
      //   align: 'center',
      //   render: (value) => renderDepositId(value),
      // },
      {
        title: t('transfer_amount'),
        dataIndex: 'amount',
        key: 'id',
        align: 'center',
        render: (value) => getValueOrDash(value),
      },
      {
        title: t('dest_account_owner'),
        dataIndex: 'counterPartyName',
        key: 'id',
        align: 'center',
        render: (value) => getValueOrDash(value),
      },
      {
        title: t('field.inquiry_account_holder'),
        dataIndex: 'ibanInquiryName',
        key: 'id',
        align: 'center',
        render: (value) => getValueOrDash(value),
      },
      {
        title: t('field.match_percentage'),
        dataIndex: 'similarityPercentage',
        key: 'id',
        align: 'center',
        render: (value) => (
          <S.SimilarityPercentage>
            {value ? (
              <Progress
                type='circle'
                strokeColor={value === 100 ? 'green' : value >= 50 ? 'blue' : 'red'}
                size={'small'}
                percent={value}
              />
            ) : (
              '-'
            )}
          </S.SimilarityPercentage>
        ),
      },
    ];
  }

  return [
    {
      title: '#',
      dataIndex: '',
      key: 'index',
      align: 'center',
      render: (value, record, index) => calculateRow(index, pagination),
    },
    {
      title: t('iban_number'),
      dataIndex: 'counterPartyAccount',
      key: 'index',
      align: 'center',
      render: (value) => getValueOrDash(value),
    },
    {
      title: t('dest_account_owner'),
      dataIndex: 'counterPartyName',
      key: 'index',
      align: 'center',
      render: (value) => {
        const parts = value.split(',').map((part) => part.trim());
        const [firstPart, secondPart, ...restParts] = parts;

        const limitedSecondPart = secondPart && secondPart.length > 5 ? secondPart.slice(0, 5) + '...' : secondPart;

        const tooltipContent = [
          secondPart && `<span>${secondPart}</span>`,
          ...restParts.map((part) => `<span>${part}</span>`),
        ]
          .filter(Boolean)
          .join('<br/>');

        return (
          <InfoWrapper>
            {tooltipContent ? (
              <Tooltip placement='top' title={<span dangerouslySetInnerHTML={{ __html: tooltipContent }} />}>
                <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {firstPart && `${firstPart}, `}
                  {limitedSecondPart}
                  <i className='ri-information-line'></i>
                </div>
              </Tooltip>
            ) : (
              <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {firstPart && `${firstPart}`}
                {secondPart && `, ${secondPart}`}
              </div>
            )}
          </InfoWrapper>
        );
      },
    },
    {
      title: t('national_code'),
      dataIndex: 'nationalCode',
      key: 'index',
      align: 'center',
      render: (value) => getValueOrDash(value),
    },
    // {
    //   title: t('deposit_id'),
    //   dataIndex: 'depositId',
    //   key: 'index',
    //   align: 'center',
    //   render: (value) => renderDepositId(value),
    // },
    {
      title: t('deposit_description_title'),
      dataIndex: 'reason',
      key: 'index',
      align: 'center',
      render: (value) => getValueOrDash(value),
    },
    {
      title: t('amount'),
      dataIndex: 'amount',
      key: 'index',
      align: 'center',
      render: (value) => getValueOrDash(addThousandSeparator(value)),
    },
  ];
};

const renderDepositId = (depositId) => {
  if (!depositId) return '-';
  const s = String(depositId);
  if (s.length > 8) {
    return (
      <Tooltip title={s} trigger='click'>
        <span style={{ cursor: 'pointer' }}>{`...${s.slice(0, 3)}`}</span>
      </Tooltip>
    );
  }
  return s;
};

export const mobileColumns = (t: (key: string) => string, data: any, pageTable?: string): ColumnsType<any> => {
  if (pageTable !== 'ADD_INFO') {
    return [
      {
        title: '',
        dataIndex: '',
        render: (value, record) => {
          return (
            <Box flexDirection='column'>
              <S.MobileTableItem>
                <span className='item__title'>{t('field.match_percentage')}</span>
                <span className='item__value'>
                  <S.SimilarityPercentage>
                    {record?.similarityPercentage ? (
                      record?.similarityPercentage === 100 ? (
                        <span className='true__percent'>{record?.similarityPercentage}%</span>
                      ) : (
                        <span className='percent'>{record?.similarityPercentage}%</span>
                      )
                    ) : (
                      '-'
                    )}
                  </S.SimilarityPercentage>
                </span>
              </S.MobileTableItem>
              <S.MobileTableItem>
                <span className='item__title'>{t('field.dest_iban_number')}</span>
                <span className='item__value'>{getValueOrDash(record?.counterPartyAccount)}</span>
              </S.MobileTableItem>
              {/*<S.MobileTableItem>*/}
              {/*  <span className='item__title'>{t('deposit_ID')}</span>*/}
              {/*  <span className='item__value'>{renderDepositId(record?.depositId)}</span>*/}
              {/*</S.MobileTableItem>*/}
              <S.MobileTableItem>
                <span className='item__title'>{t('transfer_amount')}</span>
                <span className='item__value'>{getValueOrDash(record?.amount)}</span>
              </S.MobileTableItem>
              <S.MobileTableItem>
                <span className='item__title'>{t('dest_account_owner')}</span>
                <span className='item__value'>{getValueOrDash(record?.counterPartyName)}</span>
              </S.MobileTableItem>
              <S.MobileTableItem>
                <span className='item__title'>{t('field.inquiry_account_holder')}</span>
                <span className='item__value'>{getValueOrDash(record?.ibanInquiryName)}</span>
              </S.MobileTableItem>
            </Box>
          );
        },
      },
    ];
  }

  return [
    {
      title: '',
      dataIndex: '',
      render: (value, record, index) => {
        const { counterPartyAccount, counterPartyName, nationalCode, amount, depositId, reason } = record;
        const parts = counterPartyName?.split(',').map((part) => part.trim());

        const [firstPart, secondPart, ...restParts] = parts;

        const limitedSecondPart = secondPart && secondPart.length > 12 ? secondPart.slice(0, 12) + '...' : secondPart;

        const tooltipContent =
          restParts.length > 0 ? restParts.map((part) => `<span>${part}</span>`).join('<br/>') : '';
        return (
          <Box flexDirection='column'>
            {/*<Table.MobileColumn title={`${t('iban_number')}:`} value={getValueOrDash(counterPartyAccount)} />*/}
            {/*<Table.MobileColumn*/}
            {/*  title={`${t('dest_account_owner')}:`}*/}
            {/*  value={*/}
            {/*    <InfoWrapper>*/}
            {/*      {restParts.length > 0 ? (*/}
            {/*        <Tooltip placement='top' title={<span dangerouslySetInnerHTML={{ __html: tooltipContent }} />}>*/}
            {/*          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>*/}
            {/*            {firstPart && `${firstPart}, `}*/}
            {/*            {limitedSecondPart}*/}
            {/*          </div>*/}
            {/*        </Tooltip>*/}
            {/*      ) : (*/}
            {/*        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>*/}
            {/*          {firstPart && `${firstPart}`}*/}
            {/*          {secondPart && `, ${secondPart}`}*/}
            {/*        </div>*/}
            {/*      )}*/}
            {/*    </InfoWrapper>*/}
            {/*  }*/}
            {/*/>*/}
            {/*<Table.MobileColumn title={`${t('national_code')}:`} value={getValueOrDash(nationalCode)} />*/}
            {/*<Table.MobileColumn title={`${t('amount')}:`} value={getValueOrDash(addThousandSeparator(amount))} />*/}
            {/*<Table.MobileColumn title={`${t('deposit_id')}:`} value={renderDepositId(depositId)} />*/}
            {/*<Table.MobileColumn title={`${t('deposit_description_title')}:`} value={getValueOrDash(reason)} />*/}
          </Box>
        );
      },
    },
  ];
};
