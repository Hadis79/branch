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
    resetValidate,
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
    resetValidate();
  }, []);

  useEffect(() => {
    setChequeMethodMood(activeWithdrawalType === withdrawalTypesEnum.CHEQUE_METHOD);
  }, [activeWithdrawalType]);
  return (
    <S.AppContainer>
      {step !== PageRoute.FILE_DETAILS ? (
        <StepperComponent />
      ) : (
        <FileDetailsTable
          id={window.history.state?.id as string}
          ssn={window.history.state?.ssn as string}
          uploadFile={window.history.state?.uploadFile as boolean}
          queryStatus={window.history.state?.queryStatus as boolean}
          serviceUrl='details-ach'
        />
      )}
    </S.AppContainer>
  );
}

export default Page;
