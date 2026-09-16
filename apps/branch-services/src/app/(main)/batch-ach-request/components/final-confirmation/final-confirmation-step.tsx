import { useTr } from '@branch-services/translation';
import { Box, Button } from '@branch-services/ui-kit';
import { getValueOrDash } from '@branch-services/utils';
import { Fragment, useEffect, useState } from 'react';
import { ActionButtonsContainer } from '../app/app.style';
import { usePathname } from 'next/navigation';
import { PageRoute, PaymentType, RequestStatus } from '../../utils/consts';
import { useWidgetStore } from '../../store';
import { InfoItemType, withdrawalTypesEnum } from '../../utils/types';
import { useBatchPaymentMutation } from '../../queries';
import { BatchAchRequestParams } from '../../queries/use-batch-payment-mutation';
import { formatValueWithThousandSeparator, getpaymentTypeLabel } from '../../utils/utils';
import ConfirmationModal from '../confirmation-modal/confirmation-modal';
import { DataType, TransactionModal } from '@branch-services/components';
import * as S from './final-confirmation-step.style';
import usePaymentIdQuery from '../../queries/use-get-payemnt-id-query';
import { notification, Tooltip } from 'antd';

const FinalConfirmationStep = () => {
  const [t] = useTr();
  const pathname = usePathname();
  const {
    statusRequest,
    formValues,
    uploadFileForm,
    uploadResponse,
    activeWithdrawalType,
    resetFormValues,
    setActiveStep,
    resetMessage,
    setRequestStatus,
    resetUploadFileForm,
  } = useWidgetStore((state) => state);

  const [openModal, setOpenModal] = useState<boolean>();
  const { mutate: mutateBatchRequest, isPending } = useBatchPaymentMutation();
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [chequeMethodMood, setChequeMethodMood] = useState(false);
  const { data, isLoading } = usePaymentIdQuery(
    formValues.accountNumber,
    uploadResponse?.totalAmount,
    chequeMethodMood
  );

  useEffect(() => {
    setChequeMethodMood(activeWithdrawalType === withdrawalTypesEnum.CHEQUE_METHOD);
  }, [activeWithdrawalType]);

  function copyText(text) {
    navigator.clipboard.writeText(text);
    return notification.open({
      // message: t('payam'),
      description: (
        <>
          {t('copy_done')}
          <i className='ri-check-line' />
        </>
      ),
      placement: 'topRight',
      style: { color: 'green' },
      message: undefined,
    });
  }

  function prepareResult() {
    const result: InfoItemType[] = [];

    result.push({
      type: 'header',
      title: t('field.batch_deposit_info'),
      line: false,
    });
    result.push({
      type: 'item',
      title: t('field.ssn'),
      value: getValueOrDash(formValues?.ssn) + ' - ' + getValueOrDash(formValues?.accountOwnerName),
    });
    !chequeMethodMood &&
      result.push({
        type: 'item',
        title: t('field.source_account_number'),
        value: getValueOrDash(formValues?.accountNumber),
      });
    chequeMethodMood &&
      result.push({
        type: 'item',
        title: t('field.returend_account_number'),
        value: getValueOrDash(formValues?.accountNumber),
      });
    chequeMethodMood &&
      result.push({
        type: 'item',
        title: t('field.intermediary_account_number'),
        value: '0113440294004' + ' - ' + t('intermediary_account_centralization'),
      });
    chequeMethodMood &&
      result.push({
        type: 'item',
        title: t('field.deposit_id'),
        value: isLoading ? (
          '-'
        ) : (
          <div>
            <Tooltip title={t('copy')}>
              <i
                onClick={() => copyText(data?.paymentId)}
                className='ri-file-copy-line  payment_id'
                style={{ cursor: 'pointer' }}
              />
            </Tooltip>
            {getValueOrDash(data?.paymentId)}
          </div>
        ),
      });
    result.push({
      type: 'item',
      title: t('field.withdrawal_id'),
      value: getValueOrDash(formValues?.withdrawalId),
    });
    result.push({
      type: 'item',
      title: t('field.account_branch_code'),
      value: getValueOrDash(formValues?.branchCode),
    });
    result.push({
      type: 'item',
      title: t('field.deposit_description'),
      value: getValueOrDash(formValues?.depositDescription),
    });
    result.push({
      type: 'item',
      title: t('field.purpose'),
      value: getValueOrDash(uploadFileForm?.statement?.label),
    });
    result.push({
      type: 'item',
      title: t('field.description'),
      value: getValueOrDash(formValues?.description),
    });

    result.push({
      type: 'header',
      title: t('field.transaction_total'),
      line: true,
    });
    result.push({
      type: 'item',
      title: t('field.payment_type'),
      value: getValueOrDash(getpaymentTypeLabel(uploadFileForm?.paymentType as PaymentType, t)),
    });
    result.push({
      type: 'item',
      title: t('field.total_record'),
      value: getValueOrDash(uploadResponse?.totalRecords),
    });
    result.push({
      type: 'item',
      title: t('field.duplicate_records_number'),
      value: getValueOrDash(uploadResponse?.duplicateRecordCount),
    });
    result.push({
      type: 'item',
      title: t('field.wage_amount'),
      value: formatValueWithThousandSeparator(uploadResponse?.wageAmount, t),
    });
    result.push({
      type: 'item',
      title: t('field.total_balance'),
      value: formatValueWithThousandSeparator(uploadResponse?.totalAmount, t),
    });
    result.push({
      type: 'item',
      title: t('field.average_deposit'),
      value: formatValueWithThousandSeparator(
        Math.trunc((uploadResponse?.totalAmount as number) / (uploadResponse?.totalRecords as number)),
        t
      ),
    });
    result.push({
      type: 'item',
      title: t('field.transaction_detail'),
      value: (
        <div className='transaction_details_link' onClick={() => setOpenTransactionModal(true)}>
          <span className='upload_view_detail'>{t('view_transaction_detail')}</span>
          <i className='ri-arrow-left-s-line' />
        </div>
      ),
    });

    return result;
  }

  const result = prepareResult();

  const handleConfirmRequest = () => {
    const params: BatchAchRequestParams = {
      id: uploadResponse?.id as string,
      ssn: formValues?.ssn as string,
      title: formValues?.depositDescription as string,
      accountNumber: formValues?.accountNumber as string,
      withdrawalId: formValues?.withdrawalId as string,
      description: formValues?.description as string,
      paymentType: uploadFileForm?.paymentType as PaymentType,
      statementCode: uploadFileForm?.statement?.value as string,
      accountBranchCode: `${formValues?.branchCode}` as string,
      totalAmount: uploadResponse?.totalAmount as number,
      totalRecords: uploadResponse?.totalRecords as number,
      duplicateRecordCount: uploadResponse?.duplicateRecordCount as number,
      wageAmount: uploadResponse?.wageAmount as number,
      wageDiscount: uploadResponse?.wageDiscount as number,
      wageOriginalAmount: uploadResponse?.wageOriginalAmount as number,
      withWithdraw: !chequeMethodMood,
    };

    if (chequeMethodMood) {
      params['paymentId'] = data?.paymentId;
    }
    mutateBatchRequest(params);
    setOpenModal(false);
    resetMessage();
  };

  const handleOnClickNewRequest = () => {
    window.history.pushState({}, '', `${pathname}?step=${PageRoute.SUBMIT}`);
    setRequestStatus(RequestStatus.DEFAULT);
    setActiveStep(0);
    resetFormValues();
    resetUploadFileForm();
  };

  const handlePrevious = () => {
    window.history.pushState({}, '', `${pathname}?step=${PageRoute.UPLOAD_FILE}`);
    setActiveStep(1);
    resetMessage();
    setRequestStatus(RequestStatus.DEFAULT);
  };

  const displayButtons = () => {
    if (statusRequest === RequestStatus.SUCCESS) {
      return (
        <ActionButtonsContainer>
          <Box className='button_container'>
            <Button
              className={'new_request-form-button'}
              type={'default'}
              size={'large'}
              onClick={handleOnClickNewRequest}
            >
              {t('new_request')}
            </Button>
          </Box>
        </ActionButtonsContainer>
      );
    } else {
      return (
        <ActionButtonsContainer>
          <Button size='large' type='default' onClick={handlePrevious}>
            {t('button.previous')}
          </Button>
          <Button size='large' type='primary' loading={isPending} onClick={() => setOpenModal(true)}>
            {statusRequest === RequestStatus.TRY_AGAIN ? t('button.retry') : t('button.confirm_continue')}
          </Button>
        </ActionButtonsContainer>
      );
    }
  };

  return (
    <S.FinalFormWrapper name='submit_charge_request'>
      <S.FinalConfirmationStyle>
        <Box flexDirection={'column'} className='final-confirmation__container'>
          {result?.map((item: InfoItemType, index: number) => {
            const infoHeader =
              item.type === 'header' ? (
                <div className='info-header'>
                  {item.title}
                  {item.line ? (
                    <div className='line'>
                      <span />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : null;

            const infoItem = item.type.startsWith('item') ? (
              <>
                <span className='info-item__title'>{item.title}:</span>
                <span className='info-item__value'>{item.value}</span>
              </>
            ) : null;

            return (
              <Fragment key={item.title + '-' + index}>
                {infoHeader}
                {infoItem}
              </Fragment>
            );
          })}
        </Box>
        <Box className='footer_container'>{displayButtons()}</Box>

        <ConfirmationModal
          open={openModal}
          setOpen={setOpenModal}
          title={t('warning')}
          handleOk={handleConfirmRequest}
        />
      </S.FinalConfirmationStyle>
      {openTransactionModal && (
        <TransactionModal
          dataType={DataType.FULL_DATA}
          fullData={uploadResponse}
          footer={() => {
            return (
              <S.ButtonWrapper>
                <Button type='primary' onClick={() => setOpenTransactionModal(false)}>
                  {t('close')}
                </Button>
              </S.ButtonWrapper>
            );
          }}
          open={openTransactionModal}
          title={t('upload_info_box_title')}
        />
      )}
    </S.FinalFormWrapper>
  );
};

export default FinalConfirmationStep;
