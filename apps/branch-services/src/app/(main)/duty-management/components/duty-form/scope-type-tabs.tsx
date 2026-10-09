import { useTr } from '@branch-services/translation';

import * as S from './duty-form.style';
import { SCOPE_TYPES } from '../../utils/constants';
import type { ScopeType } from '../../utils/types';

type ScopeTypeTabsProps = {
  // Filled in by the Form.Item wrapping it, like any other field
  value?: ScopeType;
  onChange?: (value: ScopeType) => void;
};

// Picks what the scope applies to: a working-hours group or a single unit
const ScopeTypeTabs = ({ value, onChange }: ScopeTypeTabsProps) => {
  const [t] = useTr();

  return (
    <S.TargetTabs
      activeKey={value}
      onChange={(key) => onChange?.(key as ScopeType)}
      items={SCOPE_TYPES.map(({ type, labelKey }) => ({ key: type, label: t(labelKey) }))}
    />
  );
};

export default ScopeTypeTabs;
