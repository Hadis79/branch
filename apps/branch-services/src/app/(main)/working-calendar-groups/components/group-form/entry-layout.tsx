import { ReactNode } from 'react';

import { Box } from '@branch-services/ui-kit';

import GroupNameField from './group-name-field';
import SearchSVG from '../../assets/media/search';

type EntryLayoutProps = {
  inlineName?: boolean;
  children: ReactNode;
};

// Common layout of both entry modes: group name, the mode's own fields, and the illustration.
const EntryLayout = ({ inlineName, children }: EntryLayoutProps) => (
  <Box>
    <Box flexDirection='column' width='100%'>
      {inlineName ? (
        <Box marginBottom='2.4rem'>
          <GroupNameField inline />
        </Box>
      ) : (
        <GroupNameField />
      )}
      {children}
    </Box>
    <SearchSVG />
  </Box>
);

export default EntryLayout;
