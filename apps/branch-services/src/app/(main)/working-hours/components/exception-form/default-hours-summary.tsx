import { useTr } from '@branch-services/translation';

import * as S from './default-hours-summary.style';
import { SummarySkeleton } from '../loading-skeletons/loading-skeletons';
import FormSVG from '../../assets/form';
import useWorkingHoursQuery from '../../queries/use-working-hours-query';
import useQueryErrorMessage from '../../hooks/use-query-error-message';
import { formatHour, getDayNameKey, isWorkingDay } from '../../utils/utils';

const DefaultHoursSummary = () => {
  const [t] = useTr();
  const { data: workingHours, isLoading, error } = useWorkingHoursQuery();
  useQueryErrorMessage(error);

  return (
    <S.Container>
      <FormSVG />
      {isLoading && <SummarySkeleton />}
      {workingHours && (
        <S.Content>
          <S.Title>{workingHours.title}</S.Title>
          <S.Days>
            {workingHours.days.map((day) => {
              const isHoliday = !isWorkingDay(day);
              const hours = `${formatHour(day.from ?? '')} تا ${formatHour(day.to ?? '')}`;

              return (
                <S.Day key={day.dayOfWeek} $holiday={isHoliday}>
                  <span>{t(getDayNameKey(day.dayOfWeek))}</span>
                  <S.Hours>{isHoliday ? t('holiday') : hours}</S.Hours>
                </S.Day>
              );
            })}
          </S.Days>
        </S.Content>
      )}
    </S.Container>
  );
};

export default DefaultHoursSummary;
