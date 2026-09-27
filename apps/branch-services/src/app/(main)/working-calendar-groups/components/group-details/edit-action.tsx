import { useState } from 'react';
import { Button } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';
import EditModal from '../modals/edit-modal';
import type { GroupListItem } from '../../utils/types';

type Props = { group: GroupListItem | null; total?: number };

const GroupDetailsEditAction = ({ group, total }: Props) => {
  const [t] = useTr();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        htmlType='button'
        type='primary'
        disabled={!group}
        onClick={() => setOpen(true)}
        style={{ width: 'fit-content' }}
      >
        {t('edit')}
        <i className='ri-edit-line' />
      </Button>
      <EditModal open={open} onCancel={() => setOpen(false)} group={group && { ...group, size: total ?? group.size }} />
    </>
  );
};

export default GroupDetailsEditAction;
