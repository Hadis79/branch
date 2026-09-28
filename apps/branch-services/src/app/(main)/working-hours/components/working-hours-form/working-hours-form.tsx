import { useState } from 'react';
import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { ApiUtil } from '@branch-services/utils';
import { Box, Button, Input } from '@branch-services/ui-kit';

import TimeRangeFields from './time-range-fields';
import ConfirmCreateModal from '../working-hours-modal/confirm-create-modal';
import useCreateWorkingHoursMutation from '../../queries/use-create-working-hours-mutation';
import useWorkingHoursPage from '../../hooks/use-working-hours-page';
import useWorkingHoursStore from '../../store/use-widget-store';
import { WorkingHoursPage } from '../../utils/constants';
import FormSVG from '../../assets/form';

type FormValues = { from?: string; to?: string };

// Defines the bank's default working hours; only shown once, before it exists
const WorkingHoursForm = () => {
  const [t] = useTr();
  const [form] = Form.useForm<FormValues>();
  const from = Form.useWatch('from', form);
  const to = Form.useWatch('to', form);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { navigateTo } = useWorkingHoursPage();
  const setMessage = useWorkingHoursStore((state) => state.setMessage);
  const reset = useWorkingHoursStore((state) => state.resetAll);
  const createMutation = useCreateWorkingHoursMutation();

  const handleConfirm = () =>
    createMutation.mutate(
      { from: from as string, to: to as string },
      {
        onSuccess: () => {
          setMessage({ txt: t('create_success'), type: 'success', shouldTranslate: false });
          navigateTo(WorkingHoursPage.LIST);
        },
        onError: (error) => setMessage(ApiUtil.getErrorMessage(error)),
        onSettled: () => setIsConfirmOpen(false),
      }
    );

  return (
    <Box minHeight='75vh' flexDirection='column' justifyContent='space-between' gap='2.4rem' padding='3.2rem'>
      <Box flexDirection='column' gap='2.4rem'>
        <Box flexDirection='row-reverse'>
          <FormSVG />
          <Box flexDirection='column' width='100%'>
            <Form form={form} layout='vertical'>
              <Box flexDirection='column' gap='2.4rem'>
                <Form.Item label={t('title_label')}>
                  <Input disabled value={t('default_title_value')} />
                </Form.Item>
                <TimeRangeFields />
              </Box>
            </Form>
          </Box>
        </Box>
      </Box>
      <Box justifyContent='flex-end' gap='1.2rem' fillChildren={false}>
        <Button
          htmlType='button'
          type='primaryOutlined'
          onClick={() => {
            form.resetFields();
            reset();
          }}
        >
          {t('cancel')}
        </Button>
        <Button htmlType='button' type='primary' disabled={!from || !to} onClick={() => setIsConfirmOpen(true)}>
          {t('continue_and_confirm')}
        </Button>
      </Box>
      <ConfirmCreateModal
        open={isConfirmOpen}
        from={from}
        to={to}
        loading={createMutation.isPending}
        onConfirm={handleConfirm}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </Box>
  );
};

export default WorkingHoursForm;
