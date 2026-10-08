import { ReactNode, useState } from 'react';

import { useTr } from '@branch-services/translation';
import { dateLocale } from '@branch-services/utils';
import { Box, Button } from '@branch-services/ui-kit';

import * as S from './rule-card.style';
import DayHoursChips from '../day-hours/day-hours-chips';
import type { ServiceRule } from '../../utils/types';

type RuleCardProps = {
  rule: ServiceRule;
  isExpired?: boolean;
  // Omitted for an expired rule, which can no longer be removed
  onDelete?: () => void;
};

type DetailItemProps = { label: string; value: ReactNode; fullWidth?: boolean };

const DetailItem = ({ label, value, fullWidth = false }: DetailItemProps) => (
  <S.DetailItem $fullWidth={fullWidth}>
    <span className='detail-label'>{label}</span>
    <span className='detail-value'>{value}</span>
  </S.DetailItem>
);

// A service rule; expands to its service, dates and each weekday's hours
const RuleCard = ({ rule, isExpired = false, onDelete }: RuleCardProps) => {
  const [t] = useTr();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <S.Card $expired={isExpired} flexDirection='column'>
      <S.Header $expanded={isExpanded} justifyContent='space-between' alignItems='center' fillChildren={false}>
        <Box
          className='rule-title'
          alignItems='center'
          gap='0.8rem'
          fillChildren={false}
          onClick={() => setIsExpanded((value) => !value)}
        >
          <i className={isExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} />
          <S.Title>{rule.title}</S.Title>
        </Box>
        {onDelete && (
          <Button className='delete-button' type='link' danger onClick={onDelete}>
            {t('delete')}
            <i className='ri-delete-bin-line' />
          </Button>
        )}
      </S.Header>
      {isExpanded && (
        <S.DetailsGrid>
          <DetailItem label={t('service_label')} value={rule.service.name} fullWidth />
          <DetailItem label={t('start_date')} value={dateLocale(rule.startDate) ?? '-'} />
          <DetailItem label={t('end_date')} value={(rule.endDate && dateLocale(rule.endDate)) || '-'} />
          <DetailItem label={t('days_hours')} value={<DayHoursChips days={rule.days} />} fullWidth />
        </S.DetailsGrid>
      )}
    </S.Card>
  );
};

export default RuleCard;
