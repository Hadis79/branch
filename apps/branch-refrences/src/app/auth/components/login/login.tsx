import React, { useEffect } from 'react';
import * as S from './login.style';
import FormLogin from '../login-form/form';
import Image from 'next/image';
import { bankLogo, MessageBox, PageStepper, ThemeSwitch } from '@branch-services/ui-kit';
import { PageKind } from '../../utils/consts';
import useWidgetStore from '../../store/use-widget-store';
import { useTr } from '@branch-services/translation';
import OtpForm from '../otp-form/otp';
import OtpCard from '../card/card';
import { fullDateLocale } from '@branch-services/utils';
import { useConfig } from '@branch-services/hooks';
import useResetLoginMutation from '../../queries/use-reset-login-mutation';
import useCaptchaMutation from '../../queries/use-captcha-mutation';

function Login() {
  const [t] = useTr();
  const { config } = useConfig();
  const { setActiveStep, resetMessage, resetFormValues, state, message, timer, setTimer, activeStep, setPrevStep } =
    useWidgetStore((state) => state);
  const { data: stateCaptcha, mutate: mutateCaptcha, isPending: captchaLoading } = useCaptchaMutation();
  const resetErrorMessage = useWidgetStore((s) => s.resetErrorMessage);
  const { mutate: resetLogin } = useResetLoginMutation();
  useEffect(() => {
    state.page = PageKind.SUBMIT_INFORMATION;
  }, []);

  const TIMER_DURATION = 20 * 60 * 1000;

  const remainingTime = timer ? Math.max(0, TIMER_DURATION - (Date.now() - timer)) : null;

  useEffect(() => {
    if (remainingTime === 0) {
      resetMessage();
      resetFormValues();
      resetLogin(undefined, {
        onSettled: () => {
          setTimeout(() => {
            mutateCaptcha(undefined, {
              onSettled: () => setPrevStep(''),
            });
          }, 1000);
        },
      });
      setPrevStep(activeStep);
      setTimer(null);
      state.page = PageKind.SUBMIT_INFORMATION;
      setActiveStep(state.page);
    }
  }, [remainingTime]);

  const pageSteps = [
    {
      id: PageKind.SUBMIT_INFORMATION,
      component: <FormLogin dataCaptcha={stateCaptcha} loadingCaptcha={captchaLoading} />,
    },
    { id: PageKind.OTP, component: <OtpForm /> },
    { id: PageKind.CARD, component: <OtpCard /> },
  ];

  function showErrorMessage() {
    let _message: any = null;
    if (message) {
      _message = {};
      _message.linkProps = message?.linkProps;
      _message.type = message?.type;
      _message.txt = message?.shouldTranslate ? t(message?.txt ?? '') : message?.txt;
      _message.subErrors = message?.subErrors;
    }
    if (!_message) return <></>;
    return (
      <MessageBox
        type={_message.type}
        message={_message.txt}
        subErrors={_message?.subErrors}
        closable
        shouldScroll
        style={{ marginBottom: '2rem', marginTop: '1rem', minWidth: '43rem' }}
        onClose={(e) => resetErrorMessage()}
      />
    );
  }

  return (
    <>
      <S.Wrapper>
        <S.LoginWrapperTop>
          <div className='main'>
            <Image src={bankLogo} alt='Bank Melli' />
            <div className='child'>
              <span>{fullDateLocale(undefined, config.locale)}</span>
              <ThemeSwitch />
            </div>
          </div>
        </S.LoginWrapperTop>
        <S.LoginWrapperDown />
      </S.Wrapper>
      <S.FormLogin pageKind={state.page as PageKind}>
        {showErrorMessage()}
        <PageStepper steps={pageSteps} active={state.page} />
      </S.FormLogin>
    </>
  );
}

export default Login;
