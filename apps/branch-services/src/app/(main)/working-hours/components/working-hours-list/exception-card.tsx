import { useState } from 'react';

import { useTr } from '@branch-services/translation';
import { dateLocale } from '@branch-services/utils';
import { Box, Button } from '@branch-services/ui-kit';

import * as S from './exception-card.style';
import { formatHour } from '../../utils/utils';
import type { WorkingHoursException } from '../../utils/types';

type ExceptionCardProps = {
  exception: WorkingHoursException;
  isExpired?: boolean;
  // Omitted for an expired exception, which can no longer be removed
  onDelete?: () => void;
};

type DetailItemProps = { label: string; value: string };

const DetailItem = ({ label, value }: DetailItemProps) => {
  return (
    <S.DetailItem>
      <span className='detail-label'>{label}</span>
      <span className='detail-value'>{value}</span>
    </S.DetailItem>
  );
};

// A working-hours exception; expands to its scope, dates and hours
const ExceptionCard = ({ exception, isExpired = false, onDelete }: ExceptionCardProps) => {
  const [t] = useTr();
  const [isExpanded, setIsExpanded] = useState(false);
  const scopeText =
    exception.scope.type === 'PROVINCIAL'
      ? `${t('scope_provincial')} - ${t('province_prefix')} ${exception.scope.provinceName}`
      : t('scope_national');

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
          <DetailItem label={t('scope')} value={scopeText} />
          <DetailItem
            label={t('new_working_hours')}
            value={t('hours_range', { from: formatHour(exception.from), to: formatHour(exception.to) })}
          />
          <DetailItem label={t('start_date')} value={dateLocale(exception.startDate) ?? '-'} />
          <DetailItem label={t('end_date')} value={dateLocale(exception.endDate) ?? '-'} />
        </S.DetailsGrid>
      )}
    </S.Card>
  );
};

export default ExceptionCard;
