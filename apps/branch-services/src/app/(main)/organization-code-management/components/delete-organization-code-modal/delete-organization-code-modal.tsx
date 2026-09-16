import React from 'react';
import { Button, MessageBox } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';
import useDeleteOrganizationCodeMutation from '../../queries/use-delete-organization-code-mutation';
import useOrganizationCodeStore from '../../store/use-widget-store';
import { getOrganizationCodeErrorMessage } from '../../utils/utils';
import RecordSummary from '../record-summary/record-summary';
import * as S from '../modals/modal.style';

interface DeleteOrganizationCodeModalProps {
  shouldGoToPreviousPage?: boolean;
}

const DeleteOrganizationCodeModal = ({ shouldGoToPreviousPage = false }: DeleteOrganizationCodeModalProps) => {
  const [t] = useTr();
  const { activeModal, selectedRecord, closeModal, setMessage, pagination } = useOrganizationCodeStore();
  const { mutate, isPending, error, reset } = useDeleteOrganizationCodeMutation();
  const isOpen = activeModal === 'delete' && Boolean(selectedRecord);

  const handleClose = () => {
    if (isPending) return;
    closeAfterSuccess();
  };

  const closeAfterSuccess = () => {
    reset();
    closeModal();
  };

  const handleDelete = () => {
    if (!selectedRecord || isPending) return;

    mutate(
      {
        organizationCodeUUID: selectedRecord.organizationCodeUUID,
        previousPage: shouldGoToPreviousPage && pagination.page > 1 ? pagination.page - 1 : undefined,
      },
      {
        onSuccess: () => {
          setMessage({ txt: 'delete_success', type: 'success', shouldTranslate: true });
          closeAfterSuccess();
        },
      }
    );
  };

  const errorMessage = error ? getOrganizationCodeErrorMessage(error) : null;

  return (
    <S.ModalWrapper
      width={410}
      open={isOpen}
      centered
      footer={null}
      closeIcon={false}
      keyboard={false}
      maskClosable={!isPending}
      destroyOnClose
      onCancel={handleClose}
      title={
        <S.ModalTitle $danger>
          <i className='ri-error-warning-fill' />
          {t('delete_title')}
        </S.ModalTitle>
      }
    >
      {errorMessage && (
        <MessageBox
          message={errorMessage.shouldTranslate ? t(errorMessage.txt) : errorMessage.txt}
          type={errorMessage.type}
          subErrors={errorMessage.subErrors}
          style={{ marginBottom: '3rem' }}
        />
      )}
      <S.ModalDescription>{t('delete_confirmation')}</S.ModalDescription>
      {selectedRecord && <RecordSummary values={selectedRecord} compact />}
      <S.ModalActions>
        <Button type='primaryOutlined' disabled={isPending} onClick={handleClose}>
          {t('cancel')}
        </Button>
        <Button type='primary' danger loading={isPending} disabled={isPending} onClick={handleDelete}>
          {t('delete')}
        </Button>
      </S.ModalActions>
    </S.ModalWrapper>
  );
};

export default DeleteOrganizationCodeModal;
