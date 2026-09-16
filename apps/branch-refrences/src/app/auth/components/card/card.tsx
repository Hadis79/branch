import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, Select } from '@branch-services/ui-kit';
import { Form, InputRef } from 'antd';
import * as S from './card.style';
import { useTr } from '@branch-services/translation';
import useWidgetStore from '../../store/use-widget-store';
import { PageKind } from '../../utils/consts';
import useCardListMutation, { CardListParams } from '../../queries/use-card-list-mutation';
import useCardOtpMutation, { CardOtpParams } from '../../queries/use-card-otp-mutation';
import useCardVerifyMutation, { CardVerifyParams } from '../../queries/use-card-verify-mutation';

export const FORM_ITEM_NAMES = {
  cardNumber: 'cardNumber',
  cvv2: 'cvv2',
  password: 'password',
  expire: 'expire',
};

function OtpCard() {
  const [form] = Form.useForm();
  const [otp, setOtp] = useState('');
  const [t] = useTr();

  const [timeLeft, setTimeLeft] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const resetErrorMessage = useWidgetStore((s) => s.resetErrorMessage);
  const { setMessage, setActiveStep, setFormValues, formValues, state } = useWidgetStore((state) => state);
  const { data: stateCardList, mutate: mutateCardList, isPending: cardListLoading } = useCardListMutation();
  const { data: stateCardOtp, mutate: mutateCardOtp, isPending: cardOtpLoading, error } = useCardOtpMutation();
  const { data: stateCardVerify, mutate: mutateCardVerify, isPending: cardVerifyLoading } = useCardVerifyMutation();
  const yearInputRef = useRef<InputRef>(null);
  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 2) {
      yearInputRef.current?.focus();
    }
  };
  const onFinish = async (values) => {
    await setFormValues({
      ...values,
    });
    await form.validateFields();
    const expDate =
      values?.expireMonth && values?.expireYear ? `${values?.expireMonth}${values?.expireYear}` : undefined;
    const params: CardVerifyParams = {
      panNo: values?.cardNumber,
      cvv2: values?.cvv2,
      expDate,
      otp: values?.password,
    };
    values?.password && mutateCardVerify(params);
  };

  useEffect(() => {
    if (stateCardVerify && stateCardVerify.includes('Authenticated successfully')) {
      window.location.href = '/home';
    }
  }, [stateCardVerify]);

  useEffect(() => {
    error && setTimeLeft(0);
  }, [error]);

  useEffect(() => {
    form.setFieldsValue({ ...formValues });
    // setActiveStep(0);
  }, [form, formValues]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCounting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsCounting(false);
    }
    return () => clearInterval(timer);
  }, [isCounting, timeLeft]);

  const handleSendPassword = async () => {
    if (isCounting) return;

    const values = form.getFieldsValue();

    const expDate =
      values?.expireMonth && values?.expireYear ? `${values?.expireMonth}${values?.expireYear}` : undefined;

    await setFormValues({
      ...formValues,
      ...values,
      expDate,
      panNo: values?.cardNumber,
    });

    setHasRequested(true);
    setTimeLeft(120);
    setIsCounting(true);

    const params: CardOtpParams = {
      panNo: values.cardNumber,
      cvv2: values.cvv2,
      expDate,
    };
    mutateCardOtp(params);
  };

  useEffect(() => {
    const params: CardListParams = {
      userSSN: formValues?.ssn,
    };
    mutateCardList(params);
  }, []);

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const returnFunction = () => {
    state.page = PageKind.OTP;
    setActiveStep(state.page);
  };

  const formatCardNumber = (num?: string) =>
    (num || '')
      .toString()
      .replace(/\s+/g, '')
      .replace(/(.{4})/g, '$1-')
      .replace(/-$/, '');

  return (
    <Form form={form} onFinish={onFinish} layout='vertical' name='card-information'>
      <div className='top-form'>
        <p className='title'>{t('login.soda_system')}</p>
        <p className='description'>{t('card.description')}</p>
      </div>

      <S.SubmitWrapper>
        <div>
          <Form.Item
            label={t('field.card_number')}
            name={FORM_ITEM_NAMES.cardNumber}
            rules={[{ required: true, message: t('error.required') }]}
          >
            <Select
              showSearch
              allowClear
              placeholder={t('placeholder.card_number')}
              filterOption={false}
              style={{ minWidth: 200 }}
              loading={cardListLoading}
              options={
                stateCardList?.map((card) => ({
                  value: card.CardNumber,
                  label: formatCardNumber(card.CardNumber),
                })) || []
              }
            />
          </Form.Item>

          <Form.Item
            label={t('field.cvv2')}
            name={FORM_ITEM_NAMES.cvv2}
            rules={[
              { required: true, message: t('error.required') },
              { min: 3, max: 4, message: t('cvv2.length_error') },
            ]}
          >
            <Input type='password' allow='number' placeholder={t('placeholder.cvv2')} minLength={3} maxLength={4} />
          </Form.Item>

          <Form.Item name={FORM_ITEM_NAMES.expire} label={t('field.expire')} required>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Form.Item
                name='expireMonth'
                noStyle
                rules={[
                  { required: true, message: t('error.required') },
                  { min: 2, max: 2, message: t('expire.length_error') },
                  {
                    pattern: /^(0[1-9]|1[0-2])$/,
                    message: t('error.expired_card'),
                  },
                ]}
              >
                <Input onChange={handleMonthChange} maxLength={2} placeholder={t('placeholder.month')} />
              </Form.Item>
              <Form.Item
                name='expireYear'
                noStyle
                rules={[
                  { required: true },
                  { min: 2, max: 2, message: t('') },
                  {
                    pattern: /^(0[4-9]|1[0-2])$/,
                    message: t(''),
                  },
                ]}
              >
                <Input ref={yearInputRef} maxLength={2} placeholder={t('placeholder.year')} />
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item
            label={t('field.password')}
            name={FORM_ITEM_NAMES.password}
            rules={[
              { required: true, message: t('error.required') },
              { min: 5, max: 7, message: t('password.length_error') },
            ]}
          >
            <div className='password'>
              <Input allow='number' placeholder={t('placeholder.password')} minLength={5} maxLength={7} />
              <Button
                loading={cardOtpLoading}
                className='password-button'
                onClick={handleSendPassword}
                disabled={isCounting}
              >
                {isCounting ? formatTime(timeLeft) : hasRequested ? t('button.retry') : t('card.password')}
              </Button>
            </div>
          </Form.Item>
        </div>
      </S.SubmitWrapper>

      <S.ButtonOtp>
        <Button loading={cardVerifyLoading} htmlType='submit' type='primary' size='large' block className='button'>
          {t('button.login')}
        </Button>
        <Button type='link' className='button' onClick={returnFunction}>
          {t('button.return')}
        </Button>
      </S.ButtonOtp>
    </Form>
  );
}

export default OtpCard;
