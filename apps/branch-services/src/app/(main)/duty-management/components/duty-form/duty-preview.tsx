import { ReactNode } from 'react';

import { useTr } from '@branch-services/translation';
import { Box, Text } from '@branch-services/ui-kit';

import * as S from './duty-form.style';
import SlotRows from '../slots/slot-rows';
import useGroupOptionsQuery from '../../queries/use-group-options-query';
import { formatCount, getScopeTypeKeys } from '../../utils/utils';
import type { DutyDto } from '../../utils/types';

type PreviewRowItem = { label: string; value: ReactNode; hidden?: boolean };

type DutyPreviewProps = {
  duty: DutyDto;
  onShowAffectedUnits: () => void;
};

// Last check of the duty before it's saved: who it applies to and its slots. A group's units can be
// counted here and looked through on their own page.
const DutyPreview = ({ duty, onShowAffectedUnits }: DutyPreviewProps) => {
  const [t] = useTr();
  const isGroup = duty.target.type === 'GROUP';
  // Already loaded by the form's group picker
  const { data: groups } = useGroupOptionsQuery(isGroup);
  const unitCount = groups?.find((group) => group.value === duty.target.id)?.unitCount;

  const rows: PreviewRowItem[] = [
    { label: t(getScopeTypeKeys(duty.target.type).fieldLabelKey), value: duty.target.label },
    {
      label: t('affected_units_label'),
      value: t('unit_count', { unitCount: formatCount(unitCount ?? 0) }),
      hidden: !isGroup || unitCount === undefined,
    },
    {
      label: t('preview_affected_units_label'),
      value: (
        <S.ViewLink type='button' onClick={onShowAffectedUnits}>
          {t('view')}
          <i className='ri-eye-line' />
        </S.ViewLink>
      ),
      // A single unit is all there is to see
      hidden: !isGroup,
    },
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
      <Text as='span' fontWeight={500}>
        {t('slots_preview_title')}
      </Text>
      <SlotRows slots={duty.slots} />
    </Box>
  );
};

export default DutyPreview;
