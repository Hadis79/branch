import { useTr } from '@branch-services/translation';
import { InfoItemType } from '@branch-services/types';
import { Button, InfoBox, MessageBox } from '@branch-services/ui-kit';
import { formatAmount, getValueOrDash } from '@branch-services/utils';
import useBatchAchHistoryStore from '../../store/use-widget-store';
import useValidateRequestMutation from '../../queries/use-validate-request-mutation';
import { Done, HasIbanInquiry, Icon } from '../history/history.style';

import { ReactComponent as TickCircle } from '../../assets/media/tick-circle.svg';
import { ReactComponent as InfoCircle } from '../../assets/media/info-circleb.svg';
import React, { useEffect } from 'react';
import useCheckValidationQuery from '../../queries/use-check-validation-query';

import { PageKind, RequestTypes, Statuses, StepRoute } from '../../utils/enums';
import Link from 'next/link';
import useTransactionModalDetailsQuery from '../../queries/use-transaction-details';
import useDownloadOfflineRequestFileQuery from '../../queries/use-download-offline-request-file';

const HistoryDetail = ({ data, expanded }) => {
  const [t] = useTr();
  const {
    setTransactionKeys,
    resetMessage,
    setHistoryData,
    resetPagination,
    historyData,
    downloadErrorMessage,
    resetDownloadErrorMessage,
    setPageKind,
    setStep,
  } = useBatchAchHistoryStore();

  useEffect(() => {
    if (expanded) {
      resetDownloadErrorMessage();
    }
  }, [expanded]);

  const { refetch: refetchDownloadOfflineRequestFile, isFetching: downloadOfflineIsFetching } =
    useDownloadOfflineRequestFileQuery(data?.requestId, data?.inputFileName);

  const { mutate: mutateValidateRequest, data: validateRequestData, isPending } = useValidateRequestMutation();
  const { isFetching, refetch: refetchCheckValidation } = useCheckValidationQuery();

  const { refetch: refetchTransactionDetails, isFetching: transactionDetailsIsFetching } =
    useTransactionModalDetailsQuery();

  const handleShowTransactionModal = async () => {
    await setTransactionKeys({ ssn: data?.userSSN, id: data?.requestId });
    refetchTransactionDetails();
  };

  const handleDownloadOfflineRequestFile = async () => {
    resetDownloadErrorMessage();
    refetchDownloadOfflineRequestFile();
  };

  const handleShowQueryStatus = async () => {
    setHistoryData(data);
    await setTransactionKeys({ ssn: data?.userSSN, id: data?.requestId });
    setPageKind(PageKind.STEPPER);
    setStep(StepRoute.VALIDATION_STEP);
  };

  useEffect(() => {
    setHistoryData(data);
  }, [data]);

  function showHasIbanInquiry(hasIbanInquiry: boolean) {
    if (hasIbanInquiry) {
      return (
        <HasIbanInquiry>
          <span className={'has'}> {t('has')}</span>
          <Icon>
            <TickCircle />
          </Icon>
        </HasIbanInquiry>
      );
    } else {
      return (
        <HasIbanInquiry>
          <span className={'does_not_have'}>{t('does_not_have')}</span>
          <Icon>
            <InfoCircle />
          </Icon>
        </HasIbanInquiry>
      );
    }
  }

  const prepareOfflineResult = (data) => {
    const detail = data;
    if (!detail) return null;
    const result: InfoItemType[] = [];

    result.push({
      key: 'application_registration_by',
      value: getValueOrDash(detail?.creatorFullName),
    });

    result.push({
      key: 'label.returend_account_number',
      value: getValueOrDash(detail?.accountNumber),
    });
    result.push({
      key: 'payment_type',
      value: getValueOrDash(detail?.paymentTypeTitle),
    });

    result.push({
      key: 'dest_account_name',
      value: getValueOrDash(detail?.accountOwnerName),
    });

    result.push({
      key: 'selected_branch_for_deposit',
      value: getValueOrDash(`${detail?.branchName} - ${detail?.branchCode}`),
    });

    result.push({
      key: 'shahab_code',
      value: getValueOrDash(detail?.shahabCode),
    });

    result.push({
      key: 'deposit_type',
      value: getValueOrDash(detail?.withWithdraw ? t('transfer_by_account_title') : t('transfer_by_cheque_title')),
    });

    result.push({
      key: 'label.number_of_deposit_lines',
      value: getValueOrDash(detail?.totalRecords),
    });

    result.push({
      key: 'label.deposit_desc',
      value: getValueOrDash(detail?.title),
    });

    result.push({
      key: 'label.number_of_duplicate_rows',
      value: detail?.totalDuplicateRecords ? getValueOrDash(detail?.totalDuplicateRecords) : 0,
    });

    result.push({
      key: t('request_file'),
      value: (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type='link'
            size='small'
            icon={<i className='ri-download-line ' />}
            style={{ margin: '0', padding: '0' }}
            onClick={handleDownloadOfflineRequestFile}
            loading={downloadOfflineIsFetching}
          >
            {t('get_file')}
          </Button>
        </div>
      ),
    });

    result.push({
      key: 'label.description',
      value: getValueOrDash(detail?.description),
    });

    return result;
  };
  const prepareOnlineResult = (data) => {
    const detail = data;
    if (!detail) return null;
    const result: InfoItemType[] = [];

    result.push({
      key: 'application_registration_by',
      value: getValueOrDash(detail?.creatorFullName),
    });

    result.push({
      key: 'account_owner',
      value: getValueOrDash(detail?.accountOwnerName),
    });
    result.push({
      key: 'label.deposit_desc',
      value: getValueOrDash(detail?.title),
    });

    result.push({
      key: 'deposit_type',
      value: detail?.withWithdraw ? t('transfer_by_account_title') : t('transfer_by_cheque_title'),
    });
    result.push({
      key: 'label.purpose',
      value: getValueOrDash(detail?.purposeTitle),
    });

    result.push({
      key: 'label.number_of_deposit_lines',
      value: getValueOrDash(detail?.totalRecords),
    });

    result.push({
      key: 'label.transaction_type',
      value: getValueOrDash(detail?.paymentTypeTitle),
    });

    result.push({
      key: 'label.number_of_duplicate_rows',
      value: detail?.totalDuplicateRecords ? getValueOrDash(detail?.totalDuplicateRecords) : 0,
    });
    result.push({
      key: 'field.account_branch_code',
      value: getValueOrDash(detail?.accountBranchCode),
    });

    result.push({
      key: 'label.description',
      value: getValueOrDash(detail?.description),
    });

    result.push({
      key: 'selected_branch_for_deposit',
      value: getValueOrDash(`${detail?.branchName} - ${detail?.branchCode}`),
    });
    result.push({
      key: 'label.fee_amount',
      value: formatAmount(detail?.totalWageAmount, t('common.rial')),
    });
    result.push({
      key: 'trace_code',
      value: getValueOrDash(detail?.traceCode),
    });

    result.push({
      key: 'inquiry_check_box_label',
      value: showHasIbanInquiry(detail?.hasIbanInquiry),
    });

    result.push({
      key: t('field.transaction_detail'),
      value: (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type='link'
            size='small'
            style={{ margin: '0', padding: '0' }}
            onClick={handleShowTransactionModal}
            loading={transactionDetailsIsFetching}
          >
            {t('show')}
          </Button>
        </div>
      ),
    });

    result.push({
      key: 'label.file_details',
      value: (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link href={`/new-requests/file-details?id=${detail?.requestId}`}>
            <Button size='small' style={{ margin: '0', padding: '0' }} type='link'>
              {t('show')}
            </Button>
          </Link>
        </div>
      ),
    });

    if (detail?.hasIbanInquiry && detail?.averageIbanInquiries) {
      result.push({
        key: t('field.match_percentage'),
        value: (
          <Done>
            {detail?.averageIbanInquiries === 100 ? (
              <div className='done'>
                {detail?.averageIbanInquiries}%
                <TickCircle />
              </div>
            ) : (
              <div className='info'>
                {Math.floor(detail?.averageIbanInquiries)}%
                <InfoCircle />
              </div>
            )}
          </Done>
        ),
      });
    }

    if (data.status === Statuses.VALIDATION_FAILURE) {
      result.push({
        key: 'query_status',
        value: (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='small' style={{ margin: '0', padding: '0' }} type='link' onClick={handleShowQueryStatus}>
              {t('show')}
            </Button>
          </div>
        ),
      });
    }
    return result;
  };

  const confirmRequest = async () => {
    setHistoryData(data);
    await setTransactionKeys({ ssn: data?.userSSN, id: data?.requestId });
    resetMessage();
    setPageKind(PageKind.STEPPER);
    setStep(StepRoute.FINAL_CONFIRMATION);
    // mutateValidateRequest(data?.requestId);
  };

  const continueTheProcessRequest = async () => {
    // setHistoryData(data);
    // await setTransactionKeys({ ssn: data?.userSSN, id: data?.requestId });
    // resetMessage();
    // refetchCheckValidation();
  };

  const footer = () => {
    return (
      <>
        {/*{data.status === Statuses.INITIATED && (*/}
        <>
          <Button type='primary' onClick={confirmRequest} loading={isPending}>
            {t('confirm')}
          </Button>
        </>
        {/*)}*/}
        {/*{(data.status === Statuses.ACTIVE || data.status === Statuses.VALIDATION_SUCCESS) && (*/}
        {/*  <Button type='primary' onClick={continueTheProcessRequest} loading={isFetching}>*/}
        {/*    {t('continue_process')}*/}
        {/*  </Button>*/}
        {/*)}*/}
      </>
    );
  };
  const resultMapper = {
    [RequestTypes.OFFLINE_ACH]: prepareOfflineResult,
    [RequestTypes.ONLINE]: prepareOnlineResult,
  };

  const result = resultMapper?.[data.requestType]?.(data);

  return (
    <>
      {downloadErrorMessage && (
        <MessageBox
          type={downloadErrorMessage?.type}
          message={downloadErrorMessage?.shouldTranslate ? t(downloadErrorMessage?.txt) : downloadErrorMessage?.txt}
          subErrors={downloadErrorMessage?.subErrors}
          closable
          shouldScroll
          style={{ margin: '1rem 3.2rem' }}
        />
      )}
      <InfoBox footer={footer()} data={result} isDense />
    </>
  );
};
export default HistoryDetail;
