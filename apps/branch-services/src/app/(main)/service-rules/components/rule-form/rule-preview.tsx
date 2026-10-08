import { useTr } from '@branch-services/translation';
import { fullDateLocale } from '@branch-services/utils';
import { Box, Text } from '@branch-services/ui-kit';

import * as S from './rule-form.style';
import DayHoursRows from '../day-hours/day-hours-rows';
import type { ServiceRuleDto } from '../../utils/types';

type RulePreviewProps = {
  rule: ServiceRuleDto;
};

// Last check of the rule before it's saved: its service, dates and each covered weekday's hours
const RulePreview = ({ rule }: RulePreviewProps) => {
  const [t] = useTr();

  const rows: [string, string][] = [
    [t('preview_service_label'), rule.service.name],
    [t('start_date'), fullDateLocale(rule.startDate)],
    [t('end_date'), rule.endDate ? fullDateLocale(rule.endDate) : '-'],
  ];

  return (
    <Box flexDirection='column' gap='1.6rem'>
      <Text as='span' fontWeight={500}>
        {t('preview_title')}
      </Text>
      {rows.map(([label, value]) => (
        <S.PreviewRow key={label}>
          <span className='preview-label'>{label}</span>
          <span className='preview-value'>{value}</span>
        </S.PreviewRow>
      ))}
      <S.PreviewHoursTitle>
        <i className='ri-time-line' />
        {t('new_working_hours')}
      </S.PreviewHoursTitle>
      <DayHoursRows days={rule.days} />
    </Box>
  );
};

export default RulePreview;
