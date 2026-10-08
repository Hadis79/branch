import { Tooltip } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Button } from '@branch-services/ui-kit';

import type { Holiday, HolidayModalType } from '../../../utils/types';
import { isPastDate } from '../../../utils/utils';

type RowActionsProps = {
  holiday: Holiday;
  openModalHandler: (holiday: Holiday, type: HolidayModalType) => void;
};

// Edit and delete; a holiday that has already passed can't be changed anymore
const RowActions = ({ holiday, openModalHandler }: RowActionsProps) => {
  const [t] = useTr();
  const isPast = isPastDate(holiday.date);

  // A disabled button fires no mouse events, so the tooltip needs a wrapper
  return (
    <Tooltip title={isPast ? t('past_holiday_hint') : undefined}>
      <span>
        <Box justifyContent='center' fillChildren={false}>
          <Button type='link' disabled={isPast} onClick={() => openModalHandler(holiday, 'edit')}>
            {t('edit')}
            <i className='ri-pencil-line' />
          </Button>
          <Button danger type='link' disabled={isPast} onClick={() => openModalHandler(holiday, 'delete')}>
            {t('delete')}
            <i className='ri-delete-bin-line' />
          </Button>
        </Box>
      </span>
    </Tooltip>
  );
};

export default RowActions;
