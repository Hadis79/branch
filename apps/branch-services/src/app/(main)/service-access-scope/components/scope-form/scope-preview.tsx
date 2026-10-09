import { ReactNode } from 'react';

import { useTr } from '@branch-services/translation';
import { fullDateLocale } from '@branch-services/utils';
import { Box, Text } from '@branch-services/ui-kit';

import * as S from './scope-form.style';
import DayHoursRows from '../day-hours/day-hours-rows';
import type { ServiceAccessScopeDto } from '../../utils/types';

type PreviewRowItem = { label: string; value: ReactNode; hidden?: boolean };

type ScopePreviewProps = {
  scope: ServiceAccessScopeDto;
  onShowAffectedUnits: () => void;
};

// Last check of the scope before it's saved: its service, who it applies to, dates and each covered
// weekday's hours. A group's units can be looked through on their own page.
const ScopePreview = ({ scope, onShowAffectedUnits }: ScopePreviewProps) => {
  const [t] = useTr();

  const rows: PreviewRowItem[] = [
    { label: t('preview_service_label'), value: scope.service.name },
    { label: t('preview_target_label'), value: scope.target.name },
    {
      label: t('preview_affected_units_label'),
      value: (
        <S.ViewLink type='button' onClick={onShowAffectedUnits}>
          {t('view')}
          <i className='ri-eye-line' />
        </S.ViewLink>
      ),
      // A single unit is all there is to see
      hidden: scope.target.type !== 'GROUP',
    },
    { label: t('start_date'), value: fullDateLocale(scope.startDate) },
    { label: t('end_date'), value: scope.endDate ? fullDateLocale(scope.endDate) : '-' },
  ];

  return (
    <Box flexDirection='column' gap='1.6rem'>
      <Text as='span' fontWeight={500}>
        {t('preview_title')}
      </Text>
      {rows
        .filter(({ hidden }) => !hidden)
        .map(({ label, value }) => (
          <S.PreviewRow key={label}>
            <span className='preview-label'>{label}</span>
            <span className='preview-value'>{value}</span>
          </S.PreviewRow>
        ))}
      <S.PreviewHoursTitle>
        <i className='ri-time-line' />
        {t('new_working_hours')}
      </S.PreviewHoursTitle>
      <DayHoursRows days={scope.days} />
    </Box>
  );
};

export default ScopePreview;
