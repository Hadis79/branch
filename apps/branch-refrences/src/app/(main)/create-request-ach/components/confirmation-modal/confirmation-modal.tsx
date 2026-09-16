import { BottomSheet, Box, Button, Input, MessageBox } from '@branch-services/ui-kit';
import * as S from './confirmation-modal.style';
import { useTr } from '@branch-services/translation';
import { Form } from 'antd';
import { useWidgetStore } from '../../store';
import {
  addThousandSeparator,
  getValueOrDash,
  numberToPersian,
  removeCommas,
  rialToToman,
} from '@branch-services/utils';
import { useEffect, useState } from 'react';
import { useResponsive } from '@branch-services/hooks';

const ConfirmationModal = (props) => {
  const { open, setOpen, handleOk } = props;
  const { uploadResponse } = useWidgetStore((state) => state);
  const [form] = Form.useForm();
  const [showLetter, setShowLetter] = useState(true);
  const [t] = useTr();
  const { isMobileOrTablet } = useResponsive();

  useEffect(() => {
    form.resetFields();
    setShowLetter(true);
  }, [open]);

  const handleCancel = () => {
    setOpen(false);
  };

  const isValidAmount = () => {
    const amountValue = form.getFieldValue('amount') && removeCommas(form.getFieldValue('amount'));
    return amountValue === uploadResponse?.totalAmount;
  };

  const handleFormSubmit = (values) => {
    handleOk(values);
  };

  const handleConfirmClick = () => {
    form
      .validateFields()
      .then((values) => {
        handleFormSubmit(values);
      })
      .catch((error) => {
        console.log('Validation failed:', error);
      });
  };

  const commonFormContent = (
    <Form form={form} layout='vertical' name='confirm-batch-request' onFinish={handleFormSubmit}>
      <Form.Item
        // label={t('field.amount')}
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
        <Input.Money placeholder={t('confirm_value')} showLetter={showLetter} onClear={() => form.resetFields()} />
      </Form.Item>

      <Box alignSelf='self-end' className={'confirm_footer'}>
        <Button type='default' className={'button_reject'} onClick={handleCancel}>
          {t('reject')}
        </Button>
        {isMobileOrTablet ? (
          <Button type='primary' className={'button_continue'} onClick={handleConfirmClick}>
            {t('button.confirm')}
          </Button>
        ) : (
          <Button htmlType='submit' type='primary' className={'button_continue'}>
            {t('button.confirm')}
          </Button>
        )}
      </Box>
    </Form>
  );

  const commonContent = (
    <div className='modal-wrapper__content'>
      <div>
        <div className={'modal-wrapper__header'}>
          <i className='ri-error-warning-fill' />
          <p className={'modal-wrapper__title'}>{t('confirm_modal_title')}</p>
        </div>

        <Box className='modal-wrapper__message'>{t('confirm_Text_message')}</Box>
      </div>

      <div className='modal-wrapper__amount'>
        <div className={'modal-wrapper__transaction'}>
          <span>{t('transaction_balance')}</span>
          <span className='transaction-amount'>
            {getValueOrDash(addThousandSeparator(uploadResponse?.totalAmount as number) + ' ' + t('common.rial'))}
          </span>
        </div>
        <span>
          <span>{t('equal_to')} :</span>{' '}
          {`${numberToPersian(rialToToman(uploadResponse?.totalAmount as number))} ${t('common.toman')}`}
        </span>
      </div>
      {commonFormContent}
    </div>
  );

  return (
    <>
      {isMobileOrTablet ? (
        <BottomSheet open={open} initialHeight={340} onClose={handleCancel}>
          <S.ModalWrapperPwa>{commonContent}</S.ModalWrapperPwa>
        </BottomSheet>
      ) : (
        <S.ModalWrapper open={open} centered footer={null} closeIcon={false}>
          {commonContent}
        </S.ModalWrapper>
      )}
    </>
  );
};

export default ConfirmationModal;
