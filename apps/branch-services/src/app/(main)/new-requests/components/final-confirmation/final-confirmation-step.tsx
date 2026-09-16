import { useTr } from '@branch-services/translation';
import { notification, Tooltip } from 'antd';
import { InfoItemType } from '../../../batch-ach-request/utils/types';
import { getValueOrDash } from '@branch-services/utils';
import React, { Fragment, useState } from 'react';
import useApproveRequestMutation from '../../queries/use-approve-request-mutation';
import useNewRequestsWidgetStore from '../../store/use-widget-store';
import { getpaymentTypeLabel } from '../../../batch-ach-request/utils/utils';
import { formatValueWithThousandSeparator } from '../../utils/utils';
import { ActionButtonsContainer } from '../validation-step/validation-step.style';
import { Box, Button, Loading, MessageBox } from '@branch-services/ui-kit';
import { ButtonWrapper, Done, FinalConfirmationStyle, FinalFormWrapper } from './final-confirmation-step.style';
import ConfirmationModal from '../confirmation-modal/confirmation-modal';
import { RequestStatus, RequestTypes, StepRoute } from '../../utils/enums';
import { DataType, TransactionModal } from '@branch-services/components';

import { ReactComponent as TickCircle } from '../../assets/media/tick-circle.svg';
import { ReactComponent as InfoCircle } from '../../assets/media/info-circle.svg';
import useTransactionModalDetailsQuery from '../../queries/use-transaction-details';
import usePaymentLimitInquiryQuery from '../../queries/use-get-payment-limit-inquiry';
import useApproveOfflineAchRequestMutation from '../../queries/use-approve-oflline-ach-request-mutation';

const FinalConfirmationStep = () => {
  const [t] = useTr();
  const [openModal, setOpenModal] = useState<boolean>();

  const {
    historyData,
    resetMessage,
    setStep,
    statusRequest,
    resetRequestStatus,
    resetAll,
    setTransactionKeys,
    openTransactionDetails,
    setOpenTransactionDetails,
  } = useNewRequestsWidgetStore();
  const { isPending, data: approvalData, mutate } = useApproveRequestMutation();
  const {
    isPending: ApproveOfflineIsPending,
    data: ApproveOfflineData,
    mutate: mutateApproveOfflineRequest,
  } = useApproveOfflineAchRequestMutation();
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const {
    refetch: refetchTransactionDetails,
    isFetching: transactionDetailsIsFetching,
    data: transactionDetailsData,
  } = useTransactionModalDetailsQuery();

  const { refetch } = usePaymentLimitInquiryQuery();

  const handleShowTransactionModal = async () => {
    await setTransactionKeys({ ssn: historyData?.userSSN, id: historyData?.requestId });
    refetchTransactionDetails();
  };

  function copyText(text) {
    const showNotification = (success) => {
      notification.open({
        description: (
          <>
            {success ? t('copy_done') : t('copy_failed')}
            <i className={success ? 'ri-check-line' : 'ri-close-line'} />
          </>
        ),
        placement: 'topRight',
        style: { color: success ? 'green' : 'red' },
        message: null,
      });
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => showNotification(true))
        .catch(() => showNotification(false));
    } else {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification(success);
      } catch {
        showNotification(false);
      }
    }
  }

  const requestTitleMap: Record<RequestTypes, string> = {
    [RequestTypes.ONLINE]: 'field.batch_deposit_info',
    [RequestTypes.OFFLINE_ACH]: 'offline_ach_bulk_deposit_information',
    [RequestTypes.OFFLINE_SALARY]: 'offline_salary_bulk_deposit',
  };

  function prepareOnlineResult() {
    const result: InfoItemType[] = [];

    result.push({
      type: 'header',
      title: t(requestTitleMap[historyData.requestType]),
      line: false,
    });
    result.push({
      type: 'item',
      title: t('trace_code'),
      value: getValueOrDash(historyData?.traceCode),
    });
    result.push({
      type: 'item',
      title: t('field.ssn'),
      value: getValueOrDash(historyData?.clientSSN),
    });
    result.push({
      type: 'item',
      title: t('requester'),
      value: getValueOrDash(historyData?.creatorFullName),
    });
    result.push({
      type: 'item',
      title: t('source_account_number'),
      value: `${getValueOrDash(historyData?.accountNumber)} - ${getValueOrDash(historyData?.accountOwnerName)}`,
    });
    result.push({
      type: 'item',
      title: t('field.account_branch_code'),
      value: getValueOrDash(historyData?.branchCode),
    });
    result.push({
      type: 'item',
      title: t('field.deposit_description'),
      value: getValueOrDash(historyData?.title),
    });
    result.push({
      type: 'item',
      title: t('field.purpose'),
      value: getValueOrDash(historyData?.purposeTitle),
    });

    result.push({
      type: 'item',
      title: t('field.description'),
      value: getValueOrDash(historyData?.description),
    });
    // result.push({
    //   type: 'item',
    //   title: t('label.transfer_registration_by'),
    //   value: getValueOrDash(historyData?.description),
    // });
    result.push({
      type: 'item',
      title: t('deposit_type'),
      value: historyData?.withWithdraw ? t('transfer_by_account_title') : t('transfer_by_cheque_title'),
    });
    result.push({
      type: 'header',
      title: t('inquiry_result'),
      line: true,
    });
    result.push({
      type: 'item',
      title: t('average_iban_inquiry'),
      value: (
        <Done>
          {historyData?.hasIbanInquiry ? (
            historyData?.averageIbanInquiries === 100 ? (
              <div className='done'>
                <TickCircle />
                {historyData?.averageIbanInquiries}%
              </div>
            ) : (
              <div className='info'>
                <InfoCircle />
                {Math.floor(historyData?.averageIbanInquiries)}%
              </div>
            )
          ) : (
            <div className='not-done'>
              <InfoCircle />
              {t('does_not_have')}
            </div>
          )}
        </Done>
      ),
    });

    result.push({
      type: 'header',
      title: t('field.transaction_total'),
      line: true,
    });
    result.push({
      type: 'item',
      title: t('field.payment_type'),
      value: getValueOrDash(getpaymentTypeLabel(historyData?.paymentType, t)),
    });
    result.push({
      type: 'item',
      title: t('field.total_record'),
      value: getValueOrDash(historyData?.totalRecords),
    });
    result.push({
      type: 'item',
      title: t('field.duplicate_records_number'),
      value: getValueOrDash(historyData?.totalDuplicateRecords),
    });
    result.push({
      type: 'item',
      title: t('field.total_balance'),
      value: formatValueWithThousandSeparator(historyData?.totalAmount, t),
    });
    result.push({
      type: 'item',
      title: t('field.wage_amount'),
      value: formatValueWithThousandSeparator(historyData?.totalWageAmount, t),
    });
    result.push({
      type: 'item',
      title: t('field.average_deposit'),
      value: formatValueWithThousandSeparator(
        Math.trunc((historyData?.totalAmount as number) / (historyData?.totalRecords as number)),
        t
      ),
    });
    result.push({
      type: 'item',
      title: t('field.transaction_detail'),
      value: (
        <ButtonWrapper>
          <Button
            style={{ padding: 0 }}
            icon={<i className='ri-arrow-left-s-line' />}
            loading={transactionDetailsIsFetching}
            onClick={handleShowTransactionModal}
            type='link'
            size='middle'
          >
            {t('view_transaction_detail')}
          </Button>
        </ButtonWrapper>
        // <div className='transaction_details_link' onClick={handleShowTransactionModal}>
        //   <span className='upload_view_detail'>{t('view_transaction_detail')}</span>
        //   <i className='ri-arrow-left-s-line'/>
        // </div>
      ),
    });

    return result;
  }
  function prepareOfflineResult() {
    const result: InfoItemType[] = [];

    result.push({
      type: 'header',
      title: t(requestTitleMap[historyData.requestType]),
      line: false,
    });
    result.push({
      type: 'item',
      title: t('trace_code'),
      value: getValueOrDash(historyData?.traceCode),
    });
    result.push({
      type: 'item',
      title: t('field.ssn'),
      value: getValueOrDash(historyData?.clientSSN),
    });
    result.push({
      type: 'item',
      title: t('requester'),
      value: getValueOrDash(historyData?.creatorFullName),
    });
    result.push({
      type: 'item',
      title: t('deposit_type'),
      value: historyData?.withWithdraw ? t('transfer_by_account_title') : t('transfer_by_cheque_title'),
    });
    result.push({
      type: 'item',
      title: t('source_account_number'),
      value: `${getValueOrDash(historyData?.accountNumber)} - ${getValueOrDash(historyData?.accountOwnerName)}`,
    });
    result.push({
      type: 'item',
      title: t('selected_branch_for_deposit'),
      value: `${getValueOrDash(historyData?.branchCode)} - ${getValueOrDash(historyData?.branchName)}`,
    });
    result.push({
      type: 'item',
      title: t('field.deposit_description'),
      value: getValueOrDash(historyData?.title),
    });

    result.push({
      type: 'item',
      title: t('field.purpose'),
      value: getValueOrDash(historyData?.purposeTitle),
    });

    result.push({
      type: 'item',
      title: t('field.description'),
      value: getValueOrDash(historyData?.description),
    });

    result.push({
      type: 'header',
      title: t('field.transaction_total'),
      line: true,
    });
    result.push({
      type: 'item',
      title: t('field.total_balance'),
      value: formatValueWithThousandSeparator(historyData?.totalAmount, t),
    });
    result.push({
      type: 'item',
      title: t('payment_type'),
      value: getValueOrDash(getpaymentTypeLabel(historyData?.paymentType, t)),
    });
    result.push({
      type: 'item',
      title: t('field.total_record'),
      value: getValueOrDash(historyData?.totalRecords),
    });
    result.push({
      type: 'item',
      title: t('field.duplicate_records_number'),
      value: getValueOrDash(historyData?.totalDuplicateRecords),
    });

    result.push({
      type: 'header',
      title: t('user_information'),
      line: true,
    });
    result.push({
      type: 'item',
      title: t('shahab_code'),
      value: getValueOrDash(historyData?.shahabCode),
    });

    return result;
  }

  const result = historyData.requestType === RequestTypes.OFFLINE_ACH ? prepareOfflineResult() : prepareOnlineResult();

  const handleOfflineRequest = async () => {
    const params = {
      id: historyData?.requestId,
    };
    return await mutateApproveOfflineRequest(params);
  };

  const handleOnlineRequest = async () => {
    const params: any = {
      id: historyData?.requestId as string,
      title: historyData?.title as string,
      ssn: historyData?.clientSSN as string,
      totalAmount: historyData?.totalAmount as number,
      totalRecords: historyData?.totalRecords as number,
      accountNumber: historyData?.accountNumber as string,
      description: historyData?.description || ('' as string),
      paymentType: historyData?.paymentType,
      wageAmount: historyData.fileUploadDto?.wageAmount as number,
      wageOriginalAmount: historyData.fileUploadDto?.wageOriginalAmount as number,
      duplicateRecordCount: historyData?.fileUploadDto?.duplicateRecordCount as number,
      accountBranchCode: historyData?.branchCode as string,
      branchCode: historyData?.branchCode as string,
      withdrawalId: historyData?.withdrawalId as string,
      wageDiscount: historyData?.fileUploadDto?.wageDiscount as number,
      statementCode: historyData?.purpose as string,
      withWithdraw: historyData?.withWithdraw,
    };
    return await mutate(params);
  };

  const handleConfirmRequest = async () => {
    if (!historyData) return;

    if (historyData.requestType === RequestTypes.OFFLINE_ACH) {
      await handleOfflineRequest();
    } else {
      await handleOnlineRequest();
    }

    setOpenModal(false);
    resetMessage();
  };

  const handleOnClickNewRequest = () => {
    resetAll();
  };

  const handlePrevious = () => {
    resetRequestStatus();
    resetAll();
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const modalFooter = () => {
    return (
      <>
        <Button
          style={{ display: 'flex', justifySelf: 'self-end', minWidth: '14rem' }}
          size='large'
          type='primary'
          onClick={() => setOpenTransactionDetails(false)}
        >
          {t('close')}
        </Button>
      </>
    );
  };
  const displayButtons = () => {
    if (statusRequest === RequestStatus.SUCCESS) {
      return (
        <ActionButtonsContainer>
          <Box className='button_container'>
            <Button
              className={'new_request-form-button'}
              type={'primaryOutlined'}
              size={'large'}
              onClick={handleOnClickNewRequest}
            >
              {t('back_to_new_request')}
            </Button>
          </Box>
        </ActionButtonsContainer>
      );
    } else {
      return (
        <ActionButtonsContainer>
          <Button size='large' type='default' className={'cancel-form__button'} onClick={handlePrevious}>
            {t('button.cancel')}
          </Button>
          <Button
            size='large'
            type='primary'
            className={'continue-form__button'}
            loading={isPending}
            onClick={handleOpenModal}
          >
            {statusRequest === RequestStatus.TRY_AGAIN ? t('button.retry') : t('final_confirm')}
          </Button>
        </ActionButtonsContainer>
      );
    }
  };
  return (
    <FinalFormWrapper>
      {historyData.requestType === RequestTypes.OFFLINE_ACH && statusRequest !== RequestStatus.SUCCESS && (
        <MessageBox
          message={t('ach_payment_before_approval_description')}
          type={'warning'}
          closable={false}
          shouldScroll
          style={{ marginBottom: '3rem' }}
        />
      )}

      {approvalData && !historyData?.withWithdraw ? (
        <div className={'deposit-id__box'}>
          <span className={'title__box'}>{t('field.deposit_id')}:</span>
          <div className={'value__box'}>
            <Tooltip title={t('copy')}>
              <i
                onClick={() => copyText(approvalData?.depositId)}
                className='ri-file-copy-line payment_id'
                style={{ cursor: 'pointer' }}
              />
            </Tooltip>
            {getValueOrDash(approvalData?.depositId)}
          </div>

          <span className={'title__box'}>{t('field.intermediary_account_number')}:</span>
          <span className={'value__box'}>{'0113440294004 - ' + t('intermediary_account_centralization')}</span>
        </div>
      ) : null}
      <FinalConfirmationStyle>
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
      </FinalConfirmationStyle>
      {transactionDetailsData && (
        <TransactionModal
          title={t('uploaded_file_info')}
          dataType={DataType.FULL_DATA}
          fullData={transactionDetailsData?.headerInfo}
          open={openTransactionDetails as boolean}
          footer={modalFooter()}
        />
      )}
      {/*{openTransactionModal && (*/}
      {/*  <TransactionModal*/}
      {/*    dataType={DataType.FULL_DATA}*/}
      {/*    fullData={historyData?.fileUploadDto}*/}
      {/*    footer={() => {*/}
      {/*      return (*/}
      {/*        <ButtonWrapper>*/}
      {/*          <Button type='primary' onClick={() => setOpenTransactionModal(false)}>*/}
      {/*            {t('close')}*/}
      {/*          </Button>*/}
      {/*        </ButtonWrapper>*/}
      {/*      );*/}
      {/*    }}*/}
      {/*    open={openTransactionModal}*/}
      {/*    title={t('upload_info_box_title')}*/}
      {/*  />*/}
      {/*)}*/}
    </FinalFormWrapper>
  );
};

export default FinalConfirmationStep;
