import { useEffect, useState } from 'react';
import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { ApiUtil, Dayjs, shouldDisableEndDate, shouldDisableStartDate } from '@branch-services/utils';
import { Box, Button, DatePicker, Input, MessageBox } from '@branch-services/ui-kit';

import ExceptionPreview from './exception-preview';
import ScopeFields from './scope-fields';
import FormSVG from '../../assets/form';
import TimeRangeFields from '../working-hours-form/time-range-fields';
import useCreateExceptionMutation from '../../queries/use-create-exception-mutation';
import useWorkingHoursPage from '../../hooks/use-working-hours-page';
import useWorkingHoursStore from '../../store/use-widget-store';
import { WorkingHoursPage } from '../../utils/constants';
import { toApiDate } from '../../utils/utils';
import type { ExceptionScope, WorkingHoursExceptionDto } from '../../utils/types';

type FormValues = {
  scopeType: ExceptionScope['type'];
  provinceName?: string;
  title: string;
  startDate: Dayjs;
  endDate: Dayjs;
  from: string;
  to: string;
};

const toExceptionDto = (values: FormValues): WorkingHoursExceptionDto => ({
  title: values.title,
  scope:
    values.scopeType === 'PROVINCIAL'
      ? { type: 'PROVINCIAL', provinceName: values.provinceName as string }
      : { type: 'NATIONAL' },
  startDate: toApiDate(values.startDate) as string,
  endDate: toApiDate(values.endDate) as string,
  from: values.from,
  to: values.to,
});

// A working-hours exception, scoped to a date range and a province (or the whole country)
const ExceptionForm = () => {
  const [t] = useTr();
  const [form] = Form.useForm<FormValues>();
  const values = Form.useWatch([], form) as Partial<FormValues> | undefined;
  // Set once the form step is confirmed, so the preview step shows a stable snapshot
  const [pending, setPending] = useState<WorkingHoursExceptionDto | null>(null);
  const { navigateTo } = useWorkingHoursPage();
  const setMessage = useWorkingHoursStore((state) => state.setMessage);
  const createMutation = useCreateExceptionMutation();

  // Drop a message left over from a previous visit to this page
  useEffect(() => setMessage(null), [setMessage]);

  const isFormComplete = Boolean(
    values?.scopeType &&
      (values.scopeType === 'NATIONAL' || values?.provinceName) &&
      values?.title?.trim() &&
      values?.startDate &&
      values?.endDate &&
      values?.from &&
      values?.to
  );

  const handleContinue = () => form.validateFields().then((formValues) => setPending(toExceptionDto(formValues)));

  const handleReset = () => {
    form.resetFields();
    setPending(null);
  };

  const handleConfirm = () => {
    if (!pending) return;

    createMutation.mutate(pending, {
      onSuccess: () => {
        setMessage({ txt: t('exception_create_success'), type: 'success', shouldTranslate: false });
        navigateTo(WorkingHoursPage.LIST);
      },
      onError: (error) => setMessage(ApiUtil.getErrorMessage(error)),
    });
  };

  return (
    <Box minHeight='75vh' flexDirection='column' justifyContent='space-between' gap='2.4rem' padding='3.2rem'>
      <Box flexDirection='column' gap='2.4rem'>
        <MessageBox type='info' message={t('exception_info_description')} closable />
        <Box flexDirection='row-reverse'>
          <FormSVG />
          <Box flexDirection='column' width='100%'>
            {pending ? (
              <ExceptionPreview exception={pending} />
            ) : (
              <Form form={form} layout='vertical'>
                <Box flexDirection='column' gap='2.4rem'>
                  <ScopeFields />
                  <Form.Item
                    name='title'
                    label={t('exception_title_label')}
                    style={{ marginBottom: 0 }}
                    rules={[{ required: true, whitespace: true, message: t('exception_title_required') }]}
                  >
                    <Input placeholder={t('exception_title_placeholder')} />
                  </Form.Item>
                  <Box gap='1.6rem'>
                    <Form.Item
                      name='startDate'
                      label={t('start_date')}
                      style={{ marginBottom: 0, flex: 1 }}
                      rules={[{ required: true, message: t('start_date_required') }]}
                    >
                      <DatePicker
                        style={{ width: '100%' }}
                        placeholder={t('from_date_placeholder')}
                        disabledDate={(current) => shouldDisableStartDate(current, form, 'endDate', false)}
                      />
                    </Form.Item>
                    <Form.Item
                      name='endDate'
                      label={t('end_date')}
                      style={{ marginBottom: 0, flex: 1 }}
                      rules={[{ required: true, message: t('end_date_required') }]}
                    >
                      <DatePicker
                        style={{ width: '100%' }}
                        placeholder={t('to_date_placeholder')}
                        disabledDate={(current) => shouldDisableEndDate(current, form, 'startDate', false)}
                      />
                    </Form.Item>
                  </Box>
                  <TimeRangeFields />
                </Box>
              </Form>
            )}
          </Box>
        </Box>
      </Box>
      <Box justifyContent='flex-end' gap='1.2rem' fillChildren={false}>
        <Button htmlType='button' type='primaryOutlined' onClick={handleReset}>
          {t('cancel')}
        </Button>
        {pending ? (
          <Button htmlType='button' type='primary' loading={createMutation.isPending} onClick={handleConfirm}>
            {t('confirm_final')}
          </Button>
        ) : (
          <Button htmlType='button' type='primary' disabled={!isFormComplete} onClick={handleContinue}>
            {t('continue')}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default ExceptionForm;
