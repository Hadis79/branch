import { Box, Button } from '@branch-services/ui-kit';
import { FinalConfirmationStyle, FinalFormWrapper } from './final-confirmation-step.style';

import { useTr } from '@branch-services/translation';
import { Fragment } from 'react';
import { dateLocale, getValueOrDash } from '@branch-services/utils';
import { InfoItemType } from '../../../utils/types';
import { ActionButtonsContainer } from '../stepper.style';
import useAgentManagementWidgetStore from '../../../store/use-widget-store';

const FinalConfirmationStep = () => {
  const [t] = useTr();
  const { agentResponse, resetAll } = useAgentManagementWidgetStore();

  function prepareResult(detail) {
    const result: any[] = [];

    result.push({
      type: 'header',
      title: t('agent_information'),
      line: false,
    });
    result.push({
      type: 'item',
      title: t('full_name'),
      value: getValueOrDash(detail?.branchAgentName),
    });
    result.push({
      type: 'item',
      title: t('national_Id'),
      value: getValueOrDash(detail?.branchAgentSsn),
    });

    result.push({
      type: 'header',
      title: t('company_information'),
      line: true,
    });
    result.push({
      type: 'item',
      title: t('company_name'),
      value: getValueOrDash(detail?.orgAgentName),
    });
    result.push({
      type: 'item',
      title: t('organization_Id'),
      value: getValueOrDash(detail?.orgAgentSsn),
    });

    result.push({
      type: 'header',
      title: t('submit_information'),
      line: true,
    });
    result.push({
      type: 'item',
      title: t('submitter'),
      value: getValueOrDash(detail?.userName),
    });
    result.push({
      type: 'item',
      title: t('branch'),
      value: getValueOrDash(` ${detail.branchCode} - ${detail.branchName}`),
    });
    result.push({
      type: 'item',
      title: t('register_date'),
      value: getValueOrDash(dateLocale(detail?.delegationDate)),
    });

    return result;
  }

  const result = prepareResult(agentResponse);

  const handleOnClickNewRequest = () => {
    resetAll();
  };
  const displayButtons = () => {
    return (
      <ActionButtonsContainer>
        <Box className='button_container'>
          <Button
            className={'new_request-form-button'}
            type={'primaryOutlined'}
            size={'large'}
            onClick={handleOnClickNewRequest}
          >
            {t('add_new_agent')}
            <i className='ri-add-large-line' />
          </Button>
        </Box>
      </ActionButtonsContainer>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90%' }}>
      <FinalFormWrapper name='submit_charge_request'>
        <FinalConfirmationStyle>
          <Box flexDirection={'column'} className='final-confirmation__container'>
            {result?.map((item: InfoItemType, index: number) => {
              const infoHeader =
                item.type === 'header' ? (
                  <div className='info-header'>
                    {item.title}
                    {item.line ? (
                      <div className='line'>
                        <span />
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : null;

              const infoItem = item.type.startsWith('item') ? (
                <>
                  <span className='info-item__title'>{item.title}</span>
                  <span className='info-item__value'>{item.value}</span>
                </>
              ) : null;

              return (
                <Fragment key={item.title + '-' + index}>
                  {infoHeader}
                  {infoItem}
                </Fragment>
              );
            })}
          </Box>
        </FinalConfirmationStyle>
      </FinalFormWrapper>
      <Box className='footer_container'>{displayButtons()}</Box>
    </div>
  );
};

export default FinalConfirmationStep;
