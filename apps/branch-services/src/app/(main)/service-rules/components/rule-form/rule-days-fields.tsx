import { useTr } from '@branch-services/translation';

import * as S from './rule-form.style';
import SleepingCalendarSvg from '../../assets/sleeping-calendar';
import TimeRangeFields from '../time-range-fields/time-range-fields';
import { getDayNameKey } from '../../utils/utils';
import type { DayOfWeek } from '../../utils/types';

type RuleDaysFieldsProps = {
  // The weekdays the picked date range covers; empty until a start date is picked
  weekDays: DayOfWeek[];
};

// An optional hours range per covered weekday; a day left empty is a holiday for the service
const RuleDaysFields = ({ weekDays }: RuleDaysFieldsProps) => {
  const [t] = useTr();

  return (
    <S.Days>
      <S.DaysTitle>{t('week_days_hours_label')}</S.DaysTitle>
      {weekDays.length ? (
        <S.DaysList>
          {weekDays.map((dayOfWeek) => (
            <TimeRangeFields
              key={dayOfWeek}
              title={t(getDayNameKey(dayOfWeek))}
              namePrefix={['days', dayOfWeek]}
              optional
            />
          ))}
        </S.DaysList>
      ) : (
        <S.DaysEmpty>
          <SleepingCalendarSvg />
          {t('days_empty')}
        </S.DaysEmpty>
      )}
    </S.Days>
  );
};

export default RuleDaysFields;
