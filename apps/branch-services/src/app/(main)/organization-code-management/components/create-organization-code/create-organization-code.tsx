import React, { useState } from 'react';
import { Form } from 'antd';
import { RuleObject } from 'antd/es/form';
import { Button, Input, MessageBox } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';
import useCreateOrganizationCodeMutation from '../../queries/use-create-organization-code-mutation';
import useOrganizationNameQuery from '../../queries/use-organization-name-query';
import useOrganizationCodeStore from '../../store/use-widget-store';
import { ACCOUNT_NUMBER_LENGTH, NATIONAL_ID_LENGTH, ORGANIZATION_CODE_LENGTH } from '../../utils/constants';
import {
  getOrganizationCodeErrorMessage,
  isValidNationalIdLength,
  normalizeDigits,
  normalizeFormValues,
  toOrganizationCodeRequestDto,
} from '../../utils/utils';
import { OrganizationCodeFormValues } from '../../utils/types';
import { ReactComponent as Social } from '../../assets/media/Social.svg';
import RecordSummary from '../record-summary/record-summary';
import * as S from './create-organization-code.style';

const CreateOrganizationCode = () => {
  const [t] = useTr();
  const [form] = Form.useForm<OrganizationCodeFormValues>();
  const [lastInquiredOrganizationCode, setLastInquiredOrganizationCode] = useState<string>();
  const organizationCode = normalizeDigits(Form.useWatch('organizationCode', form)).trim();
  const { view, draft, createdRecord, setView, setDraft, setCreatedRecord, startCreate, returnToList } =
    useOrganizationCodeStore();
  const { mutate, isPending, error, reset } = useCreateOrganizationCodeMutation();
  const {
    refetch: inquireOrganizationName,
    isFetching: isInquiryPending,
    error: inquiryError,
  } = useOrganizationNameQuery(organizationCode);

  const validateNationalId = (_rule: RuleObject, value?: string) => {
    if (value && !isValidNationalIdLength(value)) {
      return Promise.reject(new Error(t('validation.national_id_length')));
    }
    return Promise.resolve();
  };

  const handleContinue = (values: OrganizationCodeFormValues) => {
    setDraft(normalizeFormValues(values));
    reset();
    setView('create-review');
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
    setLastInquiredOrganizationCode(undefined);
    form.setFields([{ name: 'organizationName', value: undefined, errors: [] }]);
  };

  const handleCreate = () => {
    if (!draft || isPending) return;

    mutate(toOrganizationCodeRequestDto(draft), {
      onSuccess: (record) => {
        setCreatedRecord(record);
        setView('create-success');
      },
    });
  };

  const handlePrevious = () => {
    reset();
    setView('create-form');
  };

  const handleStartCreate = () => {
    reset();
    startCreate();
  };

  const errorMessage = error ? getOrganizationCodeErrorMessage(error) : null;
  const inquiryErrorMessage =
    inquiryError && lastInquiredOrganizationCode === organizationCode
      ? getOrganizationCodeErrorMessage(inquiryError)
      : null;

  const renderActions = (
    primaryLabel: string,
    primaryAction?: () => void,
    loading = false,
    secondaryLabel = t('cancel'),
    secondaryAction = returnToList
  ) => (
    <S.PageActions>
      <Button type='primaryOutlined' disabled={loading} onClick={secondaryAction}>
        {secondaryLabel}
      </Button>
      <Button type='primary' htmlType={primaryAction ? 'button' : 'submit'} loading={loading} onClick={primaryAction}>
        {primaryLabel}
      </Button>
    </S.PageActions>
  );

  if (view === 'create-form') {
    return (
      <S.PageShell>
        <Form form={form} layout='vertical' clearOnDestroy initialValues={draft ?? undefined} onFinish={handleContinue}>
          {inquiryErrorMessage && (
            <MessageBox
              message={inquiryErrorMessage.shouldTranslate ? t(inquiryErrorMessage.txt) : inquiryErrorMessage.txt}
              type={inquiryErrorMessage.type}
              subErrors={inquiryErrorMessage.subErrors}
              style={{ marginBottom: '2rem' }}
            />
          )}
          <S.FormAndGuide>
            <S.FormFields>
              <Form.Item
                name='ssn'
                label={t('national_id') + '*'}
                rules={[{ required: true, message: t('validation.required') }, { validator: validateNationalId }]}
              >
                <Input allow='number' maxLength={NATIONAL_ID_LENGTH} placeholder={t('national_id_placeholder')} />
              </Form.Item>
              <Form.Item
                name='organizationCode'
                label={t('organization_code') + '*'}
                rules={[
                  { required: true, message: t('validation.required') },
                  { len: ORGANIZATION_CODE_LENGTH, message: t('validation.organization_code_length') },
                ]}
              >
                <Input
                  className='organization-code-input'
                  allow='number'
                  maxLength={ORGANIZATION_CODE_LENGTH}
                  placeholder={t('organization_code_placeholder')}
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
                name='organizationName'
                label={t('organization_name')}
                rules={[{ required: true, message: t('validation.organization_name_inquiry') }]}
              >
                <Input disabled placeholder={t('organization_name_placeholder')} />
              </Form.Item>
              <Form.Item
                name='accountNumber'
                label={t('account_number')}
                rules={[
                  { required: true, message: t('error.required') },
                  { len: ACCOUNT_NUMBER_LENGTH, message: t('validation.account_number_length') },
                ]}
              >
                <Input
                  allow='number'
                  allowClear
                  maxLength={ACCOUNT_NUMBER_LENGTH}
                  placeholder={t('account_number_placeholder')}
                />
              </Form.Item>
            </S.FormFields>

            <S.Guide>
              <Social aria-hidden='true' />
              <p>
                <span>•</span>
                {t('organization_code_guide')}
              </p>
            </S.Guide>
          </S.FormAndGuide>
          {renderActions(t('continue'), undefined, isInquiryPending)}
        </Form>
      </S.PageShell>
    );
  }

  if (view === 'create-review' && draft) {
    return (
      <S.PageShell>
        <S.SummarySection>
          {errorMessage && (
            <MessageBox
              message={errorMessage.shouldTranslate ? t(errorMessage.txt) : errorMessage.txt}
              type={errorMessage.type}
              subErrors={errorMessage.subErrors}
              style={{ marginBottom: '3rem' }}
            />
          )}
          <RecordSummary values={draft} />
        </S.SummarySection>
        {renderActions(t('final_confirmation'), handleCreate, isPending, t('previous'), handlePrevious)}
      </S.PageShell>
    );
  }

  return (
    <S.PageShell>
      <MessageBox
        message={t('create_success')}
        type={'success'}
        shouldScroll
        style={{ marginBottom: '3rem' }}
        linkProps={{ title: t('return_to_management') as string, url: '/organization-code-management' as string }}
        onClick={returnToList}
      />
      {createdRecord && (
        <S.SummarySection>
          <RecordSummary values={createdRecord} />
        </S.SummarySection>
      )}
      <S.PageActions>
        <Button type='primaryOutlined' onClick={handleStartCreate}>
          {t('add_new_organization_code')}
          <i className='ri-add-line' />
        </Button>
      </S.PageActions>
    </S.PageShell>
  );
};

export default CreateOrganizationCode;
