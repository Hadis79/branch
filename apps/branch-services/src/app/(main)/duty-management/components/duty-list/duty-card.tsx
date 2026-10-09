import { memo, useState } from 'react';

import { useTr } from '@branch-services/translation';
import { Box, Button } from '@branch-services/ui-kit';

import * as S from './duty-card.style';
import DutyDetails from './duty-details';
import type { Duty } from '../../utils/types';

type DutyCardProps = {
  duty: Duty;
  isExpired?: boolean;
  // Omitted for an expired duty, which can no longer be removed
  onDelete?: (duty: Duty) => void;
};

// A service access duty; expands to its details. Memoized: toggling or deleting one card leaves the
// others alone.
const DutyCard = ({ duty, isExpired = false, onDelete }: DutyCardProps) => {
  const [t] = useTr();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <S.Card $expired={isExpired} flexDirection='column'>
      <S.Header $expanded={isExpanded} justifyContent='space-between' alignItems='center' fillChildren={false}>
        <Box
          className='duty-title'
          alignItems='center'
          gap='0.8rem'
          fillChildren={false}
          onClick={() => setIsExpanded((value) => !value)}
        >
          <i className={isExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} />
          <S.Title>{duty.title}</S.Title>
        </Box>
        {onDelete && (
          <Button className='delete-button' type='link' danger onClick={() => onDelete(duty)}>
            {t('delete')}
            <i className='ri-delete-bin-line' />
          </Button>
        )}
      </S.Header>
      {isExpanded && <DutyDetails duty={duty} />}
    </S.Card>
  );
};

export default memo(DutyCard);
