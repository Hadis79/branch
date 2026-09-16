// import ValidationResult from './validation-result/validation-result';
import { ActionButtonsContainer } from './validation-step.style';
// import { ReactComponent as WarningIcon } from '../../assets/media/alert-warning.svg';
// import { PageKind } from '../../utils/consts';
// import TimerComponent from './timer/timer';
//
import { BottomSheet, Box, Button, Progress } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';
import { calculateValidationPercent } from '../../utils/utils';
import TimerComponent from './timer/timer';
import * as S from './validation-step.style';
import ValidationResult from './validation-result/validation-result';
import React, { useEffect, useState } from 'react';
import { Skeleton } from 'antd';
import useWidgetStore from '../../store/use-widget-store';
import useCheckValidationQuery from '../../queries/use-check-validation-query';
import { PageRoute, RequestStatus } from '../../utils/consts';
import { usePathname } from 'next/navigation';
// import { ActionButtonsContainer } from '../app/app.style';
import { useResponsive } from '@branch-services/hooks';
import PreviosValidateModal from '../previous-validate-modal/previous-validate-modal';
import NewRequestModal from '../new-request-modal/new-request-modal';
import useEvictCacheMutation from '../../queries/use-evict-cache-mutation';
import FinalConfirmationStep from '../final-confirmation/final-confirmation-step';
import { ReactComponent as WarningIcon } from '../../assets/media/alert-warning.svg';

function ValidationStep() {
  const {
    setActiveStep,
    checkValidationResponse,
    setOpenFinalConfirmationStep,
    openFinalConfirmationStep,
    uploadResponse,
  } = useWidgetStore((state) => state);
  const [t] = useTr();
  const { isLoading, error, data } = useCheckValidationQuery();
  const {
    data: dataEvict,
    error: errorEvict,
    isPending: isPendingEvict,
    mutate: mutateEvict,
  } = useEvictCacheMutation();
  const [openPreviousValidateModal, setOpenPreviousValidateModal] = useState<boolean>(false);
  const [openNewRequestModal, setOpenNewRequestModal] = useState<boolean>(false);
  const pathname = usePathname();
  const { isMobileOrTablet } = useResponsive();
  // const handleNextStep = () => {
  //   if (isMobileOrTablet) {
  //     changeStepsAction(dispatch, { current: 3 });
  //     updatePageKindAction(dispatch, PageKind.WITHDRAWAL_CONDITION);
  //   }
  // };
  const handleOnClickNewRequest = () => {
    setOpenNewRequestModal(true);
  };

  useEffect(() => {
    if (dataEvict) {
      setOpenPreviousValidateModal(false);
      setOpenNewRequestModal(false);
    }
  }, [dataEvict]);

  const previousValidateModalFooter = () => {
    return (
      <S.BoxButtons>
        <Button
          style={{ width: '10rem' }}
          type='primaryOutlined'
          onClick={() => {
            setOpenPreviousValidateModal(false);
          }}
        >
          {t('reject')}
        </Button>
        <Button
          style={{ width: '10rem' }}
          type='primary'
          danger={true}
          loading={isPendingEvict}
          onClick={() => {
            mutateEvict(uploadResponse?.id);
          }}
        >
          {t('cancel_processing')}
        </Button>
      </S.BoxButtons>
    );
  };

  const Confirmation = () => {
    if (isMobileOrTablet) {
      setOpenFinalConfirmationStep(true);
    } else {
      setActiveStep(3);
      window.history.pushState({}, '', `${pathname}?step=${PageRoute.FINAL_CONFIRMATION}`);
    }
  };

  const NewRequestModalFooter = () => {
    return (
      <S.BoxButtons>
        <Button
          style={{ width: '10rem' }}
          type='primaryOutlined'
          onClick={() => {
            setOpenNewRequestModal(false);
          }}
        >
          {t('reject')}
        </Button>
        <Button
          style={{ width: '12rem' }}
          type='primary'
          danger={true}
          loading={isPendingEvict}
          onClick={() => {
            mutateEvict(uploadResponse?.id);
          }}
        >
          {t('button.new_request')}
        </Button>
      </S.BoxButtons>
    );
  };

  return (
    <>
      <Box flexDirection='column'>
        {isLoading ? (
          <div>
            <Skeleton active round />
          </div>
        ) : (
          <>
            <ValidationResult>
              <Progress
                title={checkValidationResponse?.finished ? t('completion') : ''}
                strokeWidth={8}
                percent={calculateValidationPercent(checkValidationResponse)}
              />
              <TimerComponent
                counter={checkValidationResponse?.finished ? 0 : checkValidationResponse?.successValidationCount}
                totalRecord={checkValidationResponse?.totalRecords}
              />
            </ValidationResult>

            {!(checkValidationResponse?.finished && checkValidationResponse?.errorValidationCount) ? (
              <ActionButtonsContainer>
                <Button
                  size='large'
                  type='default'
                  onClick={() => {
                    setOpenPreviousValidateModal(true);
                  }}
                >
                  {t('previous')}
                </Button>
                <Button
                  onClick={Confirmation}
                  disabled={!checkValidationResponse?.finished}
                  size='large'
                  type='primary'
                >
                  {t('button.continue')}
                </Button>
              </ActionButtonsContainer>
            ) : (
              <ActionButtonsContainer>
                <Box className='button_container'>
                  <Button
                    className={'new_request-form-button'}
                    type={'primaryOutlined'}
                    size={'large'}
                    onClick={handleOnClickNewRequest}
                  >
                    {t('new_request')}
                    <i className='ri-add-large-line'></i>
                  </Button>
                </Box>
              </ActionButtonsContainer>
            )}

            {isMobileOrTablet ? (
              <BottomSheet
                open={openPreviousValidateModal}
                initialHeight={220}
                onClose={() => setOpenPreviousValidateModal(false)}
              >
                <S.ModalWrapper>
                  <div className={'modal-wrapper__header'}>
                    <WarningIcon />
                    <p className={'modal-wrapper__title'}>{t('attention')}</p>
                  </div>

                  <div className='modal-wrapper__body'>
                    <p>{t('desc_modal')}</p>
                    <p>{t('finally_desc_modal')}</p>
                  </div>
                </S.ModalWrapper>
                {previousValidateModalFooter()}
              </BottomSheet>
            ) : (
              <PreviosValidateModal open={openPreviousValidateModal} footer={previousValidateModalFooter} />
            )}

            {isMobileOrTablet ? (
              <BottomSheet open={openNewRequestModal} initialHeight={220} onClose={() => setOpenNewRequestModal(false)}>
                <S.ModalWrapper>
                  <div className={'modal-wrapper__header'}>
                    <WarningIcon />
                    <p className={'modal-wrapper__title'}>{t('attention')}</p>
                  </div>

                  <div className='modal-wrapper__body'>{t('desc_new_request_modal')}</div>
                </S.ModalWrapper>
                {NewRequestModalFooter()}
              </BottomSheet>
            ) : (
              <NewRequestModal open={openNewRequestModal} footer={NewRequestModalFooter} />
            )}

            <BottomSheet
              open={openFinalConfirmationStep}
              initialHeight={630}
              onClose={() => setOpenFinalConfirmationStep(false)}
            >
              <FinalConfirmationStep></FinalConfirmationStep>
            </BottomSheet>
          </>
        )}
      </Box>
    </>
  );
}

export default ValidationStep;
