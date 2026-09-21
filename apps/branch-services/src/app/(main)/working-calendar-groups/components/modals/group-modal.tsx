import { MouseEvent, ReactNode } from 'react';

import { useTr } from '@branch-services/translation';
import { Button } from '@branch-services/ui-kit';

import * as S from './style';

export type GroupModalProps = {
  open: boolean;
  title: ReactNode;
  confirmText: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
  danger?: boolean;
  children: ReactNode;
  type?: 'edit' | 'remove' | 'create';
};

// Shared shell of the group modals: title with icon, body, and a cancel/confirm footer.
const GroupModal = ({
  open,
  type,
  title,
  confirmText,
  onConfirm,
  onCancel,
  confirmLoading = false,
  danger = false,
  children,
}: GroupModalProps) => {
  const [t] = useTr();

  // The modal is rendered inside the group form's React tree; keep clicks from reaching it
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
        <S.Title $danger={danger}>
          {type !== 'remove' && <i className='ri-error-warning-fill' />}
          <span>{title}</span>
        </S.Title>
      }
      open={open}
      onCancel={onCancel}
      closable={false}
      maskClosable={false}
      keyboard={false}
      footer={null}
    >
      {children}
      <S.Footer>
        <Button htmlType='button' type='primaryOutlined' disabled={confirmLoading} onClick={onCancel}>
          {t('button.cancel')}
        </Button>
        <Button htmlType='button' type='primary' danger={danger} loading={confirmLoading} onClick={handleConfirmClick}>
          {confirmText}
        </Button>
      </S.Footer>
    </S.ModalWrapper>
  );
};

export default GroupModal;
