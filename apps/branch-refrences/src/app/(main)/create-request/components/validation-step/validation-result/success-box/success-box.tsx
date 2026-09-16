import * as S from './success-box.style';
import { ReactComponent as SuccessIcon } from './../../../../assets/media/alert-success.svg';

import { Progress, Tooltip } from 'antd';
import { addThousandSeparator, getValueOrDash } from '@branch-services/utils';
import { useTr } from '@branch-services/translation';
import { Box, Button, ColumnsType, Table } from '@branch-services/ui-kit';
import { useWidgetStore } from '../../../../store';
import useFileDetailsQuery from '../../../../queries/use-get-file-details-query';
import useClientSsn from '../../../submit-request/clientSsn';
import { PageRoute } from '../../../../utils/consts';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

function SuccessBox({ children }) {
  const [t] = useTr();
  const {
    pagination: paginationInquiry,
    checkValidationResponse,
    validateResponse,
    formValues,
    setPagination,
    showFileDetailsTableAction,
  } = useWidgetStore((state) => state);

  const {
    refetch: refetchFileDetails,
    data: fileDetailsData,
    isLoading: fileDetailsIsFetching,
  } = useFileDetailsQuery();
  const clientSsn = useClientSsn();
  const pathname = usePathname();

  async function getListData() {
    refetchFileDetails();
  }

  useEffect(() => {
    if (checkValidationResponse?.finished) {
      checkValidationResponse?.hasIbanInquiry && getListData();
    }
  }, [checkValidationResponse?.errorValidationCount, checkValidationResponse?.errorValidationCount]);

  const showDetailTable = () => {
    window.history.pushState(
      {
        id: checkValidationResponse?.requestId,
        ssn: clientSsn,
        uploadFile: true,
        queryStatus: true,
      },
      '',
      `${pathname}?step=${PageRoute.FILE_DETAILS}`
    );
  };

  function calculateRow(index: number, pagination) {
    return pagination.page * pagination.size + index + 1;
  }

  const columns: ColumnsType<any> = [
    {
      title: '#',
      dataIndex: '',
      key: 'index',
      width: 'min-content',
      align: 'center',
      render: (value, record, index) => <S.Index>{calculateRow(index, paginationInquiry)}</S.Index>,
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
    //   render: (value) => {
    //     if (!value) return '-';
    //
    //     const strValue = String(value);
    //     const shouldTruncate = strValue.length > 8;
    //     const displayValue = shouldTruncate ? `...${strValue.slice(0, 3)}` : strValue;
    //
    //     return shouldTruncate ? (
    //       <Tooltip title={strValue}>
    //         <span style={{ cursor: 'pointer' }}>{displayValue}</span>
    //       </Tooltip>
    //     ) : (
    //       displayValue
    //     );
    //   },
    // },
    {
      title: t('transfer_amount'),
      dataIndex: 'amount',
      key: 'id',
      align: 'center',
      render: (value) => getValueOrDash(addThousandSeparator(value)),
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

  const mobileColumns: ColumnsType<any> = [
    {
      title: '',
      dataIndex: '',
      render: (value, record) => {
        return (
          <Box flexDirection='column'>
            <S.MobileTableItem>
              <span className='item__title'>{t('field.match_percentage')}</span>
              <span className='item__value'>
                {
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
                }
              </span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>{t('field.dest_iban_number')}</span>
              <span className='item__value'>{getValueOrDash(record?.counterPartyAccount)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>{t('deposit_ID')}</span>
              <span className='item__value'>{renderDepositId(record?.depositId)}</span>
            </S.MobileTableItem>
            <S.MobileTableItem>
              <span className='item__title'>{t('transfer_amount')}</span>
              <span className='item__value'>{getValueOrDash(addThousandSeparator(record?.amount))}</span>
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

  function getCaptionChildren() {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <Button className='show_detail' type='link' onClick={showDetailTable}>
          <i className='ri-arrow-left-s-line'></i>
          {t('show_all')}
        </Button>
      </div>
    );
  }

  const handleOnChange = (pagination) => {
    const current = pagination.current;
    const size = pagination.pageSize;

    const paginationInfo = {
      ...paginationInquiry,
      current: current,
      page: current - 1,
      size: size,
    };

    setPagination(paginationInfo);
  };

  return (
    <>
      <S.SuccessWrapper>
        <span className='heading'>
          <div>
            <SuccessIcon />
            <span className='validation_success_result'>{t('validation_success_result')}</span>
          </div>
          {/*<Button className='show_detail' type='link' onClick={showDetailTable}>*/}
          {/*  {t('show_detail')}*/}
          {/*  <i className='ri-arrow-left-s-line'></i>*/}
          {/*</Button>*/}
        </span>
        <span className='validation_success_desc'>{t('validation_success_desc')}</span>
        {Array.isArray(children) && children[0]}
      </S.SuccessWrapper>

      {checkValidationResponse?.hasIbanInquiry ? (
        <S.NewBox marginTop={'2.4rem'}>
          <Table
            title={t('inquiry_result')}
            captionChildren={getCaptionChildren()}
            dataSource={fileDetailsData?.content.slice(0, 5)}
            columns={columns}
            mobileColumns={mobileColumns}
            onChange={handleOnChange}
            loading={fileDetailsIsFetching}
            total={paginationInquiry?.count}
            current={paginationInquiry?.page}
            pagination={false}
            minHeight={fileDetailsData?.content}
            hasContainer={true}
          />
        </S.NewBox>
      ) : (
        ''
      )}
    </>
  );
}

export default SuccessBox;
