import React, { useEffect } from 'react';
import * as S from './../validation-step.style';
import { ActionButtonsContainer } from './../validation-step.style';

import { Progress, Tooltip } from 'antd';
import { useTr } from '@branch-services/translation';
import { Box, Button, ColumnsType, Table } from '@branch-services/ui-kit';
import { addThousandSeparator, getValueOrDash } from '@branch-services/utils';
import SuccessBox from './success-box/success-box';
import ErrorBox from './error-box/error-box';
import Badges from '../badges/badges';
import useWidgetStore from '../../../store/use-widget-store';
import useFileDetailsQuery from '../../../queries/use-get-file-details-query';
import { PageRoute } from '../../../utils/consts';
import { usePathname } from 'next/navigation';
import useClientSsn from '../../submit-request/clientSsn';

function ValidationResult({ children }: { children: React.ReactNode }) {
  const [t] = useTr();
  const {
    validateResponse,
    checkValidationResponse,
    pagination: paginationInquiry,
    setActiveStep,
  } = useWidgetStore((state) => state);
  const {
    refetch: refetchFileDetails,
    data: fileDetailsData,
    isLoading: fileDetailsIsFetching,
  } = useFileDetailsQuery();
  const pathname = usePathname();
  const clientSsn = useClientSsn();

  async function getListData() {
    !(checkValidationResponse?.finished && checkValidationResponse?.errorValidationCount === null) &&
      refetchFileDetails();
  }

  useEffect(() => {
    if (checkValidationResponse?.finished) {
      checkValidationResponse?.hasIbanInquiry && getListData();
    }
  }, [checkValidationResponse?.errorValidationCount, checkValidationResponse?.errorValidationCount]);

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

  const getAccountNumber = (value) => {
    let accNo = value?.toString();
    accNo = accNo?.length > 13 ? accNo?.slice(-13) : accNo;
    return accNo;
  };

  async function handleNextStep() {
    setActiveStep(3);
  }

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

  const handleOnChange = (pagination, filters, sorter, extra) => {
    getListData();
  };

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

  // const displayButtons = () => {
  //   return (
  //     <ActionButtonsContainer className='button-container'>
  //       {/*<Button className='previous-form__button' size='large'>*/}
  //       {/*  {t('button.previous')}*/}
  //       {/*</Button>*/}
  //       <Button
  //         className='continue-form__button'
  //         size='large'
  //         type='primary'
  //         htmlType='submit'
  //         onClick={handleNextStep}
  //       >
  //         {t('confirm_continue')}
  //       </Button>
  //     </ActionButtonsContainer>
  //   );
  // };

  const calculateValidationRecords = () => {
    const result = checkValidationResponse
      ? (checkValidationResponse?.successValidationCount === null
          ? 0
          : checkValidationResponse?.successValidationCount) +
        (checkValidationResponse?.errorValidationCount === null ? 0 : checkValidationResponse?.errorValidationCount)
      : 0;

    return (
      <span>
        {`${checkValidationResponse?.finished ? checkValidationResponse?.totalRecords : isNaN(result) ? 0 : result} / ${
          checkValidationResponse.totalRecords ?? 0
        }`}
      </span>
    );
  };

  if (
    checkValidationResponse?.finished &&
    (checkValidationResponse?.errorValidationCount === 0 || checkValidationResponse?.errorValidationCount === null)
  ) {
    return (
      <S.Container isRequiry={validateResponse?.validate || checkValidationResponse?.hasIbanInquiry}>
        <Badges />
        <SuccessBox>{children}</SuccessBox>
        {/* {displayButtons()} */}
      </S.Container>
    );
  } else if (checkValidationResponse?.finished && checkValidationResponse?.errorValidationCount > 0) {
    return (
      <>
        <S.Container isRequiry={false}>
          <ErrorBox />
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
              hasContainer={true}
              minHeight={fileDetailsData?.content}
            />
          </S.NewBox>
        </S.Container>
      </>
    );
  } else {
    return (
      <S.Container isRequiry={false}>
        <Box flexDirection='column'>
          <Badges />
          <S.Wrapper>
            <S.Title>
              <span>{t('validating_loading')} </span>
              <span>{calculateValidationRecords()}</span>
              <span>{t('record')}</span>
            </S.Title>
            {children}
          </S.Wrapper>
          <S.Description>{t('request_description')}</S.Description>
        </Box>
        {
          checkValidationResponse?.finished &&
            (checkValidationResponse?.errorValidationCount === 0 ||
              checkValidationResponse?.errorValidationCount === null)
          //    &&
          // displayButtons()
        }
      </S.Container>
    );
  }
}

export default ValidationResult;
