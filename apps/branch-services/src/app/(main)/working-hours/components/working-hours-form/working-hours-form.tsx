import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button, Input, MessageBox } from '@branch-services/ui-kit';

import FormPage from './form-page';
import TimeRangeFields from './time-range-fields';
import * as S from './working-hours-form.style';
import { WEEK_DAYS } from '../../utils/constants';
import type { WorkingDay } from '../../utils/types';
import { getDayNameKey } from '../../utils/utils';

// One row per weekday, in WEEK_DAYS order
type FormValues = { days: { from?: string | null; to?: string | null }[] };

const toFormValues = (days?: WorkingDay[]): FormValues => ({
  days: WEEK_DAYS.map(({ dayOfWeek }) => {
    const day = days?.find((item) => item.dayOfWeek === dayOfWeek);
    return { from: day?.from ?? undefined, to: day?.to ?? undefined };
  }),
});

const toWorkingDays = ({ days }: FormValues): WorkingDay[] =>
  WEEK_DAYS.map(({ dayOfWeek }, index) => ({
    dayOfWeek,
    from: days[index]?.from || null,
    to: days[index]?.to || null,
  }));

type WorkingHoursFormProps = {
  initialDays?: WorkingDay[];
  noteType: 'info' | 'warning';
  submitText: string;
  submitLoading?: boolean;
  onSubmit: (days: WorkingDay[]) => void;
  // Called after the form is reset to its initial values
  onCancel?: () => void;
};

// The bank's default hours for each weekday; a day left empty is a holiday
const WorkingHoursForm = ({
  initialDays,
  noteType,
  submitText,
  submitLoading = false,
  onSubmit,
  onCancel,
}: WorkingHoursFormProps) => {
  const [t] = useTr();
  const [form] = Form.useForm<FormValues>();
  const days = Form.useWatch('days', form);
  const hasWorkingDay = Boolean(days?.some((day) => day?.from && day?.to));

  const handleCancel = () => {
    form.resetFields();
    onCancel?.();
  };

  const handleSubmit = () => form.validateFields().then((values) => onSubmit(toWorkingDays(values)));

  return (
    <FormPage
      header={
        noteType === 'warning' ? (
          <MessageBox type='warning' message={t('holiday_days_note')} closable />
        ) : (
          <S.GuideMessageBox type='info' message={t('holiday_days_note')} closable />
        )
      }
      footer={
        <>
          <Button htmlType='button' type='primaryOutlined' disabled={submitLoading} onClick={handleCancel}>
            {t('cancel')}
          </Button>
          <Button
            htmlType='button'
            type='primary'
            disabled={!hasWorkingDay}
            loading={submitLoading}
            onClick={handleSubmit}
          >
            {submitText}
          </Button>
        </>
      }
    >
      <Form form={form} layout='vertical' initialValues={toFormValues(initialDays)}>
        <Box flexDirection='column' gap='2.4rem'>
          <Form.Item label={t('title_label')} style={{ marginBottom: 0 }}>
            <Input disabled value={t('default_title_value')} />
          </Form.Item>
          <S.Days>
            <S.DaysTitle>{t('week_days_hours_label')}</S.DaysTitle>
            <S.DaysList>
              {WEEK_DAYS.map(({ dayOfWeek }, index) => (
                <TimeRangeFields
                  key={dayOfWeek}
                  title={t(getDayNameKey(dayOfWeek))}
                  namePrefix={['days', index]}
                  optional
                />
              ))}
            </S.DaysList>
          </S.Days>
        </Box>
      </Form>
    </FormPage>
  );
};

export default WorkingHoursForm;
