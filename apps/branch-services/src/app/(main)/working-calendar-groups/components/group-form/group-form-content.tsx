import type { ReactNode } from 'react';

import { useTr } from '@branch-services/translation';

import EditEntry from './edit-entry';
import ManualEntry from './manual-entry';
import { StyledTabs } from './style';
import { EntryMode } from '../../utils/constants';
import type { GroupListItem } from '../../utils/types';

type GroupFormContentProps = {
  isEdit: boolean;
  isFileEntry: boolean;
  editedGroup: GroupListItem | null;
  activeTab: EntryMode;
  fileEntry: ReactNode;
  onEntryModeChange: (mode: string) => void;
};

const GroupFormContent = ({
  isEdit,
  isFileEntry,
  editedGroup,
  activeTab,
  fileEntry,
  onEntryModeChange,
}: GroupFormContentProps) => {
  const [t] = useTr();

  if (isEdit) {
    return editedGroup ? <EditEntry group={editedGroup} isFileEntry={isFileEntry} fileEntry={fileEntry} /> : null;
  }

  return (
    <StyledTabs
      activeKey={activeTab}
      className='half-width'
      items={[
        { key: EntryMode.FILE, label: t('file_upload'), children: fileEntry },
        { key: EntryMode.MANUAL, label: t('manual_entry'), children: <ManualEntry /> },
      ]}
      onChange={onEntryModeChange}
      destroyInactiveTabPane
      centered
    />
  );
};

export default GroupFormContent;
