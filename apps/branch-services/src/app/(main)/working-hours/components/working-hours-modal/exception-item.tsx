import { useState } from 'react';

import { useAppTheme } from '@branch-services/hooks';
import { useTr } from '@branch-services/translation';
import { Box, Button, Text } from '@branch-services/ui-kit';

import * as S from './exception-item.style';
import type { WorkingHoursException } from '../../utils/types';

type ExceptionItemProps = {
  exception: WorkingHoursException;
  onDelete: () => void;
};

// A single working-hours override; its detail view isn't designed yet, so expanding only shows a placeholder
const ExceptionItem = ({ exception, onDelete }: ExceptionItemProps) => {
  const [t] = useTr();
  const theme = useAppTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <S.ExceptionRow flexDirection='column' gap='0.8rem'>
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
        <Text as='span' fontSize='1.2rem' color={theme.textSecondary}>
          {t('exception_detail_placeholder')}
        </Text>
      )}
    </S.ExceptionRow>
  );
};

export default ExceptionItem;
