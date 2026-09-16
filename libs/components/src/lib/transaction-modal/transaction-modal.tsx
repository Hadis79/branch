import React, { useEffect, useState } from 'react';
import { Divider } from 'antd';
import { useTr } from '@branch-services/translation';
import * as S from './transaction-modal.style';
import { addThousandSeparator, getValueOrDash } from '@branch-services/utils';
import { DataType, groupedDataValue, ModalProps, PaymentType, TransactionKeys, UploadResponse } from './types';
import useTransactionModalDetailsQuery from './use-transaction-details';
import { BottomSheet, Button, MessageBox } from '@branch-services/ui-kit';
import { useResponsive } from '@branch-services/hooks';

export const TransactionModal = (props: ModalProps) => {
  const { title, dataType, open, footer, fnc } = props;
  const { isMobileOrTablet } = useResponsive();
  const [close, setClose] = useState(open);
  const [t] = useTr();

  const [transactionKeys, setTransactionKeys] = useState<TransactionKeys>({});
  const [fullData, setFullData] = useState<UploadResponse>();

  const { data, setEnable, isLoading, error, isError } = useTransactionModalDetailsQuery(
    transactionKeys.ssn,
    transactionKeys.id
  );

  useEffect(() => {
    if (dataType === DataType.TRANSACTION_KEYS) {
      const { ssn, id } = props;
      setTransactionKeys({ ssn, id });
      setEnable(true);
    } else if (dataType === DataType.FULL_DATA) {
      const { fullData } = props;
      setFullData(fullData);
    }
  }, [dataType, setEnable, props]);

  const finalData = dataType === DataType.FULL_DATA ? fullData : data;

  const convertName = (paymentType: string) => {
    return PaymentType[paymentType as keyof typeof PaymentType] || paymentType;
  };

  type GroupedData = Record<PaymentType, groupedDataValue[]>;

  const groupedData: GroupedData =
    finalData?.children?.reduce((acc, item) => {
      if (!acc[item.paymentType]) {
        acc[item.paymentType] = [];
      }
      acc[item.paymentType].push(item);
      return acc;
    }, {} as GroupedData) || {};

  const renderContent = () => {
    if (isError) {
      return (
        <MessageBox
          type={error?.type}
          message={error?.shouldTranslate ? t(error?.txt) : error?.txt}
          subErrors={error?.subErrors}
          shouldScroll
          style={{ margin: '2rem 0' }}
        />
      );
    }

    return (
      <>
        {finalData?.children?.length > 0 &&
          Object?.entries(groupedData ?? {}).map(([paymentType, items]) => (
            <S.ModalBody key={paymentType}>
              <div className='modal-subtitle'>
                <Divider
                  orientation='left'
                  variant='dashed'
                  orientationMargin={0}
                  dashed
                  style={{ borderColor: 'silver' }}
                >
                  {convertName(paymentType)}
                </Divider>
              </div>
              {items?.map((item) => (
                <S.InfoBoxWrapper key={item.paymentType}>
                  <div>{t('transaction_modal.deposit_amount')} :</div>
                  <div className='value'>{`${getValueOrDash(addThousandSeparator(item?.totalAmount))} ${t(
                    'common.rial'
                  )}`}</div>

                  <span>{t('transaction_modal.average_deposit')} :</span>
                  <div className='value'>
                    {`${getValueOrDash(
                      addThousandSeparator(
                        item?.totalAmount && (finalData?.totalCount ?? finalData?.totalRecords)
                          ? parseFloat(
                              (item?.totalAmount / (finalData?.totalCount ?? finalData?.totalRecords))?.toFixed(2)
                            )
                          : 0
                      )
                    )} ${t('common.rial')}`}
                  </div>

                  <span>{t('transaction_modal.wage')} :</span>
                  <div className='value'>{`${getValueOrDash(addThousandSeparator(item?.wageAmount))} ${t(
                    'common.rial'
                  )}`}</div>

                  <span>{t('transaction_modal.row_count')} :</span>
                  <div className='value'>{getValueOrDash(item?.totalCount ?? item?.totalRecords)}</div>

                  <span>{t('transaction_modal.sum_total')} :</span>
                  <div className='value'>{`${getValueOrDash(
                    addThousandSeparator(item?.totalAmount + item?.wageAmount)
                  )} ${t('common.rial')}`}</div>
                </S.InfoBoxWrapper>
              ))}
            </S.ModalBody>
          ))}
        <Divider orientation='left' variant='dashed' orientationMargin={0} dashed style={{ borderColor: `silver` }}>
          <S.title>{t('transaction_modal.total')}</S.title>
          {finalData && finalData?.children?.length === 0 && ` ( ${convertName(finalData?.paymentType)} )`}
        </Divider>

        <S.InfoBoxWrapper key={finalData}>
          <div>{t('transaction_modal.deposit_amount')} :</div>
          <div className='value'>
            {finalData?.totalAmount ? `${addThousandSeparator(finalData?.totalAmount)} ${t('common.rial')}` : '-'}
          </div>

          <span>{t('transaction_modal.average_deposit')} :</span>
          <div className='value'>
            {finalData?.totalAmount
              ? `${addThousandSeparator(
                  Math.trunc(finalData?.totalAmount / (finalData?.totalCount ?? finalData?.totalRecords))
                )} ${t('common.rial')}`
              : '-'}
          </div>

          {/* <span>{t('transaction_modal.wage')} :</span>
          <div className='value'>{`${getValueOrDash(addThousandSeparator(finalData?.wageAmount))} ${t(
            'common.rial'
          )}`}</div> */}

          <span>{t('transaction_modal.row_count')} :</span>
          <div className='value'>{getValueOrDash(finalData?.totalCount ?? finalData?.totalRecords)}</div>

          <span>{t('transaction_modal.sum_total')} :</span>
          <div className='value'>
            {/* {finalData?.totalAmount + finalData?.wageAmount
              ? `${getValueOrDash(addThousandSeparator(finalData?.totalAmount + finalData?.wageAmount))} ${t(
                  'common.rial'
                )}`
              : '-'} */}
            {finalData?.totalAmount
              ? `${getValueOrDash(addThousandSeparator(finalData?.totalAmount))} ${t('common.rial')}`
              : '-'}
          </div>

          <span>{t('transaction_modal.number_of_duplicate_rows')} :</span>
          <div className='value'>{getValueOrDash(finalData?.duplicateRecordCount)} </div>
        </S.InfoBoxWrapper>
      </>
    );
  };

  if (isMobileOrTablet) {
    return (
      <BottomSheet open={open} onClose={() => fnc(false)}>
        <S.MobileTransactionWrapper>
          <div className='transaction-content'>
            <div className='transaction-header'>
              <h2>{title}</h2>
            </div>
            <div className='transaction-body'>{renderContent()}</div>
            {footer && (
              <div className='transaction-footer'>
                <S.ButtonWrapper>
                  <Button type='primary' onClick={() => fnc(false)}>
                    {t('close')}
                  </Button>
                </S.ButtonWrapper>
              </div>
            )}
          </div>
        </S.MobileTransactionWrapper>
      </BottomSheet>
    );
  }

  return (
    <S.ModalWrapper
      loading={isLoading}
      closeIcon={false}
      cancelText={true}
      title={title}
      open={open}
      footer={footer}
      width={800}
      centered={true}
      destroyOnClose
    >
      {renderContent()}
    </S.ModalWrapper>
  );
};
