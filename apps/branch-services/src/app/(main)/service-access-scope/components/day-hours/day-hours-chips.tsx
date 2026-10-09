import { useTr } from '@branch-services/translation';

import * as S from './day-hours.style';
import type { ScopeDay } from '../../utils/types';
import { formatHour, getDayNameKey, isWorkingDay } from '../../utils/utils';

type DayHoursChipsProps = {
  days: ScopeDay[];
};

// A compact "day - hours" chip per weekday, used by the list's cards; holidays in orange
const DayHoursChips = ({ days }: DayHoursChipsProps) => {
  const [t] = useTr();

  return (
    <S.Chips>
      {days.map((day) => {
        const dayName = t(getDayNameKey(day.dayOfWeek));
        const isWorking = isWorkingDay(day);
        return (
          <S.Chip key={day.dayOfWeek} $holiday={!isWorking}>
            {isWorking
              ? t('day_hours', { day: dayName, from: formatHour(day.from), to: formatHour(day.to) })
              : t('day_holiday', { day: dayName })}
          </S.Chip>
        );
      })}
    </S.Chips>
  );
};

export default DayHoursChips;
