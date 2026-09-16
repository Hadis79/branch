import React, { useEffect, useState } from 'react';

import { Checkbox, Form, Radio, RadioChangeEvent, SelectProps } from 'antd';

import { BottomSheet, Box, Button, Dragger, Select } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import BatchPaymentSvg from '../../assets/media/batch-payment.svg';

import * as S from './upload-file.style';
import useWidgetStore from '../../store/use-widget-store';
import Image from 'next/image';
import { PageRoute, PaymentType, paymentTypesInfo, PurposesPaymentType } from '../../utils/consts';
import useUploadFileMutation, { UploadFileParams } from '../../queries/use-upload-file-mutation';
import usePurposesQuery from '../../queries/use-get-purposes-query';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import utils, { getpaymentTypeLabel } from '../../utils/utils';
import PaymentTypeInfo from './payment-type-info/payment-type-info';
import { usePathname } from 'next/navigation';
import UploadResultBox from './upload-result-box/upload-result-box';
import LowBalanceModal from '../low-balance-modal/low-balance-modal';
import { DataType, TransactionModal } from '@branch-services/components';
import { LocalStorageKey } from '@branch-services/types';
import { storage } from '@branch-services/utils';
import { ActionButtonsContainer } from '../app/app.style';
import { useResponsive } from '@branch-services/hooks';

const UploadFile = () => {
  const pathname = usePathname();
  const [t] = useTr();
  const [form] = Form.useForm();
  const {
    formValues,
    uploadFileForm,
    validate,
    uploadResponse,
    setUploadFormValues,
    activeWithdrawalType,
    setCancelUpload,
    resetField,
    openInfoModal,
    setOpenInfoModal,
    setActiveStep,
    purposes,
    resetMessage,
    balance,
  } = useWidgetStore((state) => state);
  const { data: statePurposes, isLoading: purposesLoading } = usePurposesQuery();

  const {
    data: stateUploadFile,
    isSuccess: uploadFileSuccess,
    error: uploadError,
    isError: uploadIsError,
    mutate: mutateUploadFile,
    reset: resetUpload,
    isPending: uploadFileLoading,
  } = useUploadFileMutation();

  const [purposesPaymentType, setPurposesPaymentType] = useState<PurposesPaymentType>(PurposesPaymentType.INTRA_BANK);
  const [fileRequiredError, setFileRequiredError] = useState<boolean | null>(null);
  const [openLowBalanceModal, setOpenLowBalanceModal] = useState<boolean>(false);
  // const [openValidationStep, setOpenValidationStep] = useState<boolean>(false);
  const { isMobileOrTablet } = useResponsive();

  useEffect(() => {
    form.setFieldsValue({ ...uploadFileForm });
  }, [form, uploadFileForm]);

  useEffect(() => {
    switch (uploadFileForm?.paymentType) {
      case PaymentType.AUTO:
      case PaymentType.LOCAL:
        setPurposesPaymentType(PurposesPaymentType.LOCAL);
        break;

      case PaymentType.SATNA:
      case PaymentType.PAYA:
        setPurposesPaymentType(PurposesPaymentType.INTRA_BANK);
        break;
    }
  }, [uploadFileForm.paymentType]);

  const isInvalidType = (type) => {
    const validExcelTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
    ];
    return !validExcelTypes.includes(type);
  };

  const isValidExcelExtension = (fileName) => {
    const validExtensions = ['.xlsx', '.xls'];
    return validExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));
  };

  const handleFileUpload = async (option) => {
    const { onError, file } = option;

    if (isInvalidType(file.type) || !isValidExcelExtension(file.name)) {
      onError('Invalid file type. Please upload an Excel file.');
    }
    setUploadFormValues({ file: file });

    const accountNumberNew = (formValues?.accountBranchCode as string).split(' - ')[0];
    const organizationString: any = storage.getItem(LocalStorageKey.USER);
    const organization = JSON?.parse(organizationString);
    const ssnStorage = organization?.userSsn;
    const params: UploadFileParams = {
      file: file,
      ssn: ssnStorage,
      accountNumber: accountNumberNew,
      paymentType: uploadFileForm?.paymentType,
      allowSplitPaya: uploadFileForm?.allowSplitPaya,
      isWithWithdraw: activeWithdrawalType === 'ACCOUNT_METHOD' ? true : false,
      hasIbanInquiry: validate,
      branchName: formValues?.branchCode?.split(' - ')[1],
      branchCode: formValues?.branchCode?.split(' - ')[0],
      title: formValues?.depositDescription,
      description: formValues?.description,
      purpose: uploadFileForm?.statement?.value,
      accountBranchCode: formValues?.accountBranchCode?.split('-')[1]?.split(/(\s+)/)[6],
    };

    mutateUploadFile(params);
  };

  const onFinish = async (values: any) => {
    if (!uploadResponse || !uploadResponse?.success) {
      setFileRequiredError(true);
      return;
    }
    await setUploadFormValues(values);
    await form.validateFields();
    if (!isMobileOrTablet) {
      window.history.pushState({}, '', `${pathname}?step=${PageRoute.VALIDATE}`);
      setActiveStep(2);
    } else {
      window.history.pushState({}, '', `${pathname}?step=${PageRoute.VALIDATE}`);
      setActiveStep(2);
    }
  };

  const onCancelModal = () => {
    setOpenInfoModal(false);
    setCancelUpload();
  };

  const isPermittedOrganization = () => {
    /*  const organization: any = localStorage.getItem(LocalStorageKey.USER_ORG);
    if (organization) {
      const organizationSsn = JSON.parse(organization)?.currentOrganization?.ssn;
      if (organizationSsn === '014000188533') {
        return true;
      }
    }
    return false;*/

    return true;
  };

  const isValidTimeForSatna = (): boolean => {
    const now = new Date();
    // Check if it's past 13:45 (1:45 PM)
    const isPast7_00 = now.getHours() >= 7 && now.getMinutes() >= 0;
    const isPast19_00 = now.getHours() >= 19 && now.getMinutes() >= 0;

    return isPast7_00 && !isPast19_00;
  };
  const checkUploadEnablity = () => {
    return !!uploadResponse?.success || uploadFileLoading;
  };

  const checkEnablity = (paymentType: PaymentType) => {
    switch (paymentType) {
      case PaymentType.AUTO:
        return checkUploadEnablity();
      case PaymentType.LOCAL:
        return checkUploadEnablity() || !isPermittedOrganization();
      case PaymentType.PAYA:
        return checkUploadEnablity();
      case PaymentType.SATNA:
        return checkUploadEnablity();
    }
  };

  const lowBalanceModalFooter = () => {
    return (
      <div style={{ display: 'flex', gap: '1.6rem', justifyContent: 'end' }}>
        <Button
          style={{ width: '10rem' }}
          type='default'
          onClick={() => {
            setOpenLowBalanceModal(false);
          }}
        >
          {t('reject')}
        </Button>
        <Button
          style={{ width: '10rem' }}
          type='primary'
          onClick={() => {
            setOpenLowBalanceModal(false);
            form.submit();
          }}
        >
          {t('continue')}
        </Button>
      </div>
    );
  };
  const transferOptions = [
    {
      label: getpaymentTypeLabel(PaymentType.AUTO, t),
      value: PaymentType.AUTO,
      disabled: true, //checkEnablity(paymentType.AUTO),
      description: '',
    },
    {
      label: getpaymentTypeLabel(PaymentType.LOCAL, t),
      value: PaymentType.LOCAL,
      disabled: checkEnablity(PaymentType.LOCAL),
      description: 'melli_desc',
    },
    {
      label: getpaymentTypeLabel(PaymentType.PAYA, t),
      value: PaymentType.PAYA,
      disabled: checkEnablity(PaymentType.PAYA),
      description: 'paya_desc',
    },
    {
      label: getpaymentTypeLabel(PaymentType.SATNA, t),
      value: PaymentType.SATNA,
      disabled: checkEnablity(PaymentType.SATNA),
      description: 'satna_desc',
    },
  ];
  const onPaymentTypeChange = ({ target: { value } }: RadioChangeEvent) => {
    form.resetFields(['statement']);
    resetField('statement');

    setUploadFormValues({ paymentType: value });
    if (value !== PaymentType.PAYA) {
      setUploadFormValues({ paymentType: value, allowSplitPaya: false });
    }

    // setPaymentType(value);
  };
  const handlePurposeChange = (_, option) => {
    setUploadFormValues({ statement: option });
  };

  const handleDownloadMenuClick = async () => {
    utils.getLocalFile();
  };

  // function getRelatedTypeInfo() {
  //   const foundType: any = paymentTypesInfo.filter((item) => item.value === uploadFileForm?.paymentType);
  //   if (foundType.length > 0)
  //     return (
  //       <div className={'type-info-row'}>
  //         <Box className={'type-title-container'}>
  //           <Image src={PaymentTypeSvg} width={22} height={22} alt={''} />
  //           {getpaymentTypeLabel(foundType[0]?.value, t)}
  //         </Box>
  //         <div>
  //           {foundType[0]?.content?.map((text: any) => {
  //             return <p key={text}>{t(text)}</p>;
  //           })}
  //         </div>
  //       </div>
  //     );
  // }

  const handleChangeSplitCheckBox = (e: CheckboxChangeEvent) => {
    setUploadFormValues({ allowSplitPaya: e.target.checked });
  };

  const getPurposes = () => {
    const result: SelectProps['options'] = [];
    const data = (statePurposes ?? purposes)?.filter((item) => item.transferType === purposesPaymentType);
    data?.map((item) => {
      return result.push({
        value: item?.statementCode?.toString().trim(),
        label: item?.titleFA?.toString().trim(),
      });
    });
    return result ?? [];
  };
  const nextStep = () => {
    !uploadResponse ? setFileRequiredError(true) : setFileRequiredError(false);
    if (typeof uploadResponse?.totalAmount === 'number' && (balance ?? 0) < uploadResponse?.totalAmount) {
      uploadResponse?.success && setOpenLowBalanceModal(true);
    } else {
      form.submit();
    }
  };

  const handleRemoveUploadFile = () => {
    resetMessage();
    resetUpload();
  };

  return (
    <>
      <S.SubmitInformationWrapper>
        <Form form={form} layout='vertical' name='upload-file-form' onFinish={onFinish} autoComplete='off'>
          <Form.Item label={t('payment_type')} style={{ marginBottom: 0 }}>
            <S.PaymentTypePanel>
              <Form.Item name='paymentType' className={'radio-group'} initialValue={PaymentType.PAYA}>
                <Radio.Group onChange={onPaymentTypeChange} value={uploadFileForm?.paymentType}>
                  {transferOptions.map(({ value, label, description, disabled }) => (
                    <div
                      key={value}
                      className={`radio-group-item ${uploadFileForm?.paymentType === value ? 'selected' : ''} ${
                        disabled && 'disabled'
                      }`}
                    >
                      <div className='radio-group-label'>
                        <Radio value={value} disabled={disabled}>
                          {label}
                        </Radio>
                      </div>
                      <span className='radio-group-description'>{t(description)}</span>
                    </div>
                  ))}
                </Radio.Group>
              </Form.Item>

              {/* {getRelatedTypeInfo()} */}
            </S.PaymentTypePanel>
            <Form.Item name='allowSplitPaya'>
              <Box className='split_check_box'>
                <Checkbox
                  checked={uploadFileForm?.allowSplitPaya}
                  onChange={handleChangeSplitCheckBox}
                  disabled={checkUploadEnablity() || uploadFileForm?.paymentType === PaymentType.LOCAL}
                />
                <Box className='text_check_box'>{t('split_money_check_box_label')}</Box>
              </Box>
            </Form.Item>
          </Form.Item>

          <Form.Item
            className={'half-width'}
            label={t('purpose')}
            name={'statement'}
            rules={[{ required: true, message: `${t('purpose')} ${t('validation_error')}` }]}
          >
            <Select
              options={getPurposes()}
              allowClear
              onChange={handlePurposeChange}
              placeholder={t('placeholder.purpose')}
              loading={purposesLoading}
            />
          </Form.Item>
          {!uploadResponse && (
            <S.UploadFileContainer fileRequiredError={fileRequiredError}>
              <Form.Item name='file' className='dragger-style'>
                <Dragger
                  displayDefaultChildren={true}
                  multiple={false}
                  maxCount={1}
                  description={t('or_click_to_upload')}
                  disabled={uploadFileLoading || !formValues?.accountBranchCode || !uploadFileForm?.statement}
                  loading={uploadFileLoading}
                  customRequest={handleFileUpload}
                  onRemove={handleRemoveUploadFile}
                />
                <S.StyledHelperText>
                  {!uploadFileLoading && fileRequiredError && (
                    <span className='error-text'>{t('upload_validation_rule')}</span>
                  )}
                </S.StyledHelperText>
              </Form.Item>
            </S.UploadFileContainer>
          )}
          <S.StyledHelperText>
            {uploadResponse && !uploadResponse?.success && (
              <span className='error-text'>{t('uploader_error_helper')}</span>
            )}
          </S.StyledHelperText>
          {uploadResponse && <UploadResultBox />}

          <Button type='link' onClick={handleDownloadMenuClick}>
            {t('download_template_button')}
            <i className='ri-download-line' />
          </Button>
        </Form>
        <S.ImageWrapper flexDirection='column'>
          <S.ImageContainer>
            <Image src={BatchPaymentSvg} width={230} height={230} alt={''} />
          </S.ImageContainer>
          <PaymentTypeInfo />
        </S.ImageWrapper>
        {openInfoModal && (
          <TransactionModal
            dataType={DataType.FULL_DATA}
            fullData={uploadResponse}
            footer={() => {
              return (
                <S.ButtonWrapper>
                  <Button type='default' onClick={onCancelModal}>
                    {t('button.cancel')}
                  </Button>
                  <Button type='primary' onClick={() => setOpenInfoModal(false)}>
                    {t('confirm_continue_button')}
                  </Button>
                </S.ButtonWrapper>
              );
            }}
            open={openInfoModal as boolean}
            fnc={setOpenInfoModal}
            title={t('upload_info_box_title')}
          />
        )}
      </S.SubmitInformationWrapper>
      <ActionButtonsContainer>
        <Button
          className='reject-form__button'
          size='large'
          onClick={() => {
            window.history.pushState({}, '', `${pathname}?step=${PageRoute.SUBMIT}`);
            setActiveStep(0);
            resetMessage();
          }}
        >
          {t('button.previous')}
        </Button>
        <Button
          className='continue-form__button'
          size='large'
          type='primary'
          htmlType='submit'
          // disabled={!uploadResponse?.success}
          onClick={nextStep}
        >
          {t('button.continue')}
        </Button>
      </ActionButtonsContainer>

      {isMobileOrTablet ? (
        <BottomSheet open={openLowBalanceModal} initialHeight={220} onClose={() => setOpenLowBalanceModal(false)}>
          <S.ModalWrapper>
            <div className={'modal-wrapper__header'}>
              <i className='ri-error-warning-fill'> </i>
              <p className={'modal-wrapper__title'}>{t('low_balance')}</p>
            </div>

            <div className='modal-wrapper__body'>{t('continue_with_low_balance')}</div>

            <div style={{ display: 'flex', gap: '1.6rem', justifyContent: 'end' }}>
              <Button
                style={{ width: '-webkit-fill-available' }}
                type='default'
                onClick={() => {
                  setOpenLowBalanceModal(false);
                }}
              >
                {t('reject')}
              </Button>
              <Button
                style={{ width: '-webkit-fill-available' }}
                type='primary'
                onClick={() => {
                  setOpenLowBalanceModal(false);
                  form.submit();
                }}
              >
                {t('continue')}
              </Button>
            </div>
          </S.ModalWrapper>
        </BottomSheet>
      ) : (
        <LowBalanceModal open={openLowBalanceModal} footer={lowBalanceModalFooter} />
      )}

      {/* <BottomSheet open={openValidationStep} initialHeight={630} onClose={() => setOpenValidationStep(false)}>
        <FinalConfirmationStep></FinalConfirmationStep>
      </BottomSheet> */}
    </>
  );
};

export default UploadFile;
