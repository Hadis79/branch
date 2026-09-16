'use client';

import * as S from './components/app/app.style';
import React, { useEffect, useState } from 'react';
import StepperComponent from './components/stepper/stepper';
import { useWidgetStore } from './store';
import { useSearchParams } from 'next/navigation';
import { PageRoute, RequestStatus } from './utils/consts';
import { FileDetailsTable } from '@branch-services/components';
import { withdrawalTypesEnum } from './utils/types';
import { useTr } from '@branch-services/translation';

function Page() {
  const {
    activeWithdrawalType,
    activeStep,
    statusRequest,
    resetFormValues,
    setCancelUpload,
    resetUploadFileForm,
    resetRequestStatus,
  } = useWidgetStore((state) => state);

  const [chequeMethodMood, setChequeMethodMood] = useState(false);
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  const [t] = useTr();

  useEffect(() => {
    resetFormValues();
    resetUploadFileForm();
    resetRequestStatus();
    setCancelUpload();
  }, []);

  useEffect(() => {
    setChequeMethodMood(activeWithdrawalType === withdrawalTypesEnum.CHEQUE_METHOD);
  }, [activeWithdrawalType]);

  return (
    <S.AppContainer>
      {statusRequest !== RequestStatus.SUCCESS && activeStep === 2 && chequeMethodMood && (
        <S.CustomMessageBox message={t('final_message_transfer_by_cheque')} type={'warning'} closable={false} />
      )}
      {step !== PageRoute.FILE_DETAILS ? (
        <StepperComponent />
      ) : (
        <FileDetailsTable
          id={window.history.state?.id as string}
          ssn={window.history.state?.ssn as string}
          serviceUrl='details'
        />
      )}
    </S.AppContainer>
  );
}

export default Page;
