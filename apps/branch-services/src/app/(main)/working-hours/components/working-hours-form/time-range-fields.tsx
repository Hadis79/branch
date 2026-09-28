import { Form, TimePicker } from 'antd';
import type { Dayjs } from 'dayjs';

import { useTr } from '@branch-services/translation';
import { dayjs } from '@branch-services/utils';

import * as S from './time-range-fields.style';

const timeFormat = 'HH:mm';

const toTimePickerValue = (value?: string): Dayjs | null => {
  if (!value) return null;

  const [hour, minute] = value.split(':').map(Number);
  return dayjs().hour(hour).minute(minute).second(0).millisecond(0);
};

const TimeRangeFields = () => {
  const [t] = useTr();

  return (
    <S.Container>
      <S.Title>{t('working_hours_label')}</S.Title>
      <S.Fields>
        <S.Field>
          <S.Label>{t('from_hour')}</S.Label>
          <Form.Item
            name='from'
            getValueProps={(value?: string) => ({ value: toTimePickerValue(value) })}
            normalize={(value: Dayjs | null) => value?.format(timeFormat)}
            rules={[{ required: true, message: t('hour_required') }]}
          >
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
          </Form.Item>
        </S.Field>

        <S.RangeArrow className='ri-arrow-left-line' aria-hidden='true' />

        <S.Field>
          <S.Label>{t('to_hour')}</S.Label>
          <Form.Item
            name='to'
            getValueProps={(value?: string) => ({ value: toTimePickerValue(value) })}
            normalize={(value: Dayjs | null) => value?.format(timeFormat)}
            rules={[{ required: true, message: t('hour_required') }]}
          >
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
          </Form.Item>
        </S.Field>
      </S.Fields>
    </S.Container>
  );
};

export default TimeRangeFields;
