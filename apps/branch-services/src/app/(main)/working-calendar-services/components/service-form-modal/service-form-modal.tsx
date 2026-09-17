import { Form, Modal, Switch } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, Input, MessageBox } from '@branch-services/ui-kit';
import { ApiUtil } from '@branch-services/utils';

import useCreateServiceMutation from '../../queries/use-create-service-mutation';
import useUpdateServiceMutation from '../../queries/use-update-service-mutation';
import useServiceStore from '../../store/use-widget-store';
import { ENGLISH_NAME_PATTERN } from '../../utils/constants';
import type { ServiceFormValues } from '../../utils/types';

import * as S from './service-form-modal.style';

// Create and edit share this modal; the form is rebuilt on every opening (destroyOnClose)
const ServiceFormModal = () => {
  const [t] = useTr();
  const activeModal = useServiceStore((state) => state.activeModal);
  const selectedService = useServiceStore((state) => state.selectedService);
  const closeModal = useServiceStore((state) => state.closeModal);
  const setMessage = useServiceStore((state) => state.setMessage);
  const createService = useCreateServiceMutation();
  const updateService = useUpdateServiceMutation();

  const isEdit = activeModal === 'edit';
  const mutation = isEdit ? updateService : createService;
  const errorMessage = mutation.error ? ApiUtil.getErrorMessage(mutation.error) : null;

  const close = () => {
    createService.reset();
    updateService.reset();
    closeModal();
  };

  const handleCancel = () => {
    if (!mutation.isPending) close();
  };

  const handleFinish = ({ name, englishName, active }: ServiceFormValues) => {
    const onSuccess = () => {
      setMessage({
        txt: t(isEdit ? 'update_service_success' : 'create_service_success', { serviceName: name }),
        type: 'success',
        shouldTranslate: false,
      });
      close();
    };

    if (isEdit && selectedService) {
      updateService.mutate({ id: selectedService.id, name, englishName, active }, { onSuccess });
    } else {
      createService.mutate({ name, englishName }, { onSuccess });
    }
  };

  return (
    <Modal
      open={activeModal !== null}
      width={430}
      centered
      footer={null}
      closable={false}
      maskClosable={!mutation.isPending}
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
      {errorMessage && (
        <MessageBox
          message={errorMessage.shouldTranslate ? t(errorMessage.txt) : errorMessage.txt}
          type={errorMessage.type}
          subErrors={errorMessage.subErrors}
          margin='0 0 2.4rem'
        />
      )}
      <Form<ServiceFormValues>
        layout='vertical'
        initialValues={selectedService ?? { active: true }}
        disabled={mutation.isPending}
        onFinish={handleFinish}
      >
        <Form.Item
          name='name'
          label={t('service_name')}
          rules={[{ required: true, whitespace: true, message: t('service_name_required') }]}
        >
          <Input placeholder={t('service_name_placeholder')} />
        </Form.Item>
        <Form.Item
          name='englishName'
          label={t('service_english_name')}
          rules={[
            { required: true, whitespace: true, message: t('service_english_name_required') },
            { pattern: ENGLISH_NAME_PATTERN, message: t('service_english_name_invalid') },
          ]}
        >
          <Input dir='ltr' placeholder={t('service_english_name_placeholder')} />
        </Form.Item>
        {isEdit && (
          <Form.Item name='active' label={t('status')} valuePropName='checked'>
            <Switch checkedChildren={t('active')} unCheckedChildren={t('inactive')} />
          </Form.Item>
        )}
        <Box gap='1.6rem' marginTop='2.4rem'>
          <Button htmlType='button' type='primaryOutlined' onClick={handleCancel}>
            {t('cancel')}
          </Button>
          <Button htmlType='submit' type='primary' loading={mutation.isPending}>
            {t(isEdit ? 'save_changes' : 'create_service')}
          </Button>
        </Box>
      </Form>
    </Modal>
  );
};

export default ServiceFormModal;
