import { Calendar } from 'antd';

import { useTr } from '@branch-services/translation';
import { dayjs, Dayjs } from '@branch-services/utils';

import * as S from './slots-field.style';
import CalendarHeader from './calendar-header';

type SlotCalendarProps = {
  // Filled in by the Form.Item wrapping it, like any other field
  value?: Dayjs;
  onChange?: (date: Dayjs) => void;
};

const isPastDay = (date: Dayjs) => date.isBefore(dayjs(), 'day');

// An always-open month calendar for picking a slot's day; past days are disabled
const SlotCalendar = ({ value, onChange }: SlotCalendarProps) => {
  const [t] = useTr();

  return (
    <S.CalendarBox>
      <Calendar
        fullscreen={false}
        value={value}
        onChange={onChange}
        disabledDate={isPastDay}
        headerRender={({ value: shown, onChange: show }) => <CalendarHeader value={shown} onChange={show} />}
      />
      <S.TodayButton type='button' onClick={() => onChange?.(dayjs())}>
        {t('today')}
      </S.TodayButton>
    </S.CalendarBox>
  );
};

export default SlotCalendar;
