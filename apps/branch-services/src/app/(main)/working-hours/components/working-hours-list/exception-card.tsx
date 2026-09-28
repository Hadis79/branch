import { useState } from 'react';

import { useAppTheme } from '@branch-services/hooks';
import { useTr } from '@branch-services/translation';
import { dateLocale } from '@branch-services/utils';
import { Box, Button, Text } from '@branch-services/ui-kit';

import * as S from './exception-card.style';
import { formatHour } from '../../utils/utils';
import type { WorkingHoursException } from '../../utils/types';

type ExceptionCardProps = {
  exception: WorkingHoursException;
  onDelete: () => void;
};

type DetailItemProps = { label: string; value: string };

const DetailItem = ({ label, value }: DetailItemProps) => {
  const theme = useAppTheme();
  return (
    <Box flexDirection='column' gap='0.4rem'>
      <Text as='span' fontSize='1.2rem' color={theme.textSecondary}>
        {label}
      </Text>
      <Text as='span' fontWeight={500}>
        {value}
      </Text>
    </Box>
  );
};

// A working-hours exception; expands to its scope, dates and hours
const ExceptionCard = ({ exception, onDelete }: ExceptionCardProps) => {
  const [t] = useTr();
  const [isExpanded, setIsExpanded] = useState(false);
  const scopeText =
    exception.scope.type === 'PROVINCIAL'
      ? `${t('scope_provincial')} - ${t('province_prefix')} ${exception.scope.provinceName}`
      : t('scope_national');

  return (
    <S.Card flexDirection='column' gap='1.2rem'>
      <Box justifyContent='space-between' alignItems='center' fillChildren={false}>
        <Box
          className='exception-title'
          alignItems='center'
          gap='0.8rem'
          fillChildren={false}
          onClick={() => setIsExpanded((value) => !value)}
        >
          <i className={isExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} />
          <Text as='span'>{exception.title}</Text>
        </Box>
        <Button type='link' danger icon={<i className='ri-delete-bin-2-line' />} onClick={onDelete}>
          {t('delete')}
        </Button>
      </Box>
      {isExpanded && (
        <Box flexDirection='column' gap='1.2rem'>
          <Box justifyContent='space-between' fillChildren={false}>
            <DetailItem
              label={t('new_working_hours')}
              value={t('hours_range', { from: formatHour(exception.from), to: formatHour(exception.to) })}
            />
            <DetailItem label={t('affected_scope')} value={scopeText} />
          </Box>
          <Box justifyContent='space-between' fillChildren={false}>
            <DetailItem label={t('end_date')} value={dateLocale(exception.endDate) ?? '-'} />
            <DetailItem label={t('start_date')} value={dateLocale(exception.startDate) ?? '-'} />
          </Box>
        </Box>
      )}
    </S.Card>
  );
};

export default ExceptionCard;
