import { useTr } from '@branch-services/translation';
import { dayjs, Dayjs } from '@branch-services/utils';

import * as S from './slots-field.style';
import { formatMonth } from '../../utils/utils';

type CalendarHeaderProps = {
  value: Dayjs;
  onChange: (date: Dayjs) => void;
};

type Step = { unit: 'month' | 'year'; amount: 1 | -1; icon: string; labelKey: string };

// In right-to-left order: back on the start edge, forward on the end edge
const BACK_STEPS: Step[] = [
  { unit: 'year', amount: -1, icon: 'ri-arrow-right-double-line', labelKey: 'previous_year' },
  { unit: 'month', amount: -1, icon: 'ri-arrow-right-s-line', labelKey: 'previous_month' },
];

const FORWARD_STEPS: Step[] = [
  { unit: 'month', amount: 1, icon: 'ri-arrow-left-s-line', labelKey: 'next_month' },
  { unit: 'year', amount: 1, icon: 'ri-arrow-left-double-line', labelKey: 'next_year' },
];

// Month navigation of the add-slot calendar. Past days can't be picked, so stepping back never goes
// before the current month, and a step that lands on a past day lands on today instead.
const CalendarHeader = ({ value, onChange }: CalendarHeaderProps) => {
  const [t] = useTr();
  const today = dayjs();

  const getTarget = ({ unit, amount }: Step) => value.add(amount, unit);

  const isBeforeThisMonth = (date: Dayjs) => date.endOf('month').isBefore(today, 'day');

  const go = (step: Step) => {
    const target = getTarget(step);
    onChange(target.isBefore(today, 'day') ? today : target);
  };

  const renderStep = (step: Step) => (
    <S.NavButton
      key={step.labelKey}
      type='button'
      aria-label={t(step.labelKey)}
      disabled={step.amount < 0 && isBeforeThisMonth(getTarget(step))}
      onClick={() => go(step)}
    >
      <i className={step.icon} />
    </S.NavButton>
  );

  return (
    <S.CalendarHeader>
      <S.NavButtons>{BACK_STEPS.map(renderStep)}</S.NavButtons>
      <S.MonthTitle>{formatMonth(value)}</S.MonthTitle>
      <S.NavButtons>{FORWARD_STEPS.map(renderStep)}</S.NavButtons>
    </S.CalendarHeader>
  );
};

export default CalendarHeader;
