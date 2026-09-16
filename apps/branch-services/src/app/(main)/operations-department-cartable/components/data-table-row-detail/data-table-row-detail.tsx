import React, { useEffect } from 'react';

import { useTr } from '@branch-services/translation';
import { InfoItemType } from '@branch-services/types';
import { Button, InfoBox, MessageBox } from '@branch-services/ui-kit';
import { formatAmount, getValueOrDash } from '@branch-services/utils';
import { CartableModalsEnum, PageKind } from '../../utils/consts';
import useDownloadRequestFileQuery from '../../queries/use-download-request-file';
import useDownloadReceiptQuery from '../../queries/use-download-receipt';

import useOperationsDepartmentCartableStore from '../../store/use-widget-store';
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
  const {
    setModalType,
    setTransactionKeys,
    setRecord,
    record,
    downloadErrorMessage,
    resetDownloadErrorMessage,
    setPageKind,
  } = useOperationsDepartmentCartableStore();

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
    setRecord(data);
  }, []);

  const showConfirmationStep = () => {
    setRecord(data);
    setPageKind(PageKind.CONFIRMATION);
  };

  const handleDownloadOfflineRequestFile = async () => {
    resetDownloadErrorMessage();
    refetchDownloadOfflineRequestFile();
  };

  const result = (data) => {
    const detail = data;
    if (!detail) return null;
    const result: InfoItemType[] = [];

    result.push({
      key: 'label.application_registration_by',
      value: getValueOrDash(detail?.creatorFullName),
    });

    result.push({
      key: detail.withWithdraw ? 'source_account_number' : 'label.returend_account_number',
      value: getValueOrDash(detail?.accountNumber),
    });
    result.push({
      key: 'transfer_type',
      value: getValueOrDash(detail?.paymentTypeTitle),
    });
    result.push({
      key: detail.withWithdraw ? 'label.source_account_name' : 'label.dest_account_name',
      value: getValueOrDash(detail?.accountOwnerName),
    });
    result.push({
      key: 'label.request_branch_code',
      value: `${getValueOrDash(detail?.branchCode)} - ${getValueOrDash(detail.branchName)}`,
    });
    result.push({
      key: 'shahab_code',
      value: getValueOrDash(detail.shahabCode),
    });
    result.push({
      key: 'deposit_type',
      value: getValueOrDash(detail.withWithdraw ? t('transfer_by_account_title') : t('transfer_from_non_account')),
    });
    result.push({
      key: 'number_of_deposit_lines',
      value: getValueOrDash(detail?.totalCount),
    });

    result.push({
      key: 'label.deposit_desc',
      value: getValueOrDash(detail?.title),
    });

    result.push({
      key: 'label.number_of_duplicate_rows',
      value: getValueOrDash(detail?.duplicateRecordCount),
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

  // const isTimePassed = catableDetail?.isTimePassed;

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
  return (
    <>
      {downloadErrorMessage && showMessageBox(downloadErrorMessage)}
      <>
        <InfoBox data={result(data)} isDense />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', padding: '2rem' }}>
          <Button type='primary' style={{ width: '10rem' }} onClick={showConfirmationStep}>
            {t('confirm')}
          </Button>
        </div>
      </>
    </>
  );
};
export default DataTableRowDetail;
