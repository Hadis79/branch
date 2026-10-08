import { useTr } from '@branch-services/translation';

import * as S from './day-hours.style';
import type { RuleDay } from '../../utils/types';
import { formatHour, getDayNameKey, isWorkingDay } from '../../utils/utils';

type DayHoursRowsProps = {
  days: RuleDay[];
};

// One full-width row per weekday with its hours, used by the preview step; holidays in orange
const DayHoursRows = ({ days }: DayHoursRowsProps) => {
  const [t] = useTr();

  return (
    <S.Rows>
      {days.map((day) => {
        const isHoliday = !isWorkingDay(day);
        return (
          <S.Row key={day.dayOfWeek} $holiday={isHoliday}>
            <S.DayName>{t(getDayNameKey(day.dayOfWeek))}</S.DayName>
            <S.Hours $holiday={isHoliday}>
              {isHoliday
                ? t('holiday')
                : t('review_hours', { from: formatHour(day.from ?? ''), to: formatHour(day.to ?? '') })}
            </S.Hours>
          </S.Row>
        );
      })}
    </S.Rows>
  );
};

export default DayHoursRows;
