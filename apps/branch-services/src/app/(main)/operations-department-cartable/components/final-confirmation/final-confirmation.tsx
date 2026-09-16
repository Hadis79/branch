import React, { Fragment, useState } from 'react';

import { useTr } from '@branch-services/translation';
import { getValueOrDash } from '@branch-services/utils';
import { Box, Button, MessageBox } from '@branch-services/ui-kit';

import { InfoItemType } from '../../utils/types';
import { CartableModalsEnum, PageKind, RequestStatusButton } from '../../utils/consts';
import { formatValueWithThousandSeparator } from '../../utils/param-util';

import * as S from './final-confimation.style';
import { DataType, TransactionModal } from '@branch-services/components';
import useCartableDetailQuery from '../../queries/use-cartable-detail-query';
import useOperationsDepartmentCartableStore from '../../store/use-widget-store';

const FinalConfirmation = () => {
  const [t] = useTr();
  const { record, setStatusRequest, setModalType, setPageKind, pageKind, statusRequest, message } =
    useOperationsDepartmentCartableStore();
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const { data: catableDetail } = useCartableDetailQuery(record.requestTracingCode);

  const result = () => {
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
      title: t('selected_branch_for_deposit'),
      value: `${getValueOrDash(record?.branchCode)} - ${getValueOrDash(record?.branchName)}`,
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
      title: t('total_balance'),
      value: formatValueWithThousandSeparator(record?.totalAmount, t),
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
      type: 'header',
      title: t('user_information'),
      line: true,
    });
    result.push({
      type: 'item',
      title: t('shahab_code'),
      value: getValueOrDash(record?.shahabCode),
    });
    return result;
  };

  function returnBtnHandler() {
    setPageKind(PageKind.HISTORY);
    setStatusRequest(RequestStatusButton.DEFAULT);
  }
  const showModalHandler = (type) => {
    setModalType(type);
  };

  const showConfirmHandlerModal = () => {
    showModalHandler(CartableModalsEnum.CONFIRM_REQUEST);
  };

  const displayButtons = () => {
    if (statusRequest === RequestStatusButton.SUCCESS) {
      return (
        <Button size='large' type='primaryOutlined' style={{ width: 'auto' }} onClick={returnBtnHandler}>
          {t('back_to_cartable')}
        </Button>
      );
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', padding: '2rem' }}>
        <Button size='large' type='primaryOutlined' style={{ width: '10rem' }} onClick={returnBtnHandler}>
          {t('previous')}
        </Button>

        <Button style={{ width: '10rem' }} type='primary' onClick={showConfirmHandlerModal}>
          {t('confirm')}
        </Button>
      </div>
    );
  };

  return (
    <S.FinalFormWrapper>
      <MessageBox
        type={message?.type}
        message={message?.shouldTranslate ? t(message?.txt) : message?.txt}
        subErrors={message?.subErrors}
        closable
        shouldScroll
      />
      <S.FinalConfirmationStyle>
        {statusRequest === RequestStatusButton.SUCCESS && (
          <MessageBox
            message={t('offline_ach_bulk_deposit_request_created_successfully')}
            type={'success'}
            shouldScroll
            style={{ marginBottom: '3rem' }}
            linkProps={{ title: t('requests_history') as string, url: '/operations-requests-history' as string }}
          />
        )}
        {statusRequest === RequestStatusButton.DEFAULT && (
          <Box textAlign='justify' margin={'2rem 0'}>
            <MessageBox
              message={t('before_approval_transfer_requirement')}
              type={'warning'}
              closable={false}
              shouldScroll
            />
          </Box>
        )}

        <Box flexDirection={'column'} className='final-confirmation__container'>
          {result()?.map((item: InfoItemType, index: number) => {
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
