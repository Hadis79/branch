import { useTr } from '@branch-services/translation';
import { AccountSelector, Button, Input } from '@branch-services/ui-kit';
import { Form } from 'antd';
import * as S from './submit-request-step.style';
import Image from 'next/image';
import SubmitInfoPic from '../../assets/media/submit-request.svg';
import { PageRoute } from '../../utils/consts';
import { usePathname } from 'next/navigation';
import { ActionButtonsContainer } from '../app/app.style';
import { useWidgetStore } from '../../store';
import { useEffect, useState } from 'react';
import { validateNationalCode } from '../../utils/utils';
import WithdrawalTypeModal from '../withdrawal-type-modal/withdrawal-type-modal';
import { withdrawalTypesEnum } from '../../utils/types';

export const FORM_ITEM_NAMES = {
  ssn: 'ssn',
  accountBranchCode: 'accountBranchCode',
  depositDescription: 'depositDescription',
  withdrawalId: 'withdrawalId',
  description: 'description',
};

const SubmitRequestStep = () => {
  const [form] = Form.useForm();
  const [t] = useTr();
  const pathname = usePathname();
  const [account, setAccount] = useState<any>();
  const [openWithdrawalType, setOpenWithdrawalType] = useState<boolean>(false);
  const {
    setFormValues,
    formValues,
    uploadResponse,
    activeStep,
    setActiveStep,
    setMessage,
    setCancelUpload,
    activeWithdrawalType,
  } = useWidgetStore((state) => state);

  useEffect(() => {
    setOpenWithdrawalType(true);
  }, [activeStep]);

  const handleSsnChange = async (e) => {
    const ssn = e.target.value.replace(/\D/g, '');
    if (!ssn) {
      setAccount(null);
    }
    if (uploadResponse?.id) {
      resetUploadResponse();
    }
    await setFormValues({ ssn });
  };

  const handleChangeAccount = async (value, option) => {
    if (value && option?.id) {
      if (uploadResponse?.id) {
        resetUploadResponse();
      }
      setAccount(option);
    }
  };

  const handleAccountError = (error) => {
    setMessage(error);
  };

  const resetUploadResponse = () => {
    setCancelUpload();
  };

  const onFinish = async (values) => {
    await setFormValues({
      ...values,
      accountNumber: account?.id ?? formValues?.accountNumber,
      branchCode: account?.branchCode ?? formValues?.branchCode,
      availableBalance: account?.availableBalance ?? formValues?.availableBalance,
      accountOwnerName: account?.name ?? formValues?.accountOwnerName,
    });
    await form.validateFields();
    setActiveStep(1);
    window.history.pushState({}, '', `${pathname}?step=${PageRoute.UPLOAD_FILE}`);
  };

  useEffect(() => {
    form.setFieldsValue({ ...formValues });
  }, [form, formValues]);

  const disabledFields = () => {
    return !formValues.ssn || !validateNationalCode(formValues.ssn);
  };

  return (
    <>
      <Form form={form} layout='vertical' onFinish={onFinish} name='submit-information'>
        <S.SubmitWrapper>
          <div>
            <Form.Item
              name={FORM_ITEM_NAMES.ssn}
              label={t('field.ssn') + ' *'}
              rules={[
                { required: true, message: t('error.required') },
                {
                  validator: (_, value) => {
                    if (value && !validateNationalCode(value)) {
                      return Promise.reject(new Error(t('error.invalid_ssn')));
                    }

                    return Promise.resolve('resolve');
                  },
                },
              ]}
            >
              <Input
                value={formValues.ssn}
                onChange={handleSsnChange}
                allow={'number'}
                minLength={10}
                maxLength={12}
                placeholder={t('placeholder.ssn')}
              />
              <div className='account__owner-name-text'>
                <span>{account?.name ?? formValues?.accountOwnerName}</span>
              </div>
            </Form.Item>

            {activeWithdrawalType && (
              <Form.Item
                name={FORM_ITEM_NAMES.accountBranchCode}
                label={t('field.source_account_number') + ' *'}
                rules={[
                  { required: true, message: t('error.required') },
                  {
                    validator: (_, value) => {
                      if (value && value.length < 3) {
                        return Promise.reject(new Error(t('error.minimum_account_number')));
                      }

                      return Promise.resolve('resolve');
                    },
                  },
                ]}
              >
                <AccountSelector
                  disabled={disabledFields()}
                  legalId={formValues?.ssn as string}
                  onError={handleAccountError}
                  placeholder={t('placeholder.account_number')}
                  onChange={(value, option) => handleChangeAccount(value, option)}
                />
              </Form.Item>
            )}

            <Form.Item
              label={t('field.description_deposit') + ' *'}
              name={FORM_ITEM_NAMES.depositDescription}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={t('placeholder.description_deposit')} maxLength={50} disabled={disabledFields()} />
            </Form.Item>

            <Form.Item
              label={t('field.withdrawal_id')}
              name={FORM_ITEM_NAMES.withdrawalId}
              rules={[
                {
                  pattern: /^\d+$/,
                  message: t('error.only_digits'),
                },
              ]}
            >
              <Input placeholder={t('placeholder.withdrawal_id')} maxLength={35} disabled={disabledFields()} />
            </Form.Item>

            <Form.Item label={t('field.description')} name={FORM_ITEM_NAMES.description}>
              <Input.TextArea
                autoSize={{ minRows: 1 }}
                placeholder={t('placeholder.description')}
                maxLength={120}
                disabled={disabledFields()}
              />
            </Form.Item>
          </div>

          <S.ImageWrapper activeWithdrawalType={activeWithdrawalType}>
            <Image src={SubmitInfoPic} alt={'batch-ach-request'} width={230} height={230} />
            <p className='transfer-by-cheque-description'>{t('transfer_by_cheque_description')}</p>
          </S.ImageWrapper>
        </S.SubmitWrapper>
        <ActionButtonsContainer>
          <Button
            className='reject-form__button'
            size='large'
            onClick={() => {
              window.location.href = '/';
            }}
          >
            {t('button.previous')}
          </Button>
          <Button htmlType='submit' size='large' type='primary'>
            {t('button.continue')}
          </Button>
        </ActionButtonsContainer>
      </Form>

      <WithdrawalTypeModal open={openWithdrawalType} onClickBoxCallback={() => setOpenWithdrawalType(false)} />
    </>
  );
};
export default SubmitRequestStep;
