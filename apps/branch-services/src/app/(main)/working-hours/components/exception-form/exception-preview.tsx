import { useAppTheme } from '@branch-services/hooks';
import { useTr } from '@branch-services/translation';
import { fullDateLocale } from '@branch-services/utils';
import { Box, Text } from '@branch-services/ui-kit';

import HourRangeBar from './hour-range-bar';
import { formatHour, getDayCount } from '../../utils/utils';
import type { WorkingHoursExceptionDto } from '../../utils/types';

type ExceptionPreviewProps = {
  exception: WorkingHoursExceptionDto;
};

const ExceptionPreview = ({ exception }: ExceptionPreviewProps) => {
  const [t] = useTr();
  const theme = useAppTheme();
  const scopeText =
    exception.scope.type === 'PROVINCIAL'
      ? `${t('scope_provincial')} - ${t('province_prefix')} ${exception.scope.provinceName}`
      : t('scope_national');

  const rows: [string, string][] = [
    [t('affected_scope'), scopeText],
    [t('rule_start'), fullDateLocale(exception.startDate)],
    [t('rule_end'), fullDateLocale(exception.endDate)],
    [t('range_length'), t('day_count', { count: getDayCount(exception.startDate, exception.endDate) })],
    [t('new_working_hours'), t('hours_range', { from: formatHour(exception.from), to: formatHour(exception.to) })],
  ];

  return (
    <Box flexDirection='column' gap='1.6rem'>
      <Text as='span' fontWeight={500}>
        {t('preview_title')}
      </Text>
      {rows.map(([label, value]) => (
        <Box key={label} justifyContent='space-between' fillChildren={false}>
          <Text as='span' fontWeight={400} color={theme.textSecondary}>
            {label}
          </Text>
          <Text as='span' fontWeight={500}>
            {value}
          </Text>
        </Box>
      ))}
      <Box
        borderTop={`0.1rem solid ${theme.border}`}
        paddingTop='1.6rem'
        alignItems='center'
        gap='0.8rem'
        fillChildren={false}
      >
        <i className='ri-time-line' />
        <Text as='span' fontWeight={500}>
          {t('new_hours_preview')}
        </Text>
      </Box>
      <HourRangeBar from={exception.from} to={exception.to} />
    </Box>
  );
};

export default ExceptionPreview;
