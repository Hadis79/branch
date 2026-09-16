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

import { ConfirmModalWrapper } from './confirm-modal.style';
import useCartableStore from '../../../store/use-cartable-store';
import useConfirmRequestMutation from '../../../queries/use-confirm-mutation';
import useConfirmOfflineRequestMutation from '../../../queries/use-confirm-offline-ach-mutation';
import { RequestTypes } from '../../../utils/consts';

const ConfirmModal = () => {
  const { t } = useTr();

  const { record } = useCartableStore();
  const { setModalType } = useCartableStore();
  const { mutate: confirmMutate, isPending } = useConfirmRequestMutation();
  const { mutate: offlineConfirmMutate, isPending: offlineConfirmPending } = useConfirmOfflineRequestMutation();

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
    if (RequestTypes.OFFLINE_ACH === record.requestType) {
      offlineConfirmMutate(record.requestTracingCode);
    } else {
      confirmMutate(record.requestTracingCode);
    }
    form.resetFields();
  }

  return (
    <ConfirmModalWrapper>
      <Box flexDirection='column'>
        <Box textAlign='justify' margin={'0.5rem 0'}>
          <MessageBox message={t('confirm_warning_message')} type={'warning'} closable={false} shouldScroll />
        </Box>
        <Box margin={'1rem 0'}>{t('confirm_Text_message')}</Box>
        <div className={'transaction_balance'}>
          <span>{t('transaction_balance')}</span>
          <span className='transaction-amount'>
            {getValueOrDash(addThousandSeparator(record?.totalAmount as number) + ' ' + t('common.rial'))} -
            <span> {`${numberToPersian(rialToToman(record?.totalAmount as number))} ${t('common.toman')}`}</span>
          </span>
        </div>
      </Box>

      <Form form={form} onFinish={onFinishHandler} layout='vertical'>
        <Form.Item
          label={t('field.amount')}
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
          <Input.Money showLetter={showLetter} onClear={() => form.resetFields()} />
        </Form.Item>
        <Box gap='1rem' marginTop={'4rem'}>
          <Button type='default' onClick={resetHandler}>
            {t('button.cancel')}
          </Button>
          <Button loading={isPending || offlineConfirmPending} type='primary' htmlType='submit'>
            {t('button.confirm')}
          </Button>
        </Box>
      </Form>
    </ConfirmModalWrapper>
  );
};

export default ConfirmModal;
