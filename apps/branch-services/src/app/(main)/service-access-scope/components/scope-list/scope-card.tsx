import { memo, useState } from 'react';

import { useTr } from '@branch-services/translation';
import { Box, Button } from '@branch-services/ui-kit';

import * as S from './scope-card.style';
import ScopeDetails from './scope-details';
import type { ServiceAccessScope } from '../../utils/types';

type ScopeCardProps = {
  scope: ServiceAccessScope;
  isExpired?: boolean;
  // Omitted for an expired scope, which can no longer be removed
  onDelete?: (scope: ServiceAccessScope) => void;
};

// A service access scope; expands to its details. Memoized: toggling or deleting one card leaves the
// others alone.
const ScopeCard = ({ scope, isExpired = false, onDelete }: ScopeCardProps) => {
  const [t] = useTr();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <S.Card $expired={isExpired} flexDirection='column'>
      <S.Header $expanded={isExpanded} justifyContent='space-between' alignItems='center' fillChildren={false}>
        <Box
          className='scope-title'
          alignItems='center'
          gap='0.8rem'
          fillChildren={false}
          onClick={() => setIsExpanded((value) => !value)}
        >
          <i className={isExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} />
          <S.Title>{scope.title}</S.Title>
        </Box>
        {onDelete && (
          <Button className='delete-button' type='link' danger onClick={() => onDelete(scope)}>
            {t('delete')}
            <i className='ri-delete-bin-line' />
          </Button>
        )}
      </S.Header>
      {isExpanded && <ScopeDetails scope={scope} />}
    </S.Card>
  );
};

export default memo(ScopeCard);
