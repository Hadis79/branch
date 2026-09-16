import { useTr } from '@branch-services/translation';
import { InfoItemType } from '@branch-services/types';
import { Button, InfoBox, MessageBox } from '@branch-services/ui-kit';
import { formatAmount, getValueOrDash } from '@branch-services/utils';
import { RowDataTableType } from '../../utils/types';
import React, { useEffect } from 'react';
import { Statuses } from '../../utils/consts';

import useOperationsRequestsHistoryStore from '../../store/use-widget-store';
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
  } = useOperationsRequestsHistoryStore();

  useEffect(() => {
    setFormValues({ ssn: data.accountOwnerSsn, id: data.requestTracingCode });
  }, [data.requestTracingCode]);

  const { isLoading: requestFileLoading, refetch: refetchDownloadRequestFile } = useDownloadOfflineRequestFileQuery(
    data.requestTracingCode,
    data.inputFileName
  );

  const result = (data: RowDataTableType) => {
    const detail = data;
    if (!detail) return null;
    const result: InfoItemType[] = [];

    result.push({
      key: 'application_registration',
      value: getValueOrDash(detail?.creatorFullName),
    });

    result.push({
      key: detail.withWithdraw ? 'label.source_account_name' : 'label.dest_account_name',
      value: getValueOrDash(detail?.accountOwnerName),
    });

    result.push({
      key: 'payment_type',
      value: getValueOrDash(detail?.paymentTypeTitle),
    });

    result.push({
      key: 'shahab_code',
      value: getValueOrDash(detail?.shahabCode),
    });
    result.push({
      key: 'selected_branch_for_deposit',
      value: `${getValueOrDash(detail?.branchCode)} - ${getValueOrDash(detail.branchName)}`,
    });

    result.push({
      key: 'label.id_nationality',
      value: getValueOrDash(detail?.accountOwnerSsn),
    });

    result.push({
      key: 'label.deposit_type',
      value: getValueOrDash(detail.withWithdraw ? t('transfer_by_account_title') : t('transfer_from_non_account')),
    });

    result.push({
      key: 'label.number_of_deposit_lines',
      value: getValueOrDash(detail?.totalCount),
    });

    result.push({
      key: 'deposit_desc',
      value: getValueOrDash(detail?.title),
    });
    result.push({
      key: 'label.duplicate_records_number',
      value: getValueOrDash(detail?.duplicateRecordCount),
    });

    result.push({
      key: 'label.description',
      value: getValueOrDash(detail?.description),
    });
    return result;
  };

  const footer = () => {
    return (
      <>
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
          {<i className='ri-download-line ' />}
        </Button>
      </>
    );
  };

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
      <InfoBox footer={footer()} data={result(data)} isDense />
    </>
  );
};
export default HistoryDetail;
