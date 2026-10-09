import { ReactNode } from 'react';

import { useTr } from '@branch-services/translation';
import { dateLocale } from '@branch-services/utils';

import * as S from './scope-card.style';
import DayHoursChips from '../day-hours/day-hours-chips';
import { formatCount, getScopeTypeKey } from '../../utils/utils';
import type { ServiceAccessScope } from '../../utils/types';

// Out of the grid's six tracks: a full row, a half or a third
type DetailSpan = 6 | 3 | 2;

type DetailItemProps = { label: string; value: ReactNode; span: DetailSpan };

const DetailItem = ({ label, value, span }: DetailItemProps) => (
  <S.DetailItem $span={span}>
    <span className='detail-label'>{label}</span>
    <span className='detail-value'>{value}</span>
  </S.DetailItem>
);

// An expanded card's body: the service, who it applies to, its dates and each weekday's hours
const ScopeDetails = ({ scope }: { scope: ServiceAccessScope }) => {
  const [t] = useTr();

  const items: DetailItemProps[] = [
    { label: t('service_label'), value: scope.service.name, span: 6 },
    { label: t('scope_label'), value: t(getScopeTypeKey(scope.target.type)), span: 2 },
    { label: t('target_label'), value: scope.target.name, span: 2 },
    {
      label: t('affected_units_label'),
      value: t('unit_count', { unitCount: formatCount(scope.affectedUnitCount) }),
      span: 2,
    },
    { label: t('start_date'), value: dateLocale(scope.startDate) ?? '-', span: 3 },
    { label: t('end_date'), value: (scope.endDate && dateLocale(scope.endDate)) || '-', span: 3 },
    { label: t('days_hours'), value: <DayHoursChips days={scope.days} />, span: 6 },
  ];

  return (
    <S.DetailsGrid>
      {items.map((item) => (
        <DetailItem key={item.label} {...item} />
      ))}
    </S.DetailsGrid>
  );
};

export default ScopeDetails;
