import { ReactNode, useState } from 'react';

import { useTr } from '@branch-services/translation';
import { dateLocale } from '@branch-services/utils';
import { Box, Button } from '@branch-services/ui-kit';

import * as S from './exception-card.style';
import DayHoursChips from '../day-hours/day-hours-chips';
import type { WorkingHoursException } from '../../utils/types';
import { getScopeText } from '../../utils/utils';

type ExceptionCardProps = {
  exception: WorkingHoursException;
  isExpired?: boolean;
  // Omitted for an expired exception, which can no longer be removed
  onDelete?: () => void;
};

type DetailItemProps = { label: string; value: ReactNode; fullWidth?: boolean };

const DetailItem = ({ label, value, fullWidth = false }: DetailItemProps) => {
  return (
    <S.DetailItem $fullWidth={fullWidth}>
      <span className='detail-label'>{label}</span>
      <span className='detail-value'>{value}</span>
    </S.DetailItem>
  );
};

// A working-hours exception; expands to its scope, dates and each weekday's hours
const ExceptionCard = ({ exception, isExpired = false, onDelete }: ExceptionCardProps) => {
  const [t] = useTr();
  const [isExpanded, setIsExpanded] = useState(false);
  const scopeText = getScopeText(exception.scope, t);

  return (
    <S.Card $expired={isExpired} flexDirection='column'>
      <S.Header $expanded={isExpanded} justifyContent='space-between' alignItems='center' fillChildren={false}>
        <Box
          className='exception-title'
          alignItems='center'
          gap='0.8rem'
          fillChildren={false}
          onClick={() => setIsExpanded((value) => !value)}
        >
          <i className={isExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} />
          <S.Title>{exception.title}</S.Title>
        </Box>
        {onDelete && (
          <Button className='delete-button' type='link' danger onClick={onDelete}>
            {t('delete')}
            <i className='ri-delete-bin-line'></i>
          </Button>
        )}
      </S.Header>
      {isExpanded && (
        <S.DetailsGrid>
          <DetailItem label={t('affected_scope')} value={scopeText} fullWidth />
          <DetailItem label={t('start_date')} value={dateLocale(exception.startDate) ?? '-'} />
          <DetailItem label={t('end_date')} value={(exception.endDate && dateLocale(exception.endDate)) || '-'} />
          <DetailItem label={t('new_working_hours')} value={<DayHoursChips days={exception.days} />} fullWidth />
        </S.DetailsGrid>
      )}
    </S.Card>
  );
};

export default ExceptionCard;
