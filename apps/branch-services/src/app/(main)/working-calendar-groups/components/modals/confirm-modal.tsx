import { Box, Button } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';
import { MouseEvent } from 'react';

import * as S from './style';

type ConfirmModalProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  confirmLoading?: boolean;
  groupName?: string;
  unitCount: number;
};

const ConfirmModal = ({
  open,
  onCancel,
  onConfirm,
  confirmLoading = false,
  groupName,
  unitCount,
}: ConfirmModalProps) => {
  const [t] = useTr();
  const handleConfirmClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onConfirm();
  };

  return (
    <S.ModalWrapper
      centered
      width='54.4rem'
      title={
        <S.Title>
          <i className='ri-error-warning-fill' />
          <span>{t('confirm_create_group_title')}</span>
        </S.Title>
      }
      open={open}
      onCancel={onCancel}
      closable={false}
      maskClosable={false}
      keyboard={false}
      footer={null}
    >
      <S.Description>
        {t('confirm_create_group_question', { groupName })}
        <br />
        {t('confirm_create_group_description')}
      </S.Description>
      <S.UnitCount>
        <span>{t('unit_count')}:</span>
        <span>{unitCount.toLocaleString('fa-IR')}</span>
      </S.UnitCount>
      <Box>
        <Button htmlType='button' type='primaryOutlined' onClick={onCancel}>
          {t('button.cancel')}
        </Button>
        <Button htmlType='button' type='primary' loading={confirmLoading} onClick={handleConfirmClick}>
          {t('button.confirm')}
        </Button>
      </Box>
    </S.ModalWrapper>
  );
};

export default ConfirmModal;
