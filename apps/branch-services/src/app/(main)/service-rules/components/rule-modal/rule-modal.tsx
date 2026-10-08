import { ReactNode } from 'react';
import { Modal } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button } from '@branch-services/ui-kit';

import * as S from './rule-modal.style';

type RuleModalProps = {
  open: boolean;
  title: ReactNode;
  confirmText: ReactNode;
  cancelText?: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
  danger?: boolean;
  children: ReactNode;
};

// Shared shell of the module's confirm-style modals: icon + title, body, and a cancel / confirm footer
const RuleModal = ({
  open,
  title,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  confirmLoading = false,
  danger = false,
  children,
}: RuleModalProps) => {
  const [t] = useTr();

  return (
    <Modal
      open={open}
      centered
      footer={null}
      closable={false}
      maskClosable={!confirmLoading}
      onCancel={onCancel}
      title={
        <S.ModalTitle $danger={danger}>
          <i className={danger ? 'ri-error-warning-fill' : 'ri-information-fill'} />
          {title}
        </S.ModalTitle>
      }
    >
      {children}
      <Box gap='1.6rem' marginTop='2.4rem'>
        <Button htmlType='button' type='primaryOutlined' disabled={confirmLoading} onClick={onCancel}>
          {cancelText ?? t('cancel')}
        </Button>
        <Button htmlType='button' type='primary' danger={danger} loading={confirmLoading} onClick={onConfirm}>
          {confirmText}
        </Button>
      </Box>
    </Modal>
  );
};

export default RuleModal;
