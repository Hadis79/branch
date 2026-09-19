import { ReactNode } from 'react';
import { Modal } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button } from '@branch-services/ui-kit';

import * as S from './holiday-modal.style';

type HolidayModalProps = {
  open: boolean;
  title: ReactNode;
  confirmText: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
  danger?: boolean;
  children: ReactNode;
};

// Shared shell of the module's modals: title with icon, body, and a cancel / confirm footer
const HolidayModal = ({
  open,
  title,
  confirmText,
  onConfirm,
  onCancel,
  confirmLoading = false,
  danger = false,
  children,
}: HolidayModalProps) => {
  const [t] = useTr();

  return (
    <Modal
      open={open}
      width={430}
      centered
      footer={null}
      closable={false}
      maskClosable={!confirmLoading}
      onCancel={onCancel}
      title={
        <S.ModalTitle $danger={danger}>
          <i className='ri-information-fill' />
          {title}
        </S.ModalTitle>
      }
    >
      {children}
      <Box gap='1.6rem' marginTop='2.4rem'>
        <Button htmlType='button' type='primaryOutlined' disabled={confirmLoading} onClick={onCancel}>
          {t('cancel')}
        </Button>
        <Button htmlType='button' type='primary' danger={danger} loading={confirmLoading} onClick={onConfirm}>
          {confirmText}
        </Button>
      </Box>
    </Modal>
  );
};

export default HolidayModal;
