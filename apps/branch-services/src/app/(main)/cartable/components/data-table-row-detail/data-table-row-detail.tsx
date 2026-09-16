import React, { useEffect, useState } from 'react';

import { useTr } from '@branch-services/translation';
import { InfoItemType } from '@branch-services/types';
import { Button, InfoBox, Loading, MessageBox } from '@branch-services/ui-kit';
import { formatAmount, getValueOrDash } from '@branch-services/utils';
import useCartableStore from '../../store/use-cartable-store';
import { CartableModalsEnum, RequestTypes } from '../../utils/consts';
import * as S from './data-table-row-detail.style';
import { DepositIntermediaryAccount, Done, HasIbanInquiry, Icon, LinkWrapper } from './data-table-row-detail.style';
import useCartableDetailQuery from '../../queries/use-cartable-detail-query';
import useDownloadRequestFileQuery from '../../queries/use-download-request-file';
import useDownloadReceiptQuery from '../../queries/use-download-receipt';
import { notification, Tooltip } from 'antd';
import { ReactComponent as TickCircle } from '../../assets/media/tick-circle.svg';
import { ReactComponent as InfoCircle } from '../../assets/media/info-circleb.svg';
import { ReactComponent as ErrorCircle } from '../../assets/media/close-circle.svg';
import useDownloadOfflineRequestFileQuery from '../../queries/use-download-offline-request-file';

export type openModal = { remove: boolean; reject: boolean; confirm: boolean; receipt: boolean; error: boolean };

type DataTableRowDetailProps = {
  data?: any;
  featureTypes: string;
  expanded: boolean;
  setOpenTransactionModal: (value: boolean) => void;
};

const DataTableRowDetail = (props: DataTableRowDetailProps) => {
  const [t] = useTr();
  const { data, setOpenTransactionModal, expanded } = props;
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { setModalType, setTransactionKeys, setRecord, record, downloadErrorMessage, resetDownloadErrorMessage } =
    useCartableStore();
  const {
    data: catableDetail,
    isLoading: cartableDetailLoading,
    error: cartableDetailError,
    refetch,
  } = useCartableDetailQuery(data.requestTracingCode);

  const { refetch: refetchDownloadOfflineRequestFile, isFetching: downloadOfflineIsFetching } =
    useDownloadOfflineRequestFileQuery(data?.requestTracingCode, data.inputFileName);

  const { isLoading: requestFileLoading, refetch: refetchDownloadRequestFile } = useDownloadRequestFileQuery(
    data.requestTracingCode,
    data.accountOwnerSsn
  );

  const { isLoading: receiptLoading, refetch: refetchDownloadReceipt } = useDownloadReceiptQuery(
    data.requestTracingCode
  );

  useEffect(() => {
    if (expanded) {
      resetDownloadErrorMessage();
    }
    if (expanded && data.requestType !== RequestTypes.OFFLINE_ACH) {
      refetch();
      resetDownloadErrorMessage();
    }
  }, [expanded, data.requestType]);

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

  useEffect(() => {
    if (catableDetail?.requestStatus && catableDetail?.requestStatus !== 'CONFIRMED') {
      setIsProcessing(true);
      return;
    }
    setIsProcessing(false);
  }, [catableDetail?.requestStatus]);

  useEffect(() => {
    setRecord(data);
  }, []);

  const showModalHandler = (type) => {
    setModalType(type);
    setRecord(data);
  };

  const handleShowTransactionModal = () => {
    setTransactionKeys({ ssn: data.accountOwnerSsn, id: data.requestTracingCode });
    setOpenTransactionModal(true);
  };
  const handleDownloadOfflineRequestFile = async () => {
    resetDownloadErrorMessage();
    refetchDownloadOfflineRequestFile();
  };
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
      value: getValueOrDash(detail?.requestTypeTitle),
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
      key: 'label.deposit_desc',
      value: getValueOrDash(detail?.title),
    });
    result.push({
      key: detail.withWithdraw ? 'source_account_number' : 'label.returend_account_number',
      value: getValueOrDash(detail?.accountNumber),
    });
    result.push({
      key: 'label.fee_amount',
      value: formatAmount(detail.wageAmount, t('common.rial')),
    });
    result.push({
      key: detail.withWithdraw ? 'label.source_account_name' : 'label.dest_account_name',
      value: getValueOrDash(detail?.accountOwnerName),
    });
    result.push({
      key: 'label.account_branch_code',
      value: getValueOrDash(detail?.accountBranchCode),
    });
    !detail.withWithdraw &&
      result.push({
        key: 'label.deposit_id',
        value: (
          <S.PaymentId>
            <Tooltip title={t('copy')}>
              <i onClick={() => copyText(data?.depositId)} className='ri-file-copy-line  payment_id' />
            </Tooltip>
            {getValueOrDash(data?.depositId)}
          </S.PaymentId>
        ),
      });
    result.push({
      key: 'label.transfer_registration_by',
      value: getValueOrDash(detail?.creatorFullName),
    });
    result.push({
      key: 'label.id_nationality',
      value: getValueOrDash(detail?.accountOwnerSsn),
    });
    result.push({
      key: 'confirm_transfer_by',
      value: getValueOrDash(detail?.validatorFullName),
    });

    !data.withWithdraw &&
      result.push({
        key: t('label.intermediary_account_number'),
        value: '0113440294004' + ' - ' + t('intermediary_account_centralization'),
      });

    result.push({
      key: 'label.total_records',
      value: getValueOrDash(detail?.totalCount),
    });

    !data.withWithdraw &&
      result.push({
        key: t('deposit_intermediary_account'),
        value: depositIntermediaryAccount(data.depositMade),
      });
    result.push({
      key: 'label.number_of_duplicate_rows',
      value: getValueOrDash(detail?.duplicateRecordCount),
    });

    result.push({
      key: 'label.purpose',
      value: getValueOrDash(detail?.statementTitle),
    });

    result.push({
      key: 'label.request_branch_code',
      value: `${getValueOrDash(detail?.branchCode)} - ${getValueOrDash(detail.branchName)}`,
    });

    result.push({
      key: 'label.transaction_details',
      value: (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type='link' size='small' style={{ margin: '0', padding: '0' }} onClick={handleShowTransactionModal}>
            {t('show')}
          </Button>
        </div>
      ),
    });

    result.push({
      key: 'label.description',
      value: getValueOrDash(detail?.description),
    });

    // result.push({
    //   key: 'label.request_file',
    //   value: (
    //     <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    //       <Button
    //         type='link'
    //         size='small'
    //         style={{ margin: '0', padding: '0' }}
    //         loading={requestFileLoading}
    //         onClick={() => {
    //           refetchDownloadRequestFile();
    //           resetDownloadErrorMessage();
    //         }}
    //       >
    //         <i className='ri-download-line ' />
    //
    //         {t('label.get_file')}
    //       </Button>
    //     </div>
    //   ),
    // });

    // result.push({

    //   key: 'label.receive_receipt',
    //   value: (
    //     <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
    //       <Button
    //         type='link'
    //         size='small'
    //         style={{ margin: '0', padding: '0' }}
    //         loading={receiptLoading}
    //         onClick={() => {
    //           refetchDownloadReceipt();
    //           resetDownloadErrorMessage();
    //         }}
    //       >
    //         <i className='ri-download-line' />
    //         {t('label.get_file')}
    //       </Button>
    //     </div>
    //   ),
    // });
    result.push({
      key: 'label.file_details',
      value: (
        <LinkWrapper
          href={`/cartable/file-details?id=${record?.requestTracingCode}&ssn=${record?.accountOwnerSsn}`}
          style={{ margin: '0', padding: '0' }}
        >
          {t('show')}
        </LinkWrapper>
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
    return result;
  };

  const showConfirmHandlerModal = () => {
    showModalHandler(CartableModalsEnum.CONFIRM_REQUEST);
  };

  const isTimePassed = catableDetail?.isTimePassed;

  const showMessageBox = (meesage) => {
    return (
      <MessageBox
        type={meesage?.type}
        message={meesage?.shouldTranslate ? t(meesage?.txt) : meesage?.txt}
        subErrors={meesage?.subErrors}
        closable
        shouldScroll
        style={{ margin: '2rem 2rem 0 2rem' }}
      />
    );
  };

  const resultMapper = {
    [RequestTypes.OFFLINE_ACH]: prepareOfflineResult,
    [RequestTypes.ONLINE]: prepareOnlineResult,
  };

  const result = resultMapper?.[data.requestType]?.(data);
  return (
    <>
      {downloadErrorMessage && showMessageBox(downloadErrorMessage)}

      {cartableDetailError && showMessageBox(cartableDetailError)}

      {cartableDetailLoading ? (
        <Loading size='small' />
      ) : (
        <>
          {data.requestType === RequestTypes.OFFLINE_ACH &&
            showMessageBox({
              type: 'warning',
              txt: 'ach_payment_before_approval_description',
              shouldTranslate: true,
            })}

          {data.requestType !== RequestTypes.OFFLINE_ACH && (
            <>
              {!data?.withWithdraw &&
                !data?.depositMade &&
                showMessageBox({
                  type: 'warning',
                  txt: 'request_confirmed_deposit_intermediary_account',
                  shouldTranslate: true,
                })}

              {isProcessing &&
                showMessageBox({
                  type: 'warning',
                  txt: 'request_confirmed_delay',
                  shouldTranslate: true,
                })}

              {isTimePassed &&
                showMessageBox({
                  type: 'warning',
                  txt: 'request_out_of_working_hours_approval_unavailable',
                  shouldTranslate: true,
                })}
            </>
          )}

          <InfoBox data={result} isDense />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', padding: '2rem' }}>
            <Button danger onClick={() => showModalHandler(CartableModalsEnum.REJECT_BATCH_REQUEST)}>
              {t('reject')}
            </Button>
            {RequestTypes.OFFLINE_ACH === data.requestType && (
              <Button type='primary' onClick={showConfirmHandlerModal}>
                {t('confirm')}
              </Button>
            )}

            {data.requestType !== RequestTypes.OFFLINE_ACH &&
              (data?.withWithdraw ? (
                <Button
                  disabled={catableDetail?.requestStatus !== 'CONFIRMED' || isTimePassed}
                  type='primary'
                  onClick={showConfirmHandlerModal}
                >
                  {t('confirm')}
                </Button>
              ) : (
                <Button
                  disabled={!data?.depositMade || catableDetail?.requestStatus !== 'CONFIRMED' || isTimePassed}
                  type='primary'
                  onClick={showConfirmHandlerModal}
                >
                  {t('confirm')}
                </Button>
              ))}
          </div>
        </>
      )}
    </>
  );
};
export default DataTableRowDetail;
