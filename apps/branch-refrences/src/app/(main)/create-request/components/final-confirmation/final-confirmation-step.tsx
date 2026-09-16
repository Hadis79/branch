import { useTr } from '@branch-services/translation';
import { Box, Button, MessageBox } from '@branch-services/ui-kit';
import { getValueOrDash, storage } from '@branch-services/utils';
import { Fragment, useEffect, useState } from 'react';
import { ActionButtonsContainer } from '../app/app.style';
import { usePathname } from 'next/navigation';
import { PageRoute, PaymentType, RequestStatus } from '../../utils/consts';
import { useWidgetStore } from '../../store';
import { InfoItemType, withdrawalTypesEnum } from '../../utils/types';
import { useBatchPaymentMutation } from '../../queries';
import { formatValueWithThousandSeparator, getpaymentTypeLabel } from '../../utils/utils';
import ConfirmationModal from '../confirmation-modal/confirmation-modal';
import { DataType, TransactionModal } from '@branch-services/components';
import * as S from './final-confirmation-step.style';
import usePaymentIdQuery from '../../queries/use-get-payemnt-id-query';
import { LocalStorageKey } from '@branch-services/types';
import useClientSsn from '../submit-request/clientSsn';
import { useResponsive } from '@branch-services/hooks';
import { ReactComponent as TickCircle } from '../../assets/media/alert-success.svg';
import { ReactComponent as InfoCircle } from '../../assets/media/info-circle.svg';

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
    checkValidationResponse,
    resetValidate,
    setActiveStep,
    resetMessage,
    setRequestStatus,
    resetUploadFileForm,
    setCreateRequestResponse,
    CreateRequestResponse,
    setOpenFinalConfirmationStep,
    message,
  } = useWidgetStore((state) => state);
  const clientSsn = useClientSsn();
  const [openModal, setOpenModal] = useState<boolean>();
  const { mutate: mutateBatchRequest, isPending, dataFinal } = useBatchPaymentMutation();
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [chequeMethodMood, setChequeMethodMood] = useState(false);
  const { isMobileOrTablet } = useResponsive();

  const organizationString: any = storage.getItem(LocalStorageKey.USER);
  const organization = JSON?.parse(organizationString);
  const nameStorage = organization?.name;
  useEffect(() => {
    setChequeMethodMood(activeWithdrawalType === withdrawalTypesEnum.CHEQUE_METHOD);
  }, [activeWithdrawalType]);

  useEffect(() => {
    setCreateRequestResponse(dataFinal?.data?.traceCode);
  }, [dataFinal?.data?.traceCode]);

  const organizationStringClient: any = storage.getItem(LocalStorageKey.USER_PROFILE);
  const organizationClient = JSON.parse(organizationStringClient);
  const organizations = organizationClient?.organizations;
  const matchedOrganization = organizations?.find((org: any) => org.orgSsn === clientSsn);

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
      value: `${getValueOrDash(clientSsn)} - ${getValueOrDash(
        matchedOrganization?.orgName ? matchedOrganization?.orgName : nameStorage
      )}`,
    });
    !chequeMethodMood &&
      result.push({
        type: 'item',
        title: t('field.source_account_number'),
        value: getValueOrDash(checkValidationResponse?.fileUploadDto?.sourceAccountNumber),
      });
    chequeMethodMood &&
      result.push({
        type: 'item',
        title: t('field.returend_account_number'),
        value: getValueOrDash(checkValidationResponse?.fileUploadDto?.sourceAccountNumber),
      });
    result.push({
      type: 'item',
      title: t('field.withdrawal_id'),
      value: ` ${checkValidationResponse?.branchCode} - ${checkValidationResponse?.branchName} `,
    });
    result.push({
      type: 'item',
      title: t('field.account_branch_code'),
      value: getValueOrDash(checkValidationResponse?.accountBranchCode),
    });
    result.push({
      type: 'item',
      title: t('field.deposit_description'),
      value: getValueOrDash(checkValidationResponse?.title),
    });
    result.push({
      type: 'item',
      title: t('field.purpose'),
      value: getValueOrDash(uploadFileForm?.statement?.label),
    });
    result.push({
      type: 'item',
      title: t('field.description'),
      value: getValueOrDash(checkValidationResponse?.description),
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
        <S.Done>
          {checkValidationResponse?.hasIbanInquiry ? (
            checkValidationResponse?.averageIbanInquiries === 100 ? (
              <div className='done'>
                <TickCircle />
                {checkValidationResponse?.averageIbanInquiries}%
              </div>
            ) : (
              <div className='info'>
                <InfoCircle />
                {Math.floor(checkValidationResponse?.averageIbanInquiries)}%
              </div>
            )
          ) : (
            <div className='not-done'>
              <InfoCircle />
              {t('does_not_have')}
            </div>
          )}
        </S.Done>
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
      value: getValueOrDash(getpaymentTypeLabel(checkValidationResponse?.fileUploadDto?.paymentType as PaymentType, t)),
    });
    result.push({
      type: 'item',
      title: t('field.total_record'),
      value: getValueOrDash(checkValidationResponse?.fileUploadDto?.totalRecords),
    });
    result.push({
      type: 'item',
      title: t('field.duplicate_records_number'),
      value: getValueOrDash(checkValidationResponse?.fileUploadDto?.duplicateRecordCount),
    });
    result.push({
      type: 'item',
      title: t('field.wage_amount'),
      value: formatValueWithThousandSeparator(checkValidationResponse?.fileUploadDto?.wageAmount, t),
    });
    result.push({
      type: 'item',
      title: t('field.total_balance'),
      value: formatValueWithThousandSeparator(checkValidationResponse?.fileUploadDto?.totalAmount, t),
    });
    result.push({
      type: 'item',
      title: t('field.average_deposit'),
      value: formatValueWithThousandSeparator(
        Math.trunc(
          (checkValidationResponse?.fileUploadDto?.totalAmount as number) /
            (checkValidationResponse?.fileUploadDto?.totalRecords as number)
        ),
        t
      ),
    });
    result.push({
      type: 'item',
      title: t('field.transaction_detail'),
      value: (
        <div className='transaction_details_link' onClick={() => setOpenTransactionModal(true)}>
          <span className='upload_view_detail'>{isMobileOrTablet ? t('view') : t('view_transaction_detail')}</span>
          <i className='ri-arrow-left-s-line' />
        </div>
      ),
    });

    return result;
  }

  const result = prepareResult();

  const handleConfirmRequest = () => {
    mutateBatchRequest();
    setOpenModal(false);
    resetMessage();
  };

  const handleOnClickNewRequest = () => {
    window.history.pushState({}, '', `${pathname}?step=${PageRoute.SUBMIT}`);
    setRequestStatus(RequestStatus.DEFAULT);
    setActiveStep(0);
    resetFormValues();
    resetUploadFileForm();
    resetValidate();
  };

  const handlePrevious = () => {
    window.history.pushState({}, '', `${pathname}?step=${PageRoute.VALIDATE}`);
    setActiveStep(2);
    resetMessage();
    setRequestStatus(RequestStatus.DEFAULT);

    if (isMobileOrTablet) {
      setOpenFinalConfirmationStep(false);
      resetMessage();
      setRequestStatus(RequestStatus.DEFAULT);
    } else {
      window.history.pushState({}, '', `${pathname}?step=${PageRoute.VALIDATE}`);
      setActiveStep(2);
      resetMessage();
      setRequestStatus(RequestStatus.DEFAULT);
    }
  };

  const displayButtons = () => {
    if (statusRequest === RequestStatus.SUCCESS) {
      return (
        <ActionButtonsContainer>
          <Box className='button_container'>
            <Button
              className={'new_request-form-button'}
              type={isMobileOrTablet ? 'primaryOutlined' : 'default'}
              size={'large'}
              onClick={handleOnClickNewRequest}
            >
              {t('new_request')}
              <i className='ri-add-large-line'></i>
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
        {message && isMobileOrTablet && (
          <MessageBox
            message={message?.shouldTranslate ? t(message?.txt) : message?.txt}
            type={message.type}
            subErrors={message?.subErrors}
            closable
            shouldScroll
            style={{ marginBottom: '2rem', marginTop: '1rem' }}
            linkProps={
              message?.linkProps && {
                title: message.linkProps.title,
                url: message.linkProps.url,
              }
            }
            onClose={resetMessage}
          />
        )}
        {isMobileOrTablet && statusRequest === RequestStatus.SUCCESS && (
          <S.TraceCode>
            <div className='code'>
              {t('trace_code')}: <span className='trace'>{CreateRequestResponse}</span>
            </div>
            <div>{t('trace_code_final')}</div>
          </S.TraceCode>
        )}
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
          fullData={checkValidationResponse?.fileUploadDto}
          footer={() => {
            return (
              <S.ButtonWrapper>
                <Button type='primaryOutlined' onClick={() => setOpenTransactionModal(false)}>
                  {t('close')}
                </Button>
              </S.ButtonWrapper>
            );
          }}
          open={openTransactionModal}
          fnc={setOpenTransactionModal}
          title={t('upload_info_box_title')}
        />
      )}
    </S.FinalFormWrapper>
  );
};

export default FinalConfirmationStep;
