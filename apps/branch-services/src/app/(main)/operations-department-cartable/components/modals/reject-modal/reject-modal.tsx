import React from 'react';

import { Box, Button } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import useRejectRequestMutation from '../../../queries/use-reject-mutation';
import useOperationsDepartmentCartableStore from '../../../store/use-widget-store';

const RejectModal = () => {
  const { t } = useTr();
  const { mutate: rejectMutate, isPending } = useRejectRequestMutation();
  const { record, setModalType } = useOperationsDepartmentCartableStore();

  function resetHandler() {
    setModalType(null);
  }

  function rejectionHandler() {
    rejectMutate(record.requestTracingCode);
  }

  return (
    <>
      <Box margin={'2.4rem 0'}>{t('reject_text_message')}</Box>
      <Box gap='1rem'>
        <Button type='primaryOutlined' onClick={resetHandler}>
          {t('button.cancel')}
        </Button>
        <Button loading={isPending} type='primary' danger onClick={rejectionHandler}>
          {t('reject')}
        </Button>
      </Box>
    </>
  );
};

export default RejectModal;
