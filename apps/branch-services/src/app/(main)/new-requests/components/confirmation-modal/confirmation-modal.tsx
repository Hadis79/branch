import { Box, Button, Input, MessageBox } from '@branch-services/ui-kit';
import * as S from './confirmation-modal.style';
import { useTr } from '@branch-services/translation';
import { Form } from 'antd';
import {
  addThousandSeparator,
  getValueOrDash,
  numberToPersian,
  removeCommas,
  rialToToman,
} from '@branch-services/utils';
import React, { useEffect, useState } from 'react';
import useNewRequestsWidgetStore from '../../store/use-widget-store';
import usePaymentLimitInquiryQuery from '../../queries/use-get-payment-limit-inquiry';
import { RequestStatus, RequestTypes } from '../../utils/enums';

const ConfirmationModal = (props) => {
  const { open, setOpen, handleOk } = props;
  const { historyData, statusRequest } = useNewRequestsWidgetStore((state) => state);
  const { data, isFetching } = usePaymentLimitInquiryQuery();
  const [form] = Form.useForm();
  const [showLetter, setShowLetter] = useState(true);
  const [t] = useTr();

  useEffect(() => {
    form.resetFields();
    setShowLetter(true);
  }, [open]);

  const handleCancel = () => {
    setOpen(false);
  };

  const isValidAmount = () => {
    const amountValue = form.getFieldValue('amount') && removeCommas(form.getFieldValue('amount'));
    return amountValue === historyData?.totalAmount;
  };

  const showMessageBox = () => {
    return (
      <MessageBox
        type={'warning'}
        message={t('request_sent_supervisor_out_of_working_hours')}
        shouldScroll
        style={{ margin: '0 0 1rem' }}
      />
    );
  };

  return (
    <S.ModalWrapper open={open} centered footer={null} closeIcon={false}>
      {data && data?.succeed === false && showMessageBox()}
      <div className='modal-wrapper__content'>
        <div className={'modal-wrapper__header'}>
          <i className='ri-error-warning-fill' />
          <p className={'modal-wrapper__title'}>{t('confirm_modal_title')}</p>
        </div>
        {historyData.requestType === RequestTypes.OFFLINE_ACH && statusRequest !== RequestStatus.SUCCESS && (
          <MessageBox
            message={t('ach_payment_before_approval_description')}
            type={'warning'}
            closable={false}
            shouldScroll
            showIcon={false}
          />
        )}
        <Box className='modal-wrapper__message'>{t('sure_to_confirm_request')}</Box>

        <div className={'modal-wrapper__transaction'}>
          <span>{t('transaction_balance')}</span>
          <span className='transaction-amount'>
            {getValueOrDash(addThousandSeparator(historyData?.totalAmount as number) + ' ' + t('common.rial'))} -
            <span> {`${numberToPersian(rialToToman(historyData?.totalAmount as number))} ${t('common.toman')}`}</span>
          </span>
        </div>

        <Form form={form} layout='vertical' name='confirm-batch-request' onFinish={handleOk}>
          <Form.Item
            name='amount'
            rules={[
              { required: true, message: t('error.required') },
              {
                validator: (_, value) => {
                  if (value && !isValidAmount()) {
                    setShowLetter(false);
                    return Promise.reject(new Error(t('error.amount_entered_not_match')));
                  }

                  setShowLetter(true);
                  return Promise.resolve('resolve');
                },
              },
            ]}
          >
            <Input.Money placeholder={t('enter_amount')} showLetter={showLetter} onClear={() => form.resetFields()} />
          </Form.Item>

          <Box alignSelf='self-end' className={'confirm_footer'}>
            <Button type='default' className={'button_reject'} onClick={handleCancel}>
              {t('reject')}
            </Button>
            <Button htmlType='submit' type='primary' className={'button_continue'}>
              {t('button.confirm')}
            </Button>
          </Box>
        </Form>
      </div>
    </S.ModalWrapper>
  );
};

export default ConfirmationModal;
