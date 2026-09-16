import React from 'react';

import { Box, Button } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import useCartableStore from '../../../store/use-cartable-store';
import useRejectRequestMutation from '../../../queries/use-reject-mutation';
import useRejectOfflineRequestMutation from '../../../queries/use-offline-reject-mutation';
import { RequestTypes } from '../../../utils/consts';

const RejectModal = () => {
  const { t } = useTr();
  const { mutate: rejectMutate, isPending } = useRejectRequestMutation();
  const { mutate: rejectOfflineMutate, isPending: rejectOfflinePending } = useRejectOfflineRequestMutation();

  const { record, setModalType } = useCartableStore();

  function resetHandler() {
    setModalType(null);
  }

  function rejectionHandler() {
    if (record.requestType === RequestTypes.OFFLINE_ACH) {
      rejectOfflineMutate(record.requestTracingCode);
    } else {
      rejectMutate(record.requestTracingCode);
    }
  }

  return (
    <>
      <Box margin={'2.4rem 0'}>{t('reject_text_message')}</Box>
      <Box gap='1rem'>
        <Button type='primaryOutlined' onClick={resetHandler}>
          {t('button.cancel')}
        </Button>
        <Button loading={isPending || rejectOfflinePending} type='primary' danger onClick={rejectionHandler}>
          {t('reject')}
        </Button>
      </Box>
    </>
  );
};

export default RejectModal;
