import React, { Fragment, useState } from 'react';

import { useTr } from '@branch-services/translation';
import { getValueOrDash } from '@branch-services/utils';
import { Box, Button, MessageBox } from '@branch-services/ui-kit';

import { InfoItemType } from '../../utils/types';
import { RequestStatusButton, RequestTypes } from '../../utils/consts';
import useCartableStore from '../../store/use-cartable-store';
import { formatValueWithThousandSeparator } from '../../utils/param-util';

import * as S from './final-confimation.style';
import { DataType, TransactionModal } from '@branch-services/components';
import useCartableDetailQuery from '../../queries/use-cartable-detail-query';

const FinalConfirmation = () => {
  const [t] = useTr();
  const { record, setStatusRequest, setModalType } = useCartableStore();
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const { data: catableDetail } = useCartableDetailQuery(record.requestTracingCode);

  const prepareOfflineResult = () => {
    const result: InfoItemType[] = [];
    result.push({
      type: 'header',
      title: t('offline_ach_bulk_deposit_information'),
      line: false,
    });
    result.push({
      type: 'item',
      title: t('trace_code'),
      value: getValueOrDash(record?.traceCode),
    });

    result.push({
      type: 'item',
      title: t('legal_ssn'),
      value: getValueOrDash(record?.accountOwnerSsn),
    });

    result.push({
      type: 'item',
      title: t('label.' + 'application_registration_by'),
      value: getValueOrDash(record?.creatorFullName),
    });
    result.push({
      type: 'item',
      title: t('deposit_type'),
      value: record?.withWithdraw ? t('transfer_by_account_title') : t('transfer_by_cheque_title'),
    });
    result.push({
      type: 'item',
      title: record.withWithdraw ? t('source_account_number') : t('label.returend_account_number'),
      value: getValueOrDash(record?.accountNumber + ' - ' + (record?.accountOwnerName ?? '')),
    });

    result.push({
      type: 'item',
      title: t('label.request_branch_code'),
      value: `${getValueOrDash(record?.branchCode)} - ${getValueOrDash(record.branchName)}`,
    });
    result.push({
      type: 'item',
      title: t('label.deposit_desc'),
      value: getValueOrDash(record?.title),
    });
    result.push({
      type: 'item',
      title: t('shahab_code'),
      value: getValueOrDash(record?.shahabCode),
    });

    result.push({
      type: 'item',
      title: t('label.purpose'),
      value: getValueOrDash(record?.statementTitle),
    });
    result.push({
      type: 'item',
      title: t('label.description'),
      value: getValueOrDash(record?.description),
    });
    result.push({
      type: 'header',
      title: t('transaction_total'),
      line: true,
    });
    result.push({
      type: 'item',
      title: t('transfer_type'),
      value: getValueOrDash(record?.paymentTypeTitle),
    });
    result.push({
      type: 'item',
      title: t('total_record'),
      value: getValueOrDash(record?.totalCount),
    });
    result.push({
      type: 'item',
      title: t('duplicate_records_number'),
      value: getValueOrDash(record?.duplicateRecordCount),
    });

    result.push({
      type: 'item',
      title: t('deposit_amount'),
      value: formatValueWithThousandSeparator(record?.totalAmount, t),
    });
    return result;
  };

  const prepareOnlineResult = () => {
    const result: InfoItemType[] = [];
    result.push({
      type: 'item',
      title: t('status'),
      value: getValueOrDash(catableDetail?.requestStatusTitle),
    });
    result.push({
      type: 'item',
      title: t('label.payment_type'),
      value: record?.withWithdraw ? t('transfer_by_account_title') : t('transfer_by_cheque_title'),
    });
    result.push({
      type: 'item',
      title: record.withWithdraw ? t('source_account_number') : t('label.returend_account_number'),
      value: getValueOrDash(record?.accountNumber + ' - ' + (record?.accountOwnerName ?? '')),
    });

    !record.withWithdraw &&
      result.push({
        type: 'item',
        title: t('label.intermediary_account_number'),
        value: '0113440294004' + ' - ' + t('intermediary_account_centralization'),
      });
    !record.withWithdraw &&
      result.push({
        type: 'item',
        title: t('label.deposit_id'),
        value: getValueOrDash(record?.paymentId),
      });

    result.push({
      type: 'item',
      title: t('label.withdrawal_id'),
      value: getValueOrDash(record?.withdrawalId),
    });

    result.push({
      type: 'item',
      title: t('label.account_branch_code'),
      value: getValueOrDash(record?.accountBranchCode),
    });
    result.push({
      type: 'item',
      title: t('label.deposit_desc'),
      value: getValueOrDash(record?.title),
    });
    result.push({
      type: 'item',
      title: t('label.purpose'),
      value: getValueOrDash(record?.statementTitle),
    });
    result.push({
      type: 'item',
      title: t('label.description'),
      value: getValueOrDash(record?.description),
    });
    result.push({
      type: 'header',
      title: t('transaction_total'),
      line: true,
    });
    result.push({
      type: 'item',
      title: t('payment_type'),
      value: getValueOrDash(record?.paymentTypeTitle),
    });
    result.push({
      type: 'item',
      title: t('total_record'),
      value: getValueOrDash(record?.totalCount),
    });
    result.push({
      type: 'item',
      title: t('duplicate_records_number'),
      value: getValueOrDash(record?.duplicateRecordCount),
    });
    result.push({
      type: 'item',
      title: t('wage_amount'),
      value: formatValueWithThousandSeparator(record?.wageAmount, t),
    });
    result.push({
      type: 'item',
      title: t('total_balance'),
      value: formatValueWithThousandSeparator(record?.totalAmount, t),
    });
    result.push({
      type: 'item',
      title: t('average_deposit'),
      value: formatValueWithThousandSeparator(Math.trunc(record?.totalAmount / record?.totalCount), t),
    });
    result.push({
      type: 'item',
      title: t('transaction_detail'),
      value: (
        <div className='transaction_details_link' onClick={() => setOpenTransactionModal(true)}>
          <span className='upload_view_detail'>{t('show_transaction_detail')}</span>
          <i className='ri-arrow-left-s-line' />
        </div>
      ),
    });
    return result;
  };

  function returnBtnHandler() {
    setStatusRequest(RequestStatusButton.DEFAULT);
    setModalType(null);
  }

  const displayButtons = () => {
    return (
      <Button size='large' type='primaryOutlined' style={{ width: 'auto' }} onClick={returnBtnHandler}>
        {t('back_to_cartable')}
      </Button>
    );
  };

  const result = record.requestType === RequestTypes.OFFLINE_ACH ? prepareOfflineResult() : prepareOnlineResult();

  return (
    <S.FinalFormWrapper>
      <S.FinalConfirmationStyle>
        <MessageBox
          message={
            record.requestType === RequestTypes.OFFLINE_ACH
              ? t('offline_batch_deposit_confirmed')
              : t('final_confirmation_success_message')
          }
          type={'success'}
          shouldScroll
          style={{ marginBottom: '3rem' }}
          linkProps={{ title: t('ach_history_list') as string, url: '/batch-ach-history' as string }}
        />
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
      </S.FinalConfirmationStyle>
      <Box justifyContent='flex-end'>{displayButtons()}</Box>
      {openTransactionModal && (
        <TransactionModal
          dataType={DataType.FULL_DATA}
          fullData={record}
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

export default FinalConfirmation;
