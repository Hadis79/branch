import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import { Button, Input, MessageBox } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';
import useOrganizationNameQuery from '../../queries/use-organization-name-query';
import useUpdateOrganizationCodeMutation from '../../queries/use-update-organization-code-mutation';
import useOrganizationCodeStore from '../../store/use-widget-store';
import { ACCOUNT_NUMBER_LENGTH, NATIONAL_ID_LENGTH, ORGANIZATION_CODE_LENGTH } from '../../utils/constants';
import { getOrganizationCodeErrorMessage, normalizeDigits, toOrganizationCodeUpdateDto } from '../../utils/utils';
import { OrganizationCodeUpdateFormValues } from '../../utils/types';
import * as S from '../modals/modal.style';

const EditOrganizationCodeModal = () => {
  const [t] = useTr();
  const [form] = Form.useForm<OrganizationCodeUpdateFormValues>();
  const [lastInquiredOrganizationCode, setLastInquiredOrganizationCode] = useState<string>();
  const organizationCode = normalizeDigits(Form.useWatch('organizationCode', form)).trim();
  const { activeModal, selectedRecord, closeModal, setMessage } = useOrganizationCodeStore();
  const { mutate, isPending, error, reset } = useUpdateOrganizationCodeMutation();
  const {
    refetch: inquireOrganizationName,
    isFetching: isInquiryPending,
    error: inquiryError,
  } = useOrganizationNameQuery(organizationCode);
  const isOpen = activeModal === 'edit' && Boolean(selectedRecord);

  useEffect(() => {
    if (isOpen && selectedRecord) {
      form.setFieldsValue(selectedRecord);
      setLastInquiredOrganizationCode(undefined);
    }
  }, [form, isOpen, selectedRecord]);

  const handleClose = () => {
    if (isPending) return;
    closeAfterSuccess();
  };

  const closeAfterSuccess = () => {
    reset();
    setLastInquiredOrganizationCode(undefined);
    form.resetFields();
    closeModal();
  };

  const handleOrganizationCodeInquiry = async () => {
    if (isInquiryPending) return;

    try {
      await form.validateFields(['organizationCode']);
    } catch {
      return;
    }

    const requestedOrganizationCode = normalizeDigits(form.getFieldValue('organizationCode')).trim();
    setLastInquiredOrganizationCode(requestedOrganizationCode);
    const { data, error: inquiryRequestError } = await inquireOrganizationName();

    if (
      !inquiryRequestError &&
      normalizeDigits(form.getFieldValue('organizationCode')).trim() === requestedOrganizationCode
    ) {
      form.setFieldValue('organizationName', data?.trim() || undefined);
    }
  };

  const handleOrganizationCodeChange = () => {
    reset();
    setLastInquiredOrganizationCode(undefined);
    form.setFields([{ name: 'organizationName', value: undefined, errors: [] }]);
  };

  const handleFinish = (values: OrganizationCodeUpdateFormValues) => {
    if (!selectedRecord || isPending || isInquiryPending) return;

    mutate(
      {
        organizationCodeUUID: selectedRecord.organizationCodeUUID,
        values: toOrganizationCodeUpdateDto(values),
      },
      {
        onSuccess: () => {
          setMessage({ txt: 'update_success', type: 'success', shouldTranslate: true });
          closeAfterSuccess();
        },
      }
    );
  };

  const errorMessage = error ? getOrganizationCodeErrorMessage(error) : null;
  const inquiryErrorMessage =
    inquiryError && lastInquiredOrganizationCode === organizationCode
      ? getOrganizationCodeErrorMessage(inquiryError)
      : null;
  const displayedErrorMessage = inquiryErrorMessage ?? errorMessage;

  return (
    <S.ModalWrapper
      width={430}
      open={isOpen}
      centered
      footer={null}
      closeIcon={false}
      keyboard={false}
      maskClosable={!isPending && !isInquiryPending}
      destroyOnClose
      onCancel={handleClose}
      title={
        <S.ModalTitle>
          <i className='ri-information-fill' />
          {t('edit')}
        </S.ModalTitle>
      }
    >
      {displayedErrorMessage && (
        <MessageBox
          message={displayedErrorMessage.shouldTranslate ? t(displayedErrorMessage.txt) : displayedErrorMessage.txt}
          type={displayedErrorMessage.type}
          subErrors={displayedErrorMessage.subErrors}
          style={{ marginBottom: '3rem' }}
        />
      )}
      <Form form={form} layout='vertical' onFinish={handleFinish}>
        <Form.Item label={t('national_id')} name='ssn' rules={[{ required: true, message: t('validation.required') }]}>
          <Input allow='number' maxLength={NATIONAL_ID_LENGTH} disabled />
        </Form.Item>
        <Form.Item
          label={t('organization_code')}
          name='organizationCode'
          rules={[
            { required: true, message: t('validation.required') },
            { len: ORGANIZATION_CODE_LENGTH, message: t('validation.organization_code_length') },
          ]}
        >
          <Input
            className='organization-code-input'
            allow='number'
            maxLength={ORGANIZATION_CODE_LENGTH}
            disabled={isInquiryPending}
            onChange={handleOrganizationCodeChange}
            suffix={
              <Button
                className='organization-code-inquiry'
                type='link'
                size='small'
                htmlType='button'
                loading={isInquiryPending}
                disabled={isInquiryPending}
                onClick={() => void handleOrganizationCodeInquiry()}
              >
                {!isInquiryPending && t('inquiry')}
              </Button>
            }
          />
        </Form.Item>
        <Form.Item
          label={t('organization_name')}
          name='organizationName'
          rules={[
            {
              validator: (_rule, value?: string) =>
                value ? Promise.resolve() : Promise.reject(new Error(t('validation.organization_name_inquiry'))),
            },
          ]}
        >
          <Input disabled placeholder={t('organization_name_placeholder')} />
        </Form.Item>
        <Form.Item
          label={t('account_number')}
          name='accountNumber'
          rules={[{ len: ACCOUNT_NUMBER_LENGTH, message: t('validation.account_number_length') }]}
        >
          <Input allow='number' allowClear maxLength={ACCOUNT_NUMBER_LENGTH} />
        </Form.Item>
        <S.ModalActions>
          <Button type='primaryOutlined' onClick={handleClose} disabled={isPending}>
            {t('cancel')}
          </Button>
          <Button type='primary' htmlType='submit' loading={isPending} disabled={isPending || isInquiryPending}>
            {t('apply_changes')}
          </Button>
        </S.ModalActions>
      </Form>
    </S.ModalWrapper>
  );
};

export default EditOrganizationCodeModal;
