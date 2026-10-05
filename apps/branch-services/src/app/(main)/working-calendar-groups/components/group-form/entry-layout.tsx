import { ReactNode } from 'react';

import { useTr } from '@branch-services/translation';
import { Box } from '@branch-services/ui-kit';

import { WarningWrapper } from './entry-layout.style';
import { GuideMessageBox } from './style';
import GroupNameField from './group-name-field';
import GroupTypeField from './group-type-field';
import SearchSVG from '../../assets/media/search';

type EntryLayoutProps = {
  inlineName?: boolean;
  children: ReactNode;
};

// Common layout of both entry modes: group name, group type, the mode's own fields, and the illustration.
// `inlineName` is only set by the edit form, which is also why it's used here to tell create and
// edit apart: the group type can only be set once, at creation, so the edit form shows it locked.
const EntryLayout = ({ inlineName, children }: EntryLayoutProps) => {
  const [t] = useTr();
  const isCreate = !inlineName;

  return (
    <Box flexDirection='column'>
      {isCreate && (
        <WarningWrapper>
          <GuideMessageBox type='info' message={t('group_type_warning')} closable />
        </WarningWrapper>
      )}
      <Box>
        <Box flexDirection='column' width='100%'>
          {isCreate ? (
            <>
              <GroupTypeField />
              <GroupNameField />
            </>
          ) : (
            <>
              <Box marginBottom='2.4rem'>
                <GroupNameField inline />
              </Box>
              <GroupTypeField locked />
            </>
          )}
          {children}
        </Box>
        <SearchSVG />
      </Box>
    </Box>
  );
};

export default EntryLayout;
