import { useAppTheme } from '@branch-services/hooks';
import { useTr } from '@branch-services/translation';
import { fullDateLocale } from '@branch-services/utils';
import { Box, Text } from '@branch-services/ui-kit';

import DayHoursRows from '../day-hours/day-hours-rows';
import { getDayCount, getScopeText } from '../../utils/utils';
import type { WorkingHoursExceptionDto } from '../../utils/types';

type ExceptionPreviewProps = {
  exception: WorkingHoursExceptionDto;
};

const ExceptionPreview = ({ exception }: ExceptionPreviewProps) => {
  const [t] = useTr();
  const theme = useAppTheme();
  const scopeText = getScopeText(exception.scope, t);

  // With no end date the exception has no end, and so no length either
  const rows: [string, string][] = [
    [t('affected_scope'), scopeText],
    [t('start_date'), fullDateLocale(exception.startDate)],
    [t('end_date'), exception.endDate ? fullDateLocale(exception.endDate) : '-'],
    [
      t('range_length'),
      exception.endDate ? t('day_count', { count: getDayCount(exception.startDate, exception.endDate) }) : '-',
    ],
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
          {t('new_working_hours')}
        </Text>
      </Box>
      <DayHoursRows days={exception.days} />
    </Box>
  );
};

export default ExceptionPreview;
