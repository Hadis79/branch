import React, { useEffect, useState } from 'react';
import { Button, OtpInput } from '@branch-services/ui-kit';
import { Form } from 'antd';
import * as S from './otp.style';
import { useTr } from '@branch-services/translation';
import useWidgetStore from '../../store/use-widget-store';
import { ReactComponent as OtpSvg } from '../../assets/media/Frame 1000007073.svg';
import { PageKind } from '../../utils/consts';
import useOtpMutation from '../../queries/use-otp-mutation';
import useValidateMutation from '../../queries/use-validate-mutation';
import { LocalStorageKey } from '@branch-services/types';
import { storage } from '@branch-services/utils';

export const FORM_ITEM_NAMES = {
  otp: 'otp',
};

export type OtpParams = {
  mobileNumber: string | undefined;
};

export type ValidateParams = {
  otp: string | undefined;
};

function OtpForm() {
  const [form] = Form.useForm();
  const [otp, setOtp] = useState('');
  const [t] = useTr();
  const clearAuthStorage = () => {
    const authKeys = [
      LocalStorageKey.USER,
      LocalStorageKey.USER_PROFILE,
      LocalStorageKey.USER_PHOTO,
      LocalStorageKey.Accounts,
      LocalStorageKey.WITHDRAWAL_TYPE,
      LocalStorageKey.USER_ORG,
      LocalStorageKey.MENU,
      LocalStorageKey.PURPOSES,
    ];

    authKeys.forEach((key) => storage.removeItem(key));
  };

  const resetErrorMessage = useWidgetStore((s) => s.resetErrorMessage);

  const { setActiveStep, setFormValues, formValues, state } = useWidgetStore((state) => state);
  const { data: stateOtp, mutate: mutateOtp, isPending: otpLoading, isResendDisabled } = useOtpMutation();
  const { data: stateValidate, mutate: mutateValidate, isPending: validateLoading } = useValidateMutation();

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    form.setFieldsValue({ ...formValues });
    // setActiveStep(0);
  }, [form, formValues]);

  useEffect(() => {
    clearAuthStorage();
    formValues.otp = '';
    setFormValues({
      ...formValues,
    });
    otpCallFunction();
    setTimeLeft(120);
  }, []);

  useEffect(() => {
    otpLoading === true && setTimeLeft(120);
  }, [otpLoading]);

  function maskPhoneNumber(phone?: string): string {
    if (!phone) return '';
    const firstPart = phone.slice(0, 4);
    const lastPart = phone.slice(-2);
    return `${lastPart}****${firstPart}`;
  }

  const handleChange = (val: string) => {
    setOtp(val);
  };

  const handleComplete = (val: string) => {
    // console.log('Completed OTP:', val);
  };

  const onFinish = async (values) => {
    await setFormValues({
      ...values,
    });
    await form.validateFields();
    const params: ValidateParams = {
      otp: values?.otp,
    };
    mutateValidate(params, {
      onSuccess: () => {
        state.page = PageKind.CARD;
        setActiveStep(state.page);
      },
    });
  };

  const returnFunction = () => {
    state.page = PageKind.SUBMIT_INFORMATION;
    setActiveStep(state.page);
  };

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const otpCallFunction = () => {
    mutateOtp();
  };

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <Form form={form} onFinish={onFinish} name='otp-information'>
      <S.OtpContainer>
        <div className='top-form'>
          <p className='title'>{t('login.soda_system')}</p>
          <p className='description'>
            {t('otp.otp_first_message')} {maskPhoneNumber(formValues?.phoneNumber)} {t('otp.otp_secound_message')}
          </p>
        </div>

        <OtpSvg />

        <S.OtpInput>
          <S.CodeInputs>
            <Form.Item
              name={FORM_ITEM_NAMES.otp}
              rules={[
                { required: true, message: t('error.required') },
                { len: 5, message: t('otp.must_be_5_digits') },
              ]}
            >
              <OtpInput value={otp} valueLength={5} onChange={handleChange} onComplete={handleComplete} />
            </Form.Item>
          </S.CodeInputs>

          <S.Resend>
            {t('otp.otp_unsend')}
            <Button type='link' onClick={otpCallFunction} loading={otpLoading} disabled={isResendDisabled}>
              {isResendDisabled ? formatTime(timeLeft) : t('button.resend_otp')}
            </Button>
          </S.Resend>
        </S.OtpInput>

        <S.ButtonOtp>
          <Button htmlType='submit' type='primary' size='large' block className='button'>
            {t('button.confirm_otp')}
          </Button>
          <Button type='link' className='button' onClick={returnFunction}>
            {t('button.return')}
          </Button>
        </S.ButtonOtp>
      </S.OtpContainer>
    </Form>
  );
}

export default OtpForm;
