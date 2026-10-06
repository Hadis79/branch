import { ReactNode } from 'react';
import { Form, TimePicker } from 'antd';
import type { FormRule } from 'antd';
import type { Dayjs } from 'dayjs';

import { useTr } from '@branch-services/translation';
import { dayjs } from '@branch-services/utils';

import * as S from './time-range-fields.style';

const timeFormat = 'HH:mm';

const toTimePickerValue = (value?: string | null): Dayjs | null => {
  if (!value) return null;

  const [hour, minute] = value.split(':').map(Number);
  return dayjs().hour(hour).minute(minute).second(0).millisecond(0);
};

type TimeRangeFieldsProps = {
  title: ReactNode;
  // Where `from` / `to` live in the form, e.g. ['days', 2] for one weekday's row
  namePrefix?: (string | number)[];
  // An optional range may be left empty, but once one end is picked the other is required too
  optional?: boolean;
};

const TimeRangeFields = ({ title, namePrefix = [], optional = false }: TimeRangeFieldsProps) => {
  const [t] = useTr();
  const fromName = [...namePrefix, 'from'];
  const toName = [...namePrefix, 'to'];

  const requiredRule =
    (otherName: (string | number)[]): FormRule =>
    ({ getFieldValue }) => ({
      validator: (_, value) =>
        value || (optional && !getFieldValue(otherName))
          ? Promise.resolve()
          : Promise.reject(new Error(t('hour_required'))),
    });

  const afterStartRule: FormRule = ({ getFieldValue }) => ({
    validator: (_, value?: string) => {
      const from: string | undefined = getFieldValue(fromName);
      // "HH:mm" values compare chronologically as plain strings
      return !value || !from || value > from ? Promise.resolve() : Promise.reject(new Error(t('end_before_start')));
    },
  });

  const renderTimePicker = () => (
    <TimePicker
      format={timeFormat}
      minuteStep={5}
      placeholder={t('hour_select_placeholder')}
      suffixIcon={null}
      showNow={false}
      needConfirm
      inputReadOnly
      allowClear={{ clearIcon: <i className='ri-close-line' /> }}
    />
  );

  return (
    <S.Container>
      <S.Title>{title}</S.Title>
      <S.Fields>
        <S.Field>
          <S.Label>{t('from_hour')}</S.Label>
          <Form.Item
            name={fromName}
            dependencies={[toName]}
            getValueProps={(value?: string | null) => ({ value: toTimePickerValue(value) })}
            normalize={(value: Dayjs | null) => value?.format(timeFormat)}
            rules={[requiredRule(toName)]}
          >
            {renderTimePicker()}
          </Form.Item>
        </S.Field>

        <S.RangeArrow className='ri-arrow-left-line' aria-hidden='true' />

        <S.Field>
          <S.Label>{t('to_hour')}</S.Label>
          <Form.Item
            name={toName}
            dependencies={[fromName]}
            getValueProps={(value?: string | null) => ({ value: toTimePickerValue(value) })}
            normalize={(value: Dayjs | null) => value?.format(timeFormat)}
            rules={[requiredRule(fromName), afterStartRule]}
          >
            {renderTimePicker()}
          </Form.Item>
        </S.Field>
      </S.Fields>
    </S.Container>
  );
};

export default TimeRangeFields;
