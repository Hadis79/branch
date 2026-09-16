import { useTr } from '@branch-services/translation';
import { AccountSelectorRefrences, Box, Button, Input, Select } from '@branch-services/ui-kit';
import { Checkbox, Form, Tooltip } from 'antd';
import * as S from './submit-request-step.style';
import Image from 'next/image';
import SubmitInfoPic from '../../assets/media/submit-request.svg';
import { PageRoute, RequestStatus } from '../../utils/consts';
import { usePathname } from 'next/navigation';
import { ActionButtonsContainer } from '../app/app.style';
import { useWidgetStore } from '../../store';
import { useEffect, useRef, useState } from 'react';
import WithdrawalTypeModal from '../withdrawal-type-modal/withdrawal-type-modal';
import { ReactComponent as InfoCircle } from '../../assets/media/info-circle.svg';
import Utils from '../../utils/utils';
import useBankUnitsMutation, { BankUnitsParams } from '../../queries/use-bank-units-mutation';

export const FORM_ITEM_NAMES = {
  accountBranchCode: 'accountBranchCode',
  branchCode: 'branchCode',
  depositDescription: 'depositDescription',
  withdrawalId: 'withdrawalId',
  description: 'description',
  inquiry: 'inquiry',
};

const SubmitRequestStep = (clientSsn) => {
  const [form] = Form.useForm();
  const [t] = useTr();
  const pathname = usePathname();
  const [account, setAccount] = useState<any>();
  const [openWithdrawalType, setOpenWithdrawalType] = useState<boolean>(false);
  const { data: stateBankUnits, mutate: mutateBankUnits, isPending: bankUnitsLoading } = useBankUnitsMutation();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [forceRenderKey, setForceRenderKey] = useState(0);
  const hasSearchedRef = useRef(false);

  const {
    setFormValues,
    formValues,
    validate,
    statusRequest,
    uploadResponse,
    activeStep,
    setActiveStep,
    setMessage,
    setCancelUpload,
    setValidate,
    resetFormValues,
    resetUploadFileForm,
    resetValidate,
    activeWithdrawalType,
    resetRequestStatus,
    evictCache,
    setBalance,
  } = useWidgetStore((state) => state);
  // const clientSsn = useClientSsn();

  useEffect(() => {
    setForceRenderKey((prev) => prev + 1);
  }, [clientSsn]);

  useEffect(() => {
    setOpenWithdrawalType(true);
  }, [activeStep]);

  const handleBalance = (value) => {
    setBalance(value);
  };

  useEffect(() => {
    if (statusRequest === RequestStatus.SUCCESS || statusRequest === RequestStatus.TRY_AGAIN) {
      resetFormValues();
      resetUploadFileForm();
      resetValidate();
      resetRequestStatus();
    }
  }, [statusRequest]);

  const handleChangeAccount = async (value, option) => {
    if (value && option?.id) {
      if (uploadResponse?.id) {
        resetUploadResponse();
      }
      setAccount(option);
    }
  };

  useEffect(() => {
    const params: BankUnitsParams = {
      criteria: undefined,
    };
    mutateBankUnits(params);
  }, []);

  const handleAccountError = (error) => {
    setMessage(error);
  };

  const resetUploadResponse = () => {
    setCancelUpload();
  };

  const onFinish = async (values) => {
    await setFormValues({
      ...values,
    });
    await form.validateFields();
    setActiveStep(1);
    window.history.pushState({}, '', `${pathname}?step=${PageRoute.UPLOAD_FILE}`);
  };

  useEffect(() => {
    form.setFieldsValue({ ...formValues });
    setActiveStep(0);
  }, [form, formValues]);

  const handleChangeInquiryCheckBox = (e) => {
    const validate = e.target.checked;
    setValidate(validate);
  };

  return (
    <>
      <S.DownloadFile>
        <div className='text-svg'>
          <InfoCircle />
          <div className='text'>{t('text_sample_file')}</div>
        </div>
        <Button
          type='link'
          size='small'
          className='sample-file'
          icon={<i className='ri-download-line' />}
          // loading={state?.downloadFile?.loading}
          onClick={() => Utils.getLocalFile()}
        >
          {t('button_sample_file')}
        </Button>
      </S.DownloadFile>
      <Form form={form} layout='vertical' onFinish={onFinish} name='submit-information'>
        <S.SubmitWrapper>
          <div>
            <Form.Item
              name={FORM_ITEM_NAMES.accountBranchCode}
              label={
                <span className='tooltip-info'>
                  {activeWithdrawalType === 'ACCOUNT_METHOD'
                    ? t('field.source_account_number')
                    : t('field.returend_account_number')}
                  *
                  <Tooltip
                    title={
                      activeWithdrawalType === 'ACCOUNT_METHOD'
                        ? t('tooltip.source_account_number')
                        : t('tooltip.returend_account_number')
                    }
                  >
                    <InfoCircle />
                  </Tooltip>
                </span>
              }
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
              <AccountSelectorRefrences
                // key={forceRenderKey}
                legalId={clientSsn}
                onError={handleAccountError}
                placeholder={t('placeholder.account_number')}
                onChange={(value, option) => handleChangeAccount(value, option)}
                onBalance={(balance) => handleBalance(balance)}
              />
            </Form.Item>

            <Form.Item
              name={FORM_ITEM_NAMES.branchCode}
              label={t('field.branch') + ' *'}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Select
                showSearch
                allowClear
                placeholder={t('placeholder.branch')}
                filterOption={false}
                open={dropdownOpen}
                onClear={() => {
                  if (searchTimeoutRef?.current) {
                    clearTimeout(searchTimeoutRef.current);
                  }
                  if (hasSearchedRef?.current) {
                    hasSearchedRef.current = false;
                    const params: BankUnitsParams = { criteria: '' };
                    mutateBankUnits(params);
                  }

                  setTimeout(() => {
                    setDropdownOpen(true);
                  }, 100);
                }}
                onDropdownVisibleChange={(open) => {
                  setDropdownOpen(open);
                  if (hasSearchedRef?.current && open === true) {
                    hasSearchedRef.current = false;
                    const params: BankUnitsParams = { criteria: '' };
                    mutateBankUnits(params);
                  }
                }}
                onSearch={(value) => {
                  if (searchTimeoutRef?.current) {
                    clearTimeout(searchTimeoutRef.current);
                  }

                  searchTimeoutRef.current = setTimeout(() => {
                    if (value && value.trim().length > 0) {
                      hasSearchedRef.current = true;
                      const params: BankUnitsParams = { criteria: value };
                      mutateBankUnits(params);
                      setDropdownOpen(true);
                    }
                  }, 500);
                }}
                style={{ minWidth: 200 }}
                loading={bankUnitsLoading}
                options={
                  (stateBankUnits &&
                    stateBankUnits?.map((unit) => ({
                      value: `${unit?.unitId} - ${unit?.name}`,
                      label: `${unit?.unitId} - ${unit?.name}`,
                    }))) ||
                  []
                }
                onMouseEnter={() => {
                  const params: BankUnitsParams = { criteria: '' };
                  if (stateBankUnits?.length === 0) {
                    mutateBankUnits(params);
                  }
                }}
              />
            </Form.Item>

            <Form.Item
              label={t('field.description_deposit') + ' *'}
              name={FORM_ITEM_NAMES.depositDescription}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input placeholder={t('placeholder.description_deposit')} maxLength={50} />
            </Form.Item>

            <Form.Item label={t('field.description')} name={FORM_ITEM_NAMES.description}>
              <Input.TextArea autoSize={{ minRows: 1 }} placeholder={t('placeholder.description')} maxLength={120} />
            </Form.Item>

            {/* <Form.Item name={FORM_ITEM_NAMES.inquiry}>
              <Box className='inquiry'>
                <Checkbox className='inquiry-checkbox' checked={validate} onChange={handleChangeInquiryCheckBox} />
                <Box className='text_check_box'>
                  {t('inquiry_check_box_label')}
                  <Tooltip placement='top' title={t('iban_tooltip')} mouseEnterDelay={0} mouseLeaveDelay={0.1}>
                    <InfoCircle />
                  </Tooltip>
                </Box>
              </Box>
            </Form.Item> */}
          </div>

          <S.ImageWrapper activeWithdrawalType={activeWithdrawalType}>
            <Image src={SubmitInfoPic} alt={'create-request'} width={230} height={230} />
            <p className='transfer-by-cheque-description'>
              <ol className='list'>
                <li>{t('desc_submit_first')}</li>
                <li>{t('desc_submit_secound')}</li>
              </ol>
            </p>
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
