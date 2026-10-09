import { useEffect } from 'react';

import AffectedUnitsTable from './affected-units-table';
import useServiceAccessScopePage from '../../hooks/use-service-access-scope-page';
import useServiceAccessScopeStore from '../../store/use-widget-store';
import { ServiceAccessScopePage } from '../../utils/constants';

// The units of the group picked on the create page, opened from its preview
const AffectedUnits = () => {
  const target = useServiceAccessScopeStore((state) => state.draft?.preview.target);
  const { replaceWith } = useServiceAccessScopePage();
  const groupId = target?.type === 'GROUP' ? target.id : undefined;

  // Opened without a create page behind it (e.g. reloaded): there is no group to show
  useEffect(() => {
    if (!groupId) replaceWith(ServiceAccessScopePage.LIST);
  }, [groupId, replaceWith]);

  if (!groupId) return null;

  return <AffectedUnitsTable groupId={groupId} />;
};

export default AffectedUnits;
