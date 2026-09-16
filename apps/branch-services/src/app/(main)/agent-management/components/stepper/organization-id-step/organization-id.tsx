import { useTr } from '@branch-services/translation';
import { Form } from 'antd';
import { Box, Button, EmptyData, Input, SearchItemsContainer } from '@branch-services/ui-kit';
import React, { Fragment, useEffect, useState } from 'react';
import { ActionButtonsContainer, FinalConfirmationStyle, FinalFormWrapper } from '../stepper.style';
import { InfoItemType } from '../../../utils/types';
import { getValueOrDash } from '@branch-services/utils';
import { StepRoute } from '../../../utils/enums';
import useAgentManagementWidgetStore from '../../../store/use-widget-store';
import ConfirmationModal from '../../modal/confirmation-modal/confirmation-modal';
import useGetLegalSsnInformationQuery from '../../../queries/use-get-legal-ssn-information-query';
import { isValidLegalId } from '../../../utils/utils';

const FORM_ITEM_NAMES = {
  ssn: 'ssn',
};

function OrganizationId() {
  const [t] = useTr();
  const [form] = Form.useForm();
  const { setStep, setFilter } = useAgentManagementWidgetStore();
  const [openConfirmationModal, setOpenConfirmationModal] = useState<boolean>(false);
  const { refetch: refetchUserSsn, data: legalSsnInfoData, isFetching } = useGetLegalSsnInformationQuery();
  useEffect(() => {
    form.setFieldValue(FORM_ITEM_NAMES?.ssn, legalSsnInfoData?.response?.customerInfo?.nationalId);
  }, []);

  function prepareResult(data) {
    const result: InfoItemType[] = [];

    result.push({
      type: 'header',
      title: t('company_information'),
      line: false,
    });
    result.push({
      type: 'item',
      title: t('company_name'),
      value: `${getValueOrDash(data?.name)?.toString().trim()}`,
    });
    result.push({
      type: 'item',
      title: t('organization_Id'),
      value: getValueOrDash(data?.nationalId),
    });
    return result;
  }

  const result = legalSsnInfoData?.response?.customerInfo && prepareResult(legalSsnInfoData?.response?.customerInfo);

  const handleChangeStep = () => {
    if (legalSsnInfoData?.response?.customerInfo) {
      setOpenConfirmationModal(true);
    } else {
      form.validateFields({});
    }
  };

  const displayButtons = () => {
    return (
      <ActionButtonsContainer>
        <Button
          size='large'
          type='default'
          className={'cancel-form__button'}
          onClick={() => setStep(StepRoute.NATIONAL_ID)}
        >
          {t('button.previous')}
        </Button>
        <Button size='large' type='primary' className={'continue-form__button'} onClick={handleChangeStep}>
          {t('add_agent')}
        </Button>
      </ActionButtonsContainer>
    );
  };

  const onFinish = async (values) => {
    await setFilter(values);
    refetchUserSsn();
  };
  function validateLegalId(_, value) {
    if (value && !isValidLegalId(value)) {
      return Promise.reject(t('validation.legal_id_error'));
    }
    return Promise.resolve();
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <div style={{ fontWeight: 500, marginBottom: '2.4rem' }}>{t('enter_organization_Id')}</div>
        <SearchItemsContainer>
          <Form.Item
            className={'half-width'}
            layout='vertical'
            label={t('organization_Id')}
            name={FORM_ITEM_NAMES.ssn}
            rules={[
              {
                required: true,
                message: t('validation.required'),
              },
              { validator: validateLegalId },
            ]}
          >
            <Input allowClear allow={'number'} maxLength={12} placeholder={t('enter_organization_Id')} />
          </Form.Item>
          <Box gap={0} className={'half-width buttons-container'}>
            <Button htmlType='submit' type='primary' loading={isFetching}>
              {t('search')}
            </Button>
          </Box>
        </SearchItemsContainer>

        {legalSsnInfoData ? (
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
          </>
        ) : (
          <div style={{ marginTop: '4.8rem' }}>
            <EmptyData />
          </div>
        )}
        <ConfirmationModal open={openConfirmationModal} setOpen={setOpenConfirmationModal} />
      </Form>
      <Box className='footer_container'>{displayButtons()}</Box>
    </div>
  );
}

export default OrganizationId;
