import { useState, type ReactNode } from 'react';
import { Box, MessageBox } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import type { GroupListItem } from '../../utils/types';
import { formatCount } from '../../utils/utils';
import ManualEditEntry from './manual-edit-entry';
import { GuideMessageBox, WarningBanner } from './style';

type EditEntryProps = {
  group: GroupListItem;
  isFileEntry: boolean;
  fileEntry: ReactNode;
};

const EditEntry = ({ group, isFileEntry, fileEntry }: EditEntryProps) => {
  const [t] = useTr();
  const [showWarning, setShowWarning] = useState(true);

  return (
    <Box flexDirection='column'>
      {isFileEntry && showWarning && (
        <WarningBanner>
          <MessageBox
            type='warning'
            message={t('replace_members_warning', { unitCount: formatCount(group.size) })}
            closable
            onClose={() => setShowWarning(false)}
          />
        </WarningBanner>
      )}
      {!isFileEntry && <GuideMessageBox type='info' message={t('manual_edit_info')} closable />}
      {isFileEntry ? fileEntry : <ManualEditEntry group={group} />}
    </Box>
  );
};

export default EditEntry;
