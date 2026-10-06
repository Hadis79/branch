import { useEffect, useState } from 'react';
import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { ApiUtil, Dayjs, shouldDisableEndDate, shouldDisableStartDate } from '@branch-services/utils';
import { Box, Button, DatePicker, Input, MessageBox } from '@branch-services/ui-kit';

import * as S from './exception-form.style';
import ExceptionNotes from './exception-notes';
import ExceptionPreview from './exception-preview';
import ScopeFields from './scope-fields';
import SleepingCalendarSvg from '../../assets/sleeping-calendar';
import FormPage from '../working-hours-form/form-page';
import TimeRangeFields from '../working-hours-form/time-range-fields';
import { DaysList } from '../working-hours-form/working-hours-form.style';
import useCreateExceptionMutation from '../../queries/use-create-exception-mutation';
import useWorkingHoursPage from '../../hooks/use-working-hours-page';
import useWorkingHoursStore from '../../store/use-widget-store';
import { WorkingHoursPage } from '../../utils/constants';
import { getDayNameKey, getRangeWeekDays, toApiDate } from '../../utils/utils';
import type { DayOfWeek, ExceptionScope, WorkingHoursExceptionDto } from '../../utils/types';
import CalendarSvg from '../../assets/calendar';

type FormValues = {
  scopeType: ExceptionScope['type'];
  provinceName?: string;
  group?: { value: string; label: string };
  title: string;
  startDate: Dayjs;
  endDate?: Dayjs | null;
  // Keyed by weekday, so hours already entered survive a change of the date range
  days?: Partial<Record<DayOfWeek, { from?: string | null; to?: string | null }>>;
};

const toExceptionScope = (values: FormValues): ExceptionScope => {
  if (values.scopeType === 'PROVINCIAL') return { type: 'PROVINCIAL', provinceName: values.provinceName as string };
  if (values.scopeType === 'GROUP')
    return { type: 'GROUP', groupId: values.group?.value as string, groupName: values.group?.label as string };
  return { type: 'NATIONAL' };
};

const toExceptionDto = (values: FormValues, weekDays: DayOfWeek[]): WorkingHoursExceptionDto => ({
  title: values.title,
  scope: toExceptionScope(values),
  startDate: toApiDate(values.startDate) as string,
  endDate: toApiDate(values.endDate) ?? null,
  days: weekDays.map((dayOfWeek) => ({
    dayOfWeek,
    from: values.days?.[dayOfWeek]?.from || null,
    to: values.days?.[dayOfWeek]?.to || null,
  })),
});

// A working-hours exception, scoped to a date range and a province (or the whole country), with
// its own hours for each weekday the range covers
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

  // Every weekday until an end date is picked (or for a week or longer), else just the range's days
  const weekDays = getRangeWeekDays(values?.startDate, values?.endDate);

  const isFormComplete = Boolean(
    values?.scopeType &&
      (values.scopeType === 'NATIONAL' || values?.provinceName || values?.group) &&
      values?.title?.trim() &&
      values?.startDate &&
      weekDays.some((dayOfWeek) => values?.days?.[dayOfWeek]?.from && values?.days?.[dayOfWeek]?.to)
  );

  const handleContinue = () =>
    form.validateFields().then(() => setPending(toExceptionDto(form.getFieldsValue(true), weekDays)));

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
    <FormPage
      header={
        <>
          <S.InfoMessage type='info' message={t('exception_info_description')} closable />
          {pending && (
            <MessageBox type='warning' message={t('exception_notes_title')} description={<ExceptionNotes />} closable />
          )}
        </>
      }
      footer={
        pending ? (
          <Box width={'25%'}>
            <Button htmlType='button' type='primaryOutlined' disabled={createMutation.isPending} onClick={handleReset}>
              {t('cancel')}
            </Button>
            <Button htmlType='button' type='primary' loading={createMutation.isPending} onClick={handleConfirm}>
              {t('confirm_final')}
            </Button>
          </Box>
        ) : (
          <Box width={'25%'}>
            <Button htmlType='button' type='primaryOutlined' onClick={handleReset}>
              {t('cancel')}
            </Button>
            <Button htmlType='button' type='primary' disabled={!isFormComplete} onClick={handleContinue}>
              {t('continue')}
            </Button>
          </Box>
        )
      }
    >
      {pending && <ExceptionPreview exception={pending} />}
      {/* Hidden, not unmounted, behind the preview; cancel on either step resets it */}
      <Form form={form} layout='vertical' hidden={Boolean(pending)}>
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
          <MessageBox type='warning' message={<ExceptionNotes />} />
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
            <Form.Item name='endDate' label={t('end_date_optional')} style={{ marginBottom: 0, flex: 1 }}>
              <DatePicker
                style={{ width: '100%' }}
                placeholder={t('from_date_placeholder')}
                disabledDate={(current) => shouldDisableEndDate(current, form, 'startDate', false)}
              />
            </Form.Item>
          </Box>
          <S.Days>
            <S.DaysTitle>{t('week_days_hours_label')}</S.DaysTitle>
            {weekDays.length ? (
              <DaysList>
                {weekDays.map((dayOfWeek) => (
                  <TimeRangeFields
                    key={dayOfWeek}
                    title={t(getDayNameKey(dayOfWeek))}
                    namePrefix={['days', dayOfWeek]}
                    optional
                  />
                ))}
              </DaysList>
            ) : (
              <S.DaysEmpty>
                <CalendarSvg />
                {t('exception_days_empty')}
              </S.DaysEmpty>
            )}
          </S.Days>
        </Box>
      </Form>
    </FormPage>
  );
};

export default ExceptionForm;
