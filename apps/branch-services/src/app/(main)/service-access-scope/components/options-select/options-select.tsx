import { Select, SelectProps } from '@branch-services/ui-kit';

import { FieldSkeleton } from '../loading-skeletons/loading-skeletons';

type OptionsSelectProps = SelectProps & {
  // The options' first load; the field shows as a skeleton until then
  isLoading: boolean;
};

// A searchable select over loaded options whose picked value keeps its label (labelInValue), for the
// preview. Form.Item hands value / onChange through to the select.
const OptionsSelect = ({ isLoading, ...selectProps }: OptionsSelectProps) =>
  isLoading ? <FieldSkeleton /> : <Select labelInValue showSearch optionFilterProp='label' {...selectProps} />;

export default OptionsSelect;
