import { useTr } from '@branch-services/translation';
import { Select, SelectProps } from '@branch-services/ui-kit';

import { OFFICIAL_STATUS_LABELS, OfficialStatus } from '../../utils/constants';

type OfficialStatusSelectProps = SelectProps & {
  // List filter only: an "all" option, whose value is `''`
  includeAll?: boolean;
};

// Holiday type (official / unofficial), used by the list filter and the edit form
const OfficialStatusSelect = ({ includeAll = false, ...props }: OfficialStatusSelectProps) => {
  const [t] = useTr();
  const options = [
    ...(includeAll ? [{ value: '', label: t('all') }] : []),
    ...Object.values(OfficialStatus).map((value) => ({ value, label: t(OFFICIAL_STATUS_LABELS[value]) })),
  ];

  return <Select options={options} {...props} />;
};

export default OfficialStatusSelect;
