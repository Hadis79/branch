import { useEffect } from 'react';

import AffectedUnitsTable from './affected-units-table';
import useDutyPage from '../../hooks/use-duty-page';
import useDutyStore from '../../store/use-widget-store';
import { DutyPage } from '../../utils/constants';

// The units of the group picked on the create page, opened from its preview
const AffectedUnits = () => {
  const target = useDutyStore((state) => state.draft?.preview.target);
  const { replaceWith } = useDutyPage();
  const groupId = target?.type === 'GROUP' ? target.id : undefined;

  // Opened without a create page behind it (e.g. reloaded): there is no group to show
  useEffect(() => {
    if (!groupId) replaceWith(DutyPage.LIST);
  }, [groupId, replaceWith]);

  if (!groupId) return null;

  return <AffectedUnitsTable groupId={groupId} />;
};

export default AffectedUnits;
