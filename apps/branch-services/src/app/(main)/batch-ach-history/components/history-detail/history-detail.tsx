import { useTr } from '@branch-services/translation';
import { InfoItemType } from '@branch-services/types';
import { Button, InfoBox, MessageBox } from '@branch-services/ui-kit';
import { formatAmount, getValueOrDash } from '@branch-services/utils';
import useDownloadExportFileQuery from '../../queries/use-download-export-file';
import { RowDataTableType } from '../../utils/types';
import useBatchAchHistoryStore from '../../store/use-widget-store';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { RequestTypes, Statuses } from '../../utils/consts';
import useDownloadReceiptQuery from '../../queries/use-download-receipt';
import useDownloadRequestFileQuery from '../../queries/use-download-request-file';
import { notification, Tooltip } from 'antd';
import * as S from '../history/history.style';
import { ReactComponent as TickCircle } from '../../assets/media/tick-circle.svg';
import { ReactComponent as InfoCircle } from '../../assets/media/info-circleb.svg';
import { DepositIntermediaryAccount, Done, ErrorText, HasIbanInquiry, Icon } from '../history/history.style';
import { ReactComponent as ErrorCircle } from '../../assets/media/close-circle.svg';
import { ReactComponent as Danger } from '../../assets/media/danger.svg';
import useDownloadOfflineRequestFileQuery from '../../queries/use-download-offline-request-file';

type DataTableRowDetailProps = {
  data: RowDataTableType;
};

const HistoryDetail = (props: DataTableRowDetailProps) => {
  const [t] = useTr();
  const { data } = props;

  const {
    setTransactionKeys,
    setOpenTransactionModal,
    downloadErrorMessage,
    resetDownloadErrorMessage,
    setFormValues,
    formValues,
  } = useBatchAchHistoryStore();

  useEffect(() => {
    setFormValues({ ssn: data.accountOwnerSsn, id: data.requestTracingCode });
  }, [data.requestTracingCode]);
  const { isLoading: requestFileLoading, refetch: refetchDownloadRequestFile } = useDownloadRequestFileQuery(
    data.requestTracingCode,
    data.accountOwnerSsn
  );
  const { refetch: refetchDownloadOfflineRequestFile, isFetching: downloadOfflineIsFetching } =
    useDownloadOfflineRequestFileQuery(data.requestTracingCode, data.inputFileName);

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

  const { isLoading: exportFileLoading, refetch: refetchDownloadExportFile } = useDownloadExportFileQuery(
    data.requestTracingCode
  );

  const { isLoading: receiptLoading, refetch: refetchDownloadReceipt } = useDownloadReceiptQuery(
    data.requestTracingCode
  );

  function depositIntermediaryAccount(deposited: boolean) {
    if (deposited) {
      return (
        <DepositIntermediaryAccount>
          <span className={'deposit'}> {t('deposited')}</span>
          <Icon>
            <TickCircle />
          </Icon>
        </DepositIntermediaryAccount>
      );
    } else {
      return (
        <DepositIntermediaryAccount>
          <span className={'not_deposited'}>{t('not_deposited')}</span>
          <Icon>
            <ErrorCircle />
          </Icon>
        </DepositIntermediaryAccount>
      );
    }
  }

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

  const handleShowTransactionModal = () => {
    setTransactionKeys({ ssn: data?.accountOwnerSsn, id: data?.requestTracingCode });
    setOpenTransactionModal(true);
  };

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
      value: detail?.withWithdraw ? t('transfer_by_account_title') : t('transfer_by_cheque_title'),
    });

    result.push({
      key: 'label.number_of_deposit_lines',
      value: getValueOrDash(detail?.totalCount),
    });

    result.push({
      key: 'label.deposit_desc',
      value: getValueOrDash(detail?.title),
    });

    result.push({
      key: 'label.number_of_duplicate_rows',
      value: detail?.duplicateRecordCount ? getValueOrDash(detail?.duplicateRecordCount) : 0,
    });

    result.push({
      key: 'label.purpose',
      value: getValueOrDash(detail?.statementTitle),
    });
    result.push({
      key: 'label.description',
      value: getValueOrDash(detail?.description),
    });
    detail?.errorMessage &&
      result.push({
        key: 'error_text',
        value: (
          <ErrorText>
            <span className='error_text'>{getValueOrDash(detail?.errorMessage)}</span>
            <Icon>
              <Danger />
            </Icon>
          </ErrorText>
        ),
      });
    return result;
  };

  const prepareOnlineResult = (data: RowDataTableType) => {
    const detail = data;
    if (!detail) return null;
    const result: InfoItemType[] = [];

    result.push({
      key: 'label.deposit_desc',
      value: getValueOrDash(detail?.title),
    });
    result.push({
      key: 'label.transaction_type',
      value: getValueOrDash(detail?.paymentTypeTitle),
    });
    result.push({
      key: 'label.total_fee',
      value: formatAmount(detail?.wageAmount, t('common.rial')),
    });
    result.push({
      key: detail.withWithdraw ? 'source_account_number' : 'label.returend_account_number',
      value: getValueOrDash(detail?.accountNumber),
    });
    result.push({
      key: 'selected_branch_for_deposit',
      value: `${getValueOrDash(detail?.branchCode)} - ${getValueOrDash(detail.branchName)}`,
    });
    result.push({
      key: detail.withWithdraw ? 'label.source_account_name' : 'label.dest_account_name',
      value: getValueOrDash(detail?.accountOwnerName),
    });
    result.push({
      key: 'account_branch_code',
      value: getValueOrDash(detail?.accountBranchCode),
    });
    result.push({
      key: 'label.transfer_registration_by',
      value: getValueOrDash(detail?.creatorFullName),
    });
    result.push({
      key: 'deposit_type',
      value: detail?.withWithdraw ? t('transfer_by_account_title') : t('transfer_by_cheque_title'),
    });
    result.push({
      key: 'approve_request_by',
      value: getValueOrDash(detail?.validatorFullName),
    });

    result.push({
      key: 'confirm_transfer_by',
      value: getValueOrDash(detail?.approverName),
    });

    result.push({
      key: 'label.id_nationality',
      value: getValueOrDash(detail?.accountOwnerSsn),
    });
    result.push({
      key: 'label.deposit_id',
      value: !detail.withWithdraw ? (
        <S.PaymentId>
          <Tooltip title={t('copy')}>
            <i onClick={() => copyText(data?.depositId)} className='ri-file-copy-line  payment_id' />
          </Tooltip>
          {getValueOrDash(data?.depositId)}
        </S.PaymentId>
      ) : (
        '-'
      ),
    });

    result.push({
      key: 'total_record',
      value: getValueOrDash(detail?.totalCount),
    });
    !data.withWithdraw &&
      result.push({
        key: t('label.intermediary_account_number'),
        value: '0113440294004' + ' - ' + t('intermediary_account_centralization'),
      });
    result.push({
      key: 'label.duplicate_records_number',
      value: getValueOrDash(detail?.duplicateRecordCount),
    });

    !data.withWithdraw &&
      result.push({
        key: t('deposit_to_intermediary_account'),
        value: depositIntermediaryAccount(detail?.depositMade),
      });

    result.push({
      key: 'label.description',
      value: getValueOrDash(detail?.description),
    });

    result.push({
      key: 'label.transaction_details',
      value: (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button size='small' style={{ margin: '0', padding: '0' }} type='link' onClick={handleShowTransactionModal}>
            {t('show')}
          </Button>
        </div>
      ),
    });
    result.push({
      key: 'label.purpose',
      value: getValueOrDash(detail?.statementTitle),
    });

    result.push({
      key: 'label.file_details',
      value: (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link href={`/batch-ach-history/file-details?id=${formValues.id}&ssn=${formValues.ssn}`}>
            <Button size='small' style={{ margin: '0', padding: '0' }} type='link'>
              {t('show')}
            </Button>
          </Link>
        </div>
      ),
    });

    result.push({
      key: t('average_iban_inquiry'),
      value: (
        <Done>
          {detail?.hasIbanInquiry ? (
            detail?.averageIbanInquiries === 100 ? (
              <div className='done'>
                {detail?.averageIbanInquiries}%
                <TickCircle />
              </div>
            ) : (
              <div className='info'>
                {Math.floor(detail?.averageIbanInquiries)}%
                <InfoCircle />
              </div>
            )
          ) : (
            <div className='not-done'>
              {t('does_not_have')}
              <InfoCircle />
            </div>
          )}
        </Done>
      ),
    });

    detail?.errorMessage &&
      result.push({
        key: 'error_text',
        value: (
          <ErrorText>
            <span className='error_text'>{getValueOrDash(detail?.errorMessage)}</span>
            <Icon>
              <Danger />
            </Icon>
          </ErrorText>
        ),
      });
    return result;
  };

  const footer = () => {
    return (
      <>
        {data.requestType === RequestTypes.OFFLINE_ACH && (
          <Button
            size='small'
            type='link'
            onClick={() => {
              refetchDownloadOfflineRequestFile();
              resetDownloadErrorMessage();
            }}
            loading={downloadOfflineIsFetching}
          >
            {t('request_file')}
            <i className='ri-download-line ' />
          </Button>
        )}
        {data.requestType !== RequestTypes.OFFLINE_ACH && (
          <Button
            size='small'
            type='link'
            onClick={() => {
              refetchDownloadRequestFile();
              resetDownloadErrorMessage();
            }}
            loading={requestFileLoading}
          >
            {t('request_file')}
            <i className='ri-download-line ' />
          </Button>
        )}
        {data.requestStatus !== Statuses.DENIED &&
          data.requestType !== RequestTypes.OFFLINE_ACH &&
          data.requestStatus !== 'INACTIVE' && (
            <Button
              size='small'
              type='link'
              onClick={() => {
                refetchDownloadExportFile();
                resetDownloadErrorMessage();
              }}
              loading={exportFileLoading}
            >
              {t('output_file')}
              <i className='ri-download-line ' />
            </Button>
          )}
        {data.requestType !== RequestTypes.OFFLINE_ACH && data.requestStatus !== 'INACTIVE' && (
          <Button
            size='small'
            type='link'
            onClick={() => {
              refetchDownloadReceipt();
              resetDownloadErrorMessage();
            }}
            loading={receiptLoading}
          >
            {t('receive_receipt')}
            <i className='ri-file-list-3-line'></i>
          </Button>
        )}
      </>
    );
  };

  const resultMapper = {
    [RequestTypes.OFFLINE_ACH]: prepareOfflineResult,
    [RequestTypes.ONLINE]: prepareOnlineResult,
  };

  const result = resultMapper?.[data?.requestType]?.(data);

  const renderWarningMessageBox = () => {
    return (
      <MessageBox
        message={data?.errorMessage}
        type={'warning'}
        closable={true}
        style={{ margin: '1rem 3.2rem' }}
        shouldScroll
      />
    );
  };

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
      {data.requestStatus === Statuses.INACTIVE && renderWarningMessageBox()}
      <InfoBox footer={footer()} data={result} isDense />
    </>
  );
};
export default HistoryDetail;
