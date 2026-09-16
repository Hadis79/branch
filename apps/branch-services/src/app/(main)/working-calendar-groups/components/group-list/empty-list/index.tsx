import React from 'react';

import { useTr } from '@branch-services/translation';
import { Box, Button, EmptyData } from '@branch-services/ui-kit';

import { WorkingCalendarGroupPage } from '../../../utils/constants';
import useWorkingCalendarGroupPage from '../../../hooks/use-working-calendar-group-page';

const EmptyList = () => {
  const [t] = useTr();
  const { navigateTo } = useWorkingCalendarGroupPage();

  return (
    <Box flexDirection='column'>
      <EmptyData />
      <Button type='primary' onClick={() => navigateTo(WorkingCalendarGroupPage.ADD)}>
        <span>{t('add_group')}</span>
        <span>
          <i className='ri ri-add-line' />
        </span>
      </Button>
    </Box>
  );
};

export default EmptyList;
