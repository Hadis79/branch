'use client';

import React, { useEffect, useMemo } from 'react';
import { useWidgetStore } from '../../store';
import { MessageBox, Steps } from '@branch-services/ui-kit';
import { FILE_DETAILS_PAGE_URL, PageRoute, RequestStatus } from '../../utils/consts';
import { useTr } from '@branch-services/translation';
import { usePathname, useSearchParams } from 'next/navigation';
import SubmitRequestStep from '../submit-request/submit-request-step';
import UploadFile from '../upload-file/upload-file';
import FinalConfirmationStep from '../final-confirmation/final-confirmation-step';
import * as S from '../app/app.style';
import { useResponsive } from '@branch-services/hooks';
import useClientSsn from '../submit-request/clientSsn';

function StepperComponent() {
  const [t] = useTr();
  const pathname = usePathname();
  const { isMobileOrTablet } = useResponsive();
  const { message, resetMessage, activeStep, setActiveStep, statusRequest, CreateRequestResponse } = useWidgetStore(
    (state) => state
  );
  const searchParams = useSearchParams();
  const currentStep = searchParams.get('step') || PageRoute.SUBMIT;
  const clientSsn = useClientSsn();

  const stepIndexMap = useMemo(
    () => ({
      [PageRoute.SUBMIT]: 0,
      [PageRoute.UPLOAD_FILE]: 1,
      [PageRoute.FINAL_CONFIRMATION]: 2,
    }),
    []
  );

  useEffect(() => {
    const targetStep = stepIndexMap[currentStep] ?? 0;

    if (activeStep !== targetStep) {
      setActiveStep(0);

      window.history.pushState({}, '', `${pathname}?step=${PageRoute.SUBMIT}`);
    }
  }, [currentStep]);

  const stepComponents = [
    {
      key: 'submit',
      component: <SubmitRequestStep clientSsn={clientSsn} />,
    },
    {
      key: 'uploadFile',
      component: <UploadFile />,
    },
    { key: 'finalConfirmation', component: <FinalConfirmationStep /> },
  ];

  const memoizedItems = [
    { key: PageRoute.SUBMIT, title: t(PageRoute.SUBMIT) },
    { key: PageRoute.UPLOAD_FILE, title: t(PageRoute.UPLOAD_FILE) },
    { key: PageRoute.FINAL_CONFIRMATION, title: t(PageRoute.FINAL_CONFIRMATION) },
  ];

  return (
    <>
      <S.AppContainer>
        <S.MainPanel>
          {message && !isMobileOrTablet && (
            <MessageBox
              message={message?.shouldTranslate ? t(message?.txt) : message?.txt}
              type={message.type}
              subErrors={message?.subErrors}
              closable
              shouldScroll
              style={{ marginBottom: '2rem', marginTop: '1rem' }}
              linkProps={
                message?.linkProps && {
                  title: message.linkProps.title,
                  url: message.linkProps.url,
                }
              }
              onClose={resetMessage}
            />
          )}

          {pathname !== FILE_DETAILS_PAGE_URL && (
            <>
              <>
                {statusRequest !== RequestStatus.SUCCESS && !isMobileOrTablet && (
                  <Steps items={memoizedItems} current={activeStep} responsive={true} />
                )}
                {statusRequest === RequestStatus.SUCCESS && !isMobileOrTablet && (
                  <S.TraceCode>
                    <div className='code'>
                      {t('trace_code')}: <span className='trace'>{CreateRequestResponse}</span>
                    </div>
                    <div>{t('trace_code_final')}</div>
                  </S.TraceCode>
                )}
                {stepComponents[activeStep]?.component}
              </>
            </>
          )}
        </S.MainPanel>
      </S.AppContainer>
    </>
  );
}

export default StepperComponent;
