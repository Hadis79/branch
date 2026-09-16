'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useWidgetStore } from '../../store';
import { Button, MessageBox, Steps } from '@branch-services/ui-kit';
import { FILE_DETAILS_PAGE_URL, PageRoute } from '../../utils/consts';
import { useTr } from '@branch-services/translation';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SubmitRequestStep from '../submit-request/submit-request-step';
import UploadFile from '../upload-file/upload-file';
import FinalConfirmationStep from '../final-confirmation/final-confirmation-step';
import { ReactComponent as Soul } from '../../assets/media/soul.svg';
import { SoulWrapper } from '../submit-request/submit-request-step.style';

function StepperComponent() {
  const [t] = useTr();
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { message, resetMessage, activeStep, setActiveStep } = useWidgetStore((state) => state);

  const searchParams = useSearchParams();
  const currentStep = searchParams.get('step') || PageRoute.SUBMIT;

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

      // router.push(`${pathname}?step=${PageRoute.SUBMIT}`);
      window.history.pushState({}, '', `${pathname}?step=${PageRoute.SUBMIT}`);
    }
  }, [currentStep]);

  const stepComponents = useMemo(
    () => [
      { key: 'submit', component: <SubmitRequestStep /> },
      { key: 'uploadFile', component: <UploadFile /> },
      { key: 'finalConfirmation', component: <FinalConfirmationStep /> },
    ],
    []
  );

  const memoizedItems = useMemo(
    () => [
      { key: PageRoute.SUBMIT, title: t(PageRoute.SUBMIT) },
      { key: PageRoute.UPLOAD_FILE, title: t(PageRoute.UPLOAD_FILE) },
      { key: PageRoute.FINAL_CONFIRMATION, title: t(PageRoute.FINAL_CONFIRMATION) },
    ],
    [t]
  );
  const handleRedirect = () => {
    setLoading(true);
    router.push('/new-requests');
  };
  return (
    <>
      {/*{message && (*/}
      {/*  <MessageBox*/}
      {/*    message={message?.shouldTranslate ? t(message?.txt) : message?.txt}*/}
      {/*    type={message.type}*/}
      {/*    subErrors={message?.subErrors}*/}
      {/*    closable*/}
      {/*    shouldScroll*/}
      {/*    style={{ marginBottom: '2rem', marginTop: '1rem' }}*/}
      {/*    linkProps={*/}
      {/*      message?.linkProps && {*/}
      {/*        title: message.linkProps.title,*/}
      {/*        url: message.linkProps.url,*/}
      {/*      }*/}
      {/*    }*/}
      {/*    onClose={resetMessage}*/}
      {/*  />*/}
      {/*)}*/}

      {/*{pathname !== FILE_DETAILS_PAGE_URL && (*/}
      {/*  <>*/}
      {/*    <Steps items={memoizedItems} current={activeStep} responsive={true} />*/}

      {/*    {stepComponents[activeStep]?.component}*/}
      {/*  </>*/}
      {/*)}*/}
      <SoulWrapper>
        <Soul />
        <p className={'not-access'}>{t('not_access')}</p>
        <p className={'not-access__info'}>{t('submit_new_request_info')}</p>
        <Button
          type={'primary'}
          icon={<i className='ri-arrow-drop-left-line' />}
          onClick={handleRedirect}
          loading={loading}
        >
          {t('new_requests')}
        </Button>
      </SoulWrapper>
    </>
  );
}

export default StepperComponent;
