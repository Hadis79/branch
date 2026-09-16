import React, { useState, useEffect } from 'react';
import { useTr } from '@branch-services/translation';
import * as S from './form.style';
import { Form, Spin } from 'antd';
import { Button, Input } from '@branch-services/ui-kit';
import { ActionButtonsContainer } from '../app/app.style';
import { ReactComponent as Refresh } from '../../assets/media/refresh-2.svg';
import useWidgetStore from '../../store/use-widget-store';
import { PageKind } from '../../utils/consts';
import { validateNationalCode } from '../../utils/utils';
import useVerifyMutation, { VerifyParams } from '../../queries/use-verify-mutation';
import useCaptchaMutation from '../../queries/use-captcha-mutation';

export const FORM_ITEM_NAMES = {
  ssn: 'ssn',
  phoneNumber: 'phoneNumber',
  captcha: 'captcha',
};

function FormLogin(params) {
  const { dataCaptcha, loadingCaptcha } = params;
  const [t] = useTr();
  const [form] = Form.useForm();
  const { setFormValues, formValues, setActiveStep, state, setTimer, timer, prevStep, captchaResponse } =
    useWidgetStore((state) => state);

  const { data: stateVerify, mutate: mutateVerify, isPending: VerifyLoading } = useVerifyMutation();
  const { data: stateCaptcha, mutate: mutateCaptcha, isPending: captchaLoading } = useCaptchaMutation();
  const captchaImage = captchaResponse?.captchaImage || stateCaptcha?.captchaImage || dataCaptcha?.captchaImage;

  useEffect(() => {
    form.setFieldsValue({ ...formValues });
  }, [form, formValues]);

  useEffect(() => {
    formValues.captcha = '';
    setFormValues({
      ...formValues,
    });
    prevStep === '' && mutateCaptcha();
  }, []);

  // useEffect(()=>{
  //   if((timer!==null)){
  //   formValues.captcha = '';
  //   setFormValues({
  //     ...formValues,
  //   });
  //   mutateCaptcha();
  //   }
  // },[timer])

  useEffect(() => {
    if (stateCaptcha && timer === null) {
      setTimer(Date.now());
    }
  }, [stateCaptcha]);

  useEffect(() => {
    if (dataCaptcha && timer === null) {
      setTimer(Date.now());
    }
  }, [dataCaptcha]);

  const onFinish = async (values) => {
    await setFormValues({
      ...values,
    });

    const params: VerifyParams = {
      ssn: values?.ssn,
      mobileNumber: values?.phoneNumber,
      captcha: values?.captcha,
    };

    mutateVerify(params, {
      onSuccess: () => {
        state.page = PageKind.OTP;
        setActiveStep(state.page);
      },
      onError: () => {
        prevStep === '' && setTimeout(mutateCaptcha, 1000);
        setFormValues({
          ...values,
          captcha: '',
        });
      },
    });
  };

  return (
    <>
      <div className='top-form'>
        <p className='title'>{t('login.soda_system')}</p>
        <p className='description'>{t('login.enter_nationalCode')}</p>
      </div>
      <Form form={form} layout='vertical' onFinish={onFinish} name='submit-information'>
        <S.SubmitWrapper>
          <div>
            <Form.Item
              label={t('field.national_Identifier')}
              name={FORM_ITEM_NAMES.ssn}
              rules={[
                { required: true, message: t('error.required') },
                {
                  validator: (_, value) => {
                    if (value && !validateNationalCode(value)) {
                      return Promise.reject(new Error(t('error.invalid_ssn')));
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input allow='number' placeholder={t('placeholder.national_Identifier')} maxLength={11} />
            </Form.Item>

            <Form.Item
              label={t('field.phoneNumber')}
              name={FORM_ITEM_NAMES.phoneNumber}
              rules={[{ required: true, message: t('error.required') }]}
            >
              <Input allow='number' placeholder={t('placeholder.phoneNumber')} maxLength={11} />
            </Form.Item>
            <div style={{ display: 'grid', alignItems: 'center', gap: '0.8rem', gridTemplateColumns: '2fr 1fr' }}>
              <Form.Item
                label={t('field.captcha')}
                name={FORM_ITEM_NAMES.captcha}
                rules={[{ required: true, message: t('error.required') }]}
              >
                <Input allow='number' placeholder={t('placeholder.captcha')} style={{ flex: 1 }} />
              </Form.Item>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 0 0' }}>
                {captchaImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`data:image/png;base64,${captchaImage}`}
                    alt='captcha'
                    // style={{
                    //   height: '4rem',
                    //   border: '0.1rem solid #ccc',
                    //   borderRadius: '0.4rem',
                    // }}
                  />
                )}

                {(captchaLoading || loadingCaptcha) && <Spin></Spin>}
                {(!captchaLoading || !loadingCaptcha) && <Refresh onClick={mutateCaptcha} />}
              </div>
            </div>
          </div>
        </S.SubmitWrapper>
        <ActionButtonsContainer>
          <Button loading={VerifyLoading} className='submit' htmlType='submit' size='large' type='primary'>
            {t('button.continue')}
          </Button>
        </ActionButtonsContainer>
      </Form>
    </>
  );
}

export default FormLogin;
