import { Divider, Form } from 'antd';
import { useTr } from '@branch-services/translation';
import { Box, Button, EmptyData, Input, Loading, SearchItemsContainer } from '@branch-services/ui-kit';
import React, { Fragment, useEffect } from 'react';
import { InfoItemType } from '../../../utils/types';
import { CustomMessageBox, HeaderWrapper } from './national-id.style';
import { getValueOrDash } from '@branch-services/utils';
import useAgentManagementWidgetStore from '../../../store/use-widget-store';
import { StepRoute } from '../../../utils/enums';
import 'swiper/css';
import 'swiper/css/pagination';
import { ActionButtonsContainer, FinalConfirmationStyle, FinalFormWrapper } from '../stepper.style';
import { checkNationalCode } from '../../../utils/utils';
import useGetSsnInformationQuery from '../../../queries/use-get-ssn-information-query';
import useGetAgentInformationQuery from '../../../queries/use-get-agent-information-query';
import ReceiverBox from '../receiver-box/receiver-box';

const FORM_ITEM_NAMES = {
  SSN: 'SSN',
};

function NationalId() {
  const [t] = useTr();
  const [form] = Form.useForm();
  const { setStep, setFilter, userInfo } = useAgentManagementWidgetStore();

  const { refetch: refetchUserSsn, data: ssnInfoData, isFetching } = useGetSsnInformationQuery();
  const {
    isFetching: agentInformationIsFetching,
    data: agentInformationData,
    refetch: refetchAgentInformation,
  } = useGetAgentInformationQuery();

  useEffect(() => {
    if (userInfo && userInfo?.SSN) {
      refetchAgentInformation();
    }
  }, [refetchAgentInformation, userInfo, userInfo?.SSN]);

  const handleChangeStep = () => {
    setStep(StepRoute.ORGANIZATION_ID);
  };

  useEffect(() => {
    form.setFieldValue(FORM_ITEM_NAMES?.SSN, userInfo?.SSN);
  }, []);

  function prepareResult(data: any) {
    const result: InfoItemType[] = [];

    result.push({
      type: 'header',
      title: t('national_Id_information'),
      line: false,
    });
    result.push({
      type: 'item',
      title: t('full_name'),
      value: `${getValueOrDash(data?.FirstName)?.toString().trim()} ${getValueOrDash(data?.LastName)
        ?.toString()
        .trim()}`,
    });
    result.push({
      type: 'item',
      title: t('national_Id'),
      value: getValueOrDash(data?.SSN),
    });

    return result;
  }

  const result = userInfo ? prepareResult(userInfo) : null;

  const displayButtons = () => {
    return (
      <ActionButtonsContainer>
        <Button size='large' type='default' className={'cancel-form__button'} onClick={() => window.location.reload()}>
          {t('button.cancel')}
        </Button>
        <Button size='large' type='primary' className={'continue-form__button'} onClick={handleChangeStep}>
          {t('submit_new_agent')}
        </Button>
      </ActionButtonsContainer>
    );
  };

  const onFinish = async (value) => {
    await setFilter(value);
    refetchUserSsn();
  };

  function validateNationalCode(_, value) {
    if (value && !checkNationalCode(value)) {
      return Promise.reject(t('validation.national_code_error'));
    }
    return Promise.resolve();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <CustomMessageBox message={t('guide_message_box')} />
        <SearchItemsContainer>
          <Form.Item
            className={'half-width'}
            layout='vertical'
            label={t('national_Id')}
            name={FORM_ITEM_NAMES.SSN}
            rules={[
              {
                required: true,
                message: t('validation.required'),
              },
              { validator: validateNationalCode },
            ]}
          >
            <Input allowClear allow={'number'} maxLength={10} placeholder={t('enter_national_Id')} />
          </Form.Item>
          <Box gap={0} className={'half-width buttons-container'}>
            <Button htmlType='submit' type='primary' loading={isFetching}>
              {t('search')}
            </Button>
          </Box>
        </SearchItemsContainer>

        {userInfo ? (
          <>
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

            <>
              <HeaderWrapper>
                <div className='heading'>
                  <span className='section__title'>{t('agent_information')}</span>
                  <Divider className='divider' type='horizontal' orientation='left' dashed={true} />
                  <Button size='large' type='primary' className={'continue-form__button'} onClick={handleChangeStep}>
                    {t('submit_new_agent')}
                    <i className='ri-add-large-line' />
                  </Button>
                </div>
              </HeaderWrapper>
            </>
            {agentInformationIsFetching ? (
              <Loading />
            ) : agentInformationData?.length > 0 ? (
              <ReceiverBox data={agentInformationData} />
            ) : (
              <EmptyData />
            )}
          </>
        ) : (
          <div
            style={{
              display: 'flex',
              marginTop: '4.8rem',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <EmptyData />
          </div>
        )}
      </Form>
      {/*{userInfo && (*/}
      {/*  <div>*/}
      {/*    <Box>{displayButtons()}</Box>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
}

export default NationalId;
