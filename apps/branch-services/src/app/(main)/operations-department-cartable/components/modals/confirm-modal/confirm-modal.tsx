import React, { useState } from 'react';
import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, Input, MessageBox } from '@branch-services/ui-kit';
import {
  addThousandSeparator,
  getValueOrDash,
  numberToPersian,
  removeCommas,
  rialToToman,
} from '@branch-services/utils';

import { ModalWrapper } from './confirm-modal.style';
import useConfirmRequestMutation from '../../../queries/use-confirm-mutation';
import useOperationsDepartmentCartableStore from '../../../store/use-widget-store';

const ConfirmModal = () => {
  const { t } = useTr();

  const { record, setModalType } = useOperationsDepartmentCartableStore();
  const { mutate: confirmMutate, isPending } = useConfirmRequestMutation();

  const [form] = Form.useForm();

  const [showLetter, setShowLetter] = useState(true);

  const isValidAmount = () => {
    const amountValue = form.getFieldValue('amount') && removeCommas(form.getFieldValue('amount'));
    return amountValue === record?.totalAmount;
  };

  function resetHandler() {
    setModalType(null);
    form.resetFields();
  }

  function onFinishHandler() {
    confirmMutate(record.requestTracingCode);
    form.resetFields();
  }

  return (
    <ModalWrapper>
      <div className='modal-wrapper__content'>
        <div className={'modal-wrapper__header'}>
          <i className='ri-error-warning-fill' />
          <p className={'modal-wrapper__title'}>{t('approve')}</p>
        </div>

        <Box className='modal-wrapper__message'>{t('sure_to_confirm_request')}</Box>

        <div className={'modal-wrapper__transaction'}>
          <span>{t('transaction_balance')}</span>
          <span className='transaction-amount'>
            {getValueOrDash(addThousandSeparator(record?.totalAmount as number) + ' ' + t('common.rial'))} -
            <span> {`${numberToPersian(rialToToman(record?.totalAmount as number))} ${t('common.toman')}`}</span>
          </span>
        </div>

        <Form form={form} layout='vertical' name='confirm-batch-request' onFinish={onFinishHandler}>
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
            <Button type='default' className={'button_reject'} onClick={resetHandler}>
              {t('cancel')}
            </Button>
            <Button htmlType='submit' type='primary' className={'button_continue'}>
              {t('button.confirm')}
            </Button>
          </Box>
        </Form>
      </div>
    </ModalWrapper>
  );
};

export default ConfirmModal;
