import { ReactNode } from 'react';

import { useTr } from '@branch-services/translation';

import * as S from './duty-card.style';
import SlotChips from '../slots/slot-chips';
import { formatCount, getScopeTypeKeys } from '../../utils/utils';
import type { Duty } from '../../utils/types';

// Out of the grid's six tracks: a full row or a third
type DetailSpan = 6 | 2;

type DetailItemProps = { label: string; value: ReactNode; span: DetailSpan };

const DetailItem = ({ label, value, span }: DetailItemProps) => (
  <S.DetailItem $span={span}>
    <span className='detail-label'>{label}</span>
    <span className='detail-value'>{value}</span>
  </S.DetailItem>
);

// An expanded card's body: who the duty applies to, how many units that is, and its slots
const DutyDetails = ({ duty }: { duty: Duty }) => {
  const [t] = useTr();

  const items: DetailItemProps[] = [
    { label: t('scope_label'), value: t(getScopeTypeKeys(duty.target.type).scopeKey), span: 2 },
    { label: t('target_label'), value: duty.target.label, span: 2 },
    {
      label: t('affected_units_label'),
      value: t('unit_count', { unitCount: formatCount(duty.affectedUnitCount) }),
      span: 2,
    },
    { label: t('slots_label'), value: <SlotChips slots={duty.slots} />, span: 6 },
  ];

  return (
    <S.DetailsGrid>
      {items.map((item) => (
        <DetailItem key={item.label} {...item} />
      ))}
    </S.DetailsGrid>
  );
};

export default DutyDetails;
