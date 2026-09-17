import { Modal } from 'antd';

import { useTr } from '@branch-services/translation';
import { MessageBox } from '@branch-services/ui-kit';
import { ApiUtil } from '@branch-services/utils';

import ServiceForm from './service-form';
import ServiceMessage from '../message/service-message';
import useSaveService from '../../hooks/use-save-service';

import * as S from './service-form-modal.style';

// Create and edit share this modal; the form is rebuilt on every opening (destroyOnClose)
const ServiceFormModal = () => {
  const [t] = useTr();
  const { isOpen, isEdit, selectedService, save, close, isPending, error } = useSaveService();

  const handleCancel = () => {
    if (!isPending) close();
  };

  return (
    <Modal
      open={isOpen}
      width={430}
      centered
      footer={null}
      closable={false}
      maskClosable={!isPending}
      destroyOnClose
      onCancel={handleCancel}
      title={
        <S.ModalTitle>
          <i className='ri-information-fill' />
          {t(isEdit ? 'edit_service' : 'new_service')}
        </S.ModalTitle>
      }
    >
      {isEdit && <MessageBox type='info' message={t('edit_service_info')} margin='0 0 2.4rem' />}
      {error && <ServiceMessage message={ApiUtil.getErrorMessage(error)} margin='0 0 2.4rem' />}
      <ServiceForm
        isEdit={isEdit}
        initialValues={selectedService ?? { active: true }}
        isPending={isPending}
        onSubmit={save}
        onCancel={handleCancel}
      />
    </Modal>
  );
};

export default ServiceFormModal;
