import { useTr } from '@branch-services/translation';
import { InfoItemType } from '@branch-services/types';
import { BottomSheet, Button, InfoBox, MessageBox } from '@branch-services/ui-kit';
import { formatAmount, getValueOrDash } from '@branch-services/utils';
import useDownloadExportFileQuery, { ExportFileParams } from '../../queries/use-download-export-file';
import { RowDataTableType } from '../../utils/types';
import useListRequestStore from '../../store/use-widget-store';
import { useEffect } from 'react';
import Link from 'next/link';
import { PageRoute, Statuses } from '../../utils/consts';
import useDownloadReceiptQuery from '../../queries/use-download-receipt';
import useDownloadRequestFileQuery from '../../queries/use-download-request-file';
import { notification, Tooltip } from 'antd';
import * as S from '../history/history.style';
import { HasIbanInquiry, Icon } from './history-details.style';
import { ReactComponent as InfoCircleIcon } from '../../assets/media/info-circle.svg';
import { ReactComponent as TickCircleIcon } from '../../assets/media/tick-circle.svg';
import { usePathname } from 'next/navigation';
import useDownloadReceiptQueryStatus from '../../queries/use-download-query-status';

type DataTableRowDetailProps = {
  data: RowDataTableType;
};

const HistoryDetailBottomSheet = (props: DataTableRowDetailProps) => {
  const [t] = useTr();
  const { data } = props;
  const pathname = usePathname();

  const {
    setTransactionKeys,
    setRequestId,
    setRequestType,
    setStatus,
    setOpenTransactionModal,
    downloadErrorMessage,
    resetDownloadErrorMessage,
    setFormValues,
    formValues,
    openHistoryBottomSheet,
    setopenHistoryBottomSheet,
  } = useListRequestStore();

  useEffect(() => {
    setFormValues({ ssn: data.accountOwnerSsn, id: data.requestTracingCode });
  }, [data.requestTracingCode]);
  const { isLoading: requestFileLoading, refetch: refetchDownloadRequestFile } = useDownloadRequestFileQuery(
    data.requestId,
    data.clientSSN,
    data.inputFileName
  );

  const hidenStatuses = [
    Statuses.INITIATED,
    Statuses.ACTIVE,
    Statuses.INACTIVE,
    Statuses.VALIDATION_SUCCESS,
    Statuses.VALIDATION_FAILURE,
    Statuses.NONE,
  ];

  const paramsExpotFile: ExportFileParams = {
    ssn: data?.clientSSN,
    id: data?.requestId,
  };

  const { isLoading: exportFileLoading, refetch: refetchDownloadExportFile } =
    useDownloadExportFileQuery(paramsExpotFile);

  const { isLoading: receiptLoading, refetch: refetchDownloadReceipt } = useDownloadReceiptQuery(
    data?.requestId,
    data?.requestType
  );

  const { isLoading: receiptQueryStatusLoading, refetch: refetchDownloadReceiptQueryStatus } =
    useDownloadReceiptQueryStatus(data?.requestId);

  const goToUploadDetailPage = () => {
    window.history.pushState(
      {
        id: data?.requestId,
        ssn: data?.clientSSN,
        uploadFile: true,
        queryStatus: true,
      },
      '',
      `${pathname}?step=${PageRoute.QUERY_STATUS}`
    );
  };

  const handleShowTransactionModal = () => {
    setTransactionKeys({ ssn: data?.clientSSN, id: data?.requestId, requestType: data?.requestType });
    setRequestId(data?.requestId);
    setRequestType(data?.requestType);
    setStatus(data?.status);
    setOpenTransactionModal(true);
  };
  function showHasIbanInquiry(hasIbanInquiry: boolean, averageIbanInquiries: number) {
    if (hasIbanInquiry) {
      return (
        <HasIbanInquiry>
          <span className={'has'}>
            {' '}
            {t('has')} {averageIbanInquiries ? '%' : ''} {averageIbanInquiries}
          </span>
          <Icon>
            <TickCircleIcon />
          </Icon>
        </HasIbanInquiry>
      );
    } else {
      return (
        <HasIbanInquiry>
          <span className={'does_not_have'}>{t('does_not_have')}</span>
          <Icon>
            <InfoCircleIcon />
          </Icon>
        </HasIbanInquiry>
      );
    }
  }

  const result = (data: RowDataTableType) => {
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

    // detail?.requestType !== 'ONLINE' &&
    result.push({
      key: 'label.deposit_type',
      value: detail.withWithdraw ? t('label.account_withdrawal') : t('label.external_withdrawal'),
    });

    detail?.requestType === 'ONLINE' &&
      result.push({
        key: 'label.fee_amount',
        value: formatAmount(Number(detail?.totalWageAmount), t('common.rial')),
      });

    result.push({
      key: 'label.account_number_return',
      value: getValueOrDash(detail?.accountOwnerName),
    });

    result.push({
      key: 'label.request_branch_code',
      value: `${getValueOrDash(detail?.branchName)} - ${getValueOrDash(detail?.branchCode)}`,
    });

    result.push({
      key: 'label.transaction_type',
      value: getValueOrDash(t(detail?.paymentType)),
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
      key: 'label.transfer_registration_by',
      value: getValueOrDash(detail?.creatorFullName),
    });
    // result.push({
    //   key: 'label.transfer_registration_by',
    //   value: getValueOrDash(detail?.approverName),
    // });

    result.push({
      key: 'label.number_of_duplicate_rows',
      value: getValueOrDash(detail?.totalDuplicateRecords),
    });

    detail?.requestType === 'ONLINE' &&
      result.push({
        key: 'label.id_nationality',
        value: getValueOrDash(detail?.userSSN),
      });

    result.push({
      key: 'label.description',
      value: getValueOrDash(detail?.description),
    });

    ///////TODO
    detail?.requestType !== 'ONLINE' &&
      result.push({
        key: 'label.shahab_code',
        value: getValueOrDash(detail?.shahabCode),
      });

    detail?.requestType === 'ONLINE' &&
      result.push({
        key: 'label.branch_code',
        value: getValueOrDash(detail?.branchCode),
      });

    detail?.status !== 'INACTIVE' &&
      result.push({
        key: 'label.transaction_details',
        value: (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              size='small'
              style={{ margin: '0', padding: '0', gap: 0 }}
              type='link'
              onClick={handleShowTransactionModal}
            >
              {t('show')} <i className='ri-arrow-left-s-line' />
            </Button>
          </div>
        ),
      });

    detail?.requestType === 'ONLINE' &&
      result.push({
        key: 'label.validat',
        value: showHasIbanInquiry(detail?.hasIbanInquiry, detail?.averageIbanInquiries),
      });

    result.push({
      key: 'label.file_details',
      value: (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            href={`/list-requests/file-details?ssn=${detail?.clientSSN}&id=${detail?.requestId}&status=${detail?.status}&requestType=${detail?.requestType}`}
          >
            <Button size='small' style={{ margin: '0', padding: '0', gap: 0 }} type='link'>
              {t('show')} <i className='ri-arrow-left-s-line' />
            </Button>
          </Link>
        </div>
      ),
    });

    (detail?.status === 'VALIDATION_FAILURE' || detail?.status === 'VALIDATION_SUCCESS') &&
      result.push({
        key: 'label.query_status',
        value: (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={goToUploadDetailPage}
              size='small'
              style={{ margin: '0', padding: '0', gap: 0 }}
              type='link'
            >
              {t('show')} <i className='ri-arrow-left-s-line' />
            </Button>
          </div>
        ),
      });

    detail?.status === 'VALIDATION_FAILURE' &&
      result.push({
        key: 'label.file',
        value: (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              style={{ padding: '0' }}
              size='small'
              type='link'
              danger={true}
              onClick={() => {
                refetchDownloadReceiptQueryStatus();
                resetDownloadErrorMessage();
              }}
              loading={receiptQueryStatusLoading}
            >
              <i className='ri-download-line'></i>
              {t('error_file')}
            </Button>
          </div>
        ),
      });

    return result;
  };

  const footer = () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '-webkit-fill-available',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        <Button
          size='small'
          type='primaryOutlined'
          onClick={() => {
            refetchDownloadRequestFile();
            resetDownloadErrorMessage();
          }}
          style={{ height: '5rem' }}
          loading={requestFileLoading}
        >
          {t('request_file')}
          <i className='ri-download-line ' />
        </Button>
        {!hidenStatuses.includes(data?.status) && data?.requestType !== 'OFFLINE_ACH' && (
          <Button
            size='small'
            type='primaryOutlined'
            onClick={() => {
              refetchDownloadExportFile();
              resetDownloadErrorMessage();
            }}
            style={{ height: '5rem' }}
            loading={exportFileLoading}
          >
            {t('output_file')}
            <i className='ri-download-line ' />
          </Button>
        )}
        {/* {data?.requestStatus && allowedStatuses.includes(data.requestStatus as Statuses) && ( */}
        <Button
          size='small'
          type='primary'
          onClick={() => {
            refetchDownloadReceipt();
            resetDownloadErrorMessage();
          }}
          style={{ height: '5rem' }}
          loading={receiptLoading}
        >
          {t('receive_receipt')}
          <i className='ri-file-list-3-line'></i>
        </Button>
        {/* )} */}
      </div>
    );
  };
  return (
    <BottomSheet
      open={openHistoryBottomSheet}
      onClose={() => setopenHistoryBottomSheet(false)}
      initialHeight={600}
      footer={footer()}
    >
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
      <InfoBox data={result(data)} isDense />
    </BottomSheet>
  );
};
export default HistoryDetailBottomSheet;
