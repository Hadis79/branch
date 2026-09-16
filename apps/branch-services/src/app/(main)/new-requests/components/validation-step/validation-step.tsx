// import ValidationResult from './validation-result/validation-result';
// import { ActionButtonsContainer, ContentWrapper } from '../../styles';
// import { ReactComponent as WarningIcon } from '../../assets/media/alert-warning.svg';
// import { PageKind } from '../../utils/consts';
// import TimerComponent from './timer/timer';
//
import { Box, Button, Progress } from '@branch-services/ui-kit';
import useNewRequestsWidgetStore from '../../store/use-widget-store';
import { PageKind } from '../../utils/enums';
import { useTr } from '@branch-services/translation';
import useCheckValidationQuery from '../../queries/use-check-validation-query';
import { calculateValidationPercent } from '../../utils/utils';
import TimerComponent from './timer/timer';
import * as S from './validation-step.style';
import ValidationResult from './validation-result/validation-result';
import React from 'react';
import { Skeleton } from 'antd';

function ValidationStep() {
  const { setPageKind, resetFilter, validateResponse, checkValidationResponse, resetAll } = useNewRequestsWidgetStore();
  const [t] = useTr();
  const { isLoading, error } = useCheckValidationQuery();

  // const handleNextStep = () => {
  //   if (isMobileOrTablet) {
  //     changeStepsAction(dispatch, { current: 3 });
  //     updatePageKindAction(dispatch, PageKind.WITHDRAWAL_CONDITION);
  //   }
  // };

  return (
    <>
      <Box flexDirection='column'>
        {isLoading ? (
          <div>
            <Skeleton active round />
          </div>
        ) : (
          <>
            <S.BackButtonsContainer>
              <Button
                className='back-button'
                size='large'
                type='link'
                icon={<i className='ri-arrow-left-line'></i>}
                onClick={() => {
                  setPageKind(PageKind.HISTORY);
                  resetAll();
                }}
              >
                {t('back')}
              </Button>
            </S.BackButtonsContainer>
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

            {/*<NewRequestModal />*/}
          </>
        )}
      </Box>
    </>
  );
}

// return (
//   <>
//     <Button
//       onClick={() => {
//         setPageKind(PageKind.HISTORY);
//         resetFilter()
//       }}
//     >
//       {'hsitory'}
//     </Button>
//   </>
// );

export default ValidationStep;
