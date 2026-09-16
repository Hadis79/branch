'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useWidgetStore } from '../../store';
import { Box, MessageBox, Steps } from '@branch-services/ui-kit';
import { FILE_DETAILS_PAGE_URL, PageRoute, RequestStatus } from '../../utils/consts';
import { useTr } from '@branch-services/translation';
import { usePathname, useSearchParams } from 'next/navigation';
import SubmitRequestStep from '../submit-request/submit-request-step';
import UploadFile from '../upload-file/upload-file';
import FinalConfirmationStep from '../final-confirmation/final-confirmation-step';
import * as S from '../app/app.style';
import { useResponsive } from '@branch-services/hooks';
import ValidationStep from '../validation-step/validation-step';
import RequestDraft from '../request-draft/request-draft';
import useCheckValidationQuery from '../../queries/use-check-validation-query';
import useEvictCacheMutation from '../../queries/use-evict-cache-mutation';
import useClientSsn from '../submit-request/clientSsn';
import { Spin } from 'antd';

function StepperComponent() {
  const [t] = useTr();
  const pathname = usePathname();
  const { isMobileOrTablet } = useResponsive();
  const {
    message,
    resetMessage,
    activeStep,
    setActiveStep,
    statusRequest,
    CreateRequestResponse,
    evictCache,
    uploadResponse,
    setOpenNewRequestSheet,
    resetValidate,
    resetUploadFileForm,
    resetFormValues,
    setCreateRequestResponse,
    setEvictCache,
    checkValidationResponse,
  } = useWidgetStore((state) => state);
  const { mutate: evictUserCacheMutation, isPending } = useEvictCacheMutation();
  const searchParams = useSearchParams();
  const currentStep = searchParams.get('step') || PageRoute.SUBMIT;
  const clientSsn = useClientSsn();
  const [showUploadDraft, setShowUploadDraft] = useState(false);

  const { isLoading, error, data, manualFetch, isFetching } = useCheckValidationQuery(clientSsn);

  const stepIndexMap = useMemo(
    () => ({
      [PageRoute.SUBMIT]: 0,
      [PageRoute.UPLOAD_FILE]: 1,
      [PageRoute.VALIDATE]: 2,
      [PageRoute.FINAL_CONFIRMATION]: 3,
    }),
    []
  );

  function usePrevious<T>(value: T) {
    const ref = useRef<T | undefined>(undefined);

    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  }

  const prevClientSsn = usePrevious(clientSsn);
  const prevRequestId = usePrevious(checkValidationResponse?.requestId);

  const clientChangedRef = useRef(false);

  useEffect(() => {
    const targetStep = stepIndexMap[currentStep] ?? 0;

    if (activeStep !== targetStep) {
      setActiveStep(0);

      // router.push(`${pathname}?step=${PageRoute.SUBMIT}`);
      window.history.pushState({}, '', `${pathname}?step=${PageRoute.SUBMIT}`);
    }
  }, [currentStep]);

  useEffect(() => {
    setShowUploadDraft(false);
  }, []);

  useEffect(() => {
    if (activeStep === 1) {
      if (data === '' && prevClientSsn !== clientSsn) {
        setActiveStep(0);
        resetFormValues();
        resetUploadFileForm();
        resetValidate();
        window.history.pushState({}, '', `${pathname}?step=${PageRoute.SUBMIT}`);
        setOpenNewRequestSheet(false);
      }
    }

    if (activeStep === 2) {
      const ssnChanged = prevClientSsn !== undefined ? prevClientSsn !== clientSsn : false;
      if (data === '' && (uploadResponse ? ssnChanged : !ssnChanged)) {
        setActiveStep(0);
        resetFormValues();
        resetUploadFileForm();
        resetValidate();
        window.history.pushState({}, '', `${pathname}?step=${PageRoute.SUBMIT}`);
        setOpenNewRequestSheet(false);
      }
    }

    if (activeStep === 3) {
      if (data === '' || statusRequest === RequestStatus.SUCCESS || statusRequest === RequestStatus.TRY_AGAIN) {
        setActiveStep(0);
        resetFormValues();
        resetUploadFileForm();
        resetValidate();
        window.history.pushState({}, '', `${pathname}?step=${PageRoute.SUBMIT}`);
        setOpenNewRequestSheet(false);
      } else {
        setActiveStep(2);
        resetUploadFileForm();
        resetValidate();
        window.history.pushState({}, '', `${pathname}?step=${PageRoute.VALIDATE}`);
        setOpenNewRequestSheet(false);
      }
    }

    if (activeStep === 0) {
      if (data || Boolean(checkValidationResponse?.requestId)) {
        setCreateRequestResponse(undefined);
        setEvictCache(false);
      }
    }
  }, [clientSsn, data || Boolean(checkValidationResponse?.requestId)]);

  useEffect(() => {
    if (activeStep !== 1) return;
    const ssnChanged = prevClientSsn !== undefined ? prevClientSsn !== clientSsn : false;
    const checkChanged = prevRequestId !== checkValidationResponse?.requestId;
    if (ssnChanged) {
      clientChangedRef.current = true;
    }

    if (checkChanged && clientChangedRef?.current) {
      setShowUploadDraft(true);
      clientChangedRef.current = false;
    } else {
      setShowUploadDraft(false);
    }
  }, [clientSsn, checkValidationResponse]);

  useEffect(() => {
    const ssnChanged = prevClientSsn !== undefined ? prevClientSsn !== clientSsn : false;

    if (
      !ssnChanged &&
      data &&
      (data?.successValidationCount === 0 || data?.successValidationCount === null) &&
      !data?.fileUploadDto?.success &&
      (data?.errorValidationCount === 0 || data?.errorValidationCount === null)
    ) {
      evictUserCacheMutation();
    }
  }, [clientSsn, data || Boolean(checkValidationResponse?.requestId)]);

  if (isLoading) return null;

  const hasDraft = data;

  const showSubmitDraft = hasDraft && !evictCache && !CreateRequestResponse;

  const stepComponents = [
    {
      key: 'submit',
      component: showSubmitDraft ? (
        isFetching ? (
          <Spin />
        ) : (
          <RequestDraft />
        )
      ) : isFetching ? (
        <Spin />
      ) : (
        <SubmitRequestStep clientSsn={clientSsn} />
      ),
    },
    {
      key: 'uploadFile',
      component: showUploadDraft ? isFetching ? <Spin /> : <RequestDraft /> : isFetching ? <Spin /> : <UploadFile />,
    },
    { key: 'validate', component: isFetching && data?.finished ? <Spin /> : <ValidationStep /> },
    { key: 'finalConfirmation', component: <FinalConfirmationStep /> },
  ];

  // const stepComponents = useMemo(
  //   () => [
  //     {
  //       key: 'submit',
  //       component:
  //         data && !evictCache && !CreateRequestResponse ? (
  //           <RequestDraft />
  //         ) : (
  //           <SubmitRequestStep clientSsn={clientSsn} />
  //         ),
  //     },
  //     {
  //       key: 'uploadFile',
  //       component:
  //         data && !evictCache && !CreateRequestResponse && uploadResponse === null ? <RequestDraft /> : <UploadFile />,
  //     },
  //     { key: 'validate', component: <ValidationStep /> },
  //     { key: 'finalConfirmation', component: <FinalConfirmationStep /> },
  //   ],
  //   [data, evictCache, CreateRequestResponse, clientSsn]
  // );

  const memoizedItems = [
    { key: PageRoute.SUBMIT, title: t(PageRoute.SUBMIT) },
    { key: PageRoute.UPLOAD_FILE, title: t(PageRoute.UPLOAD_FILE) },
    { key: PageRoute.VALIDATE, title: t(PageRoute.VALIDATE) },
    { key: PageRoute.FINAL_CONFIRMATION, title: t(PageRoute.FINAL_CONFIRMATION) },
  ];

  return (
    <>
      <S.AppContainer draft={data && activeStep !== 2}>
        <S.MainPanel draft={data && activeStep !== 2}>
          {message && (
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
                {statusRequest !== RequestStatus.SUCCESS &&
                  !isMobileOrTablet &&
                  (!(data && activeStep !== 2) || evictCache) && (
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
