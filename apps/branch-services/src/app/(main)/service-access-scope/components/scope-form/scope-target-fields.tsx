import { Form } from 'antd';

import { useTr } from '@branch-services/translation';

import * as S from './scope-form.style';
import ScopeTypeTabs from './scope-type-tabs';
import OptionsSelect from '../options-select/options-select';
import useQueryErrorMessage from '../../hooks/use-query-error-message';
import useGroupOptionsQuery from '../../queries/use-group-options-query';
import useUnitOptionsQuery from '../../queries/use-unit-options-query';
import type { ScopeType } from '../../utils/types';

// Who the scope applies to: a tab per scope type, and the group or unit picker of the active one.
// Each list loads the first time its tab is opened; a pick on the other tab is kept but not used.
const ScopeTargetFields = () => {
  const [t] = useTr();
  const form = Form.useFormInstance();
  const scopeType: ScopeType | undefined = Form.useWatch('scopeType', form);
  const isUnit = scopeType === 'UNIT';
  const groups = useGroupOptionsQuery(!isUnit);
  const units = useUnitOptionsQuery(isUnit);
  const { data: options, isLoading, error } = isUnit ? units : groups;
  useQueryErrorMessage(error);

  return (
    <S.TargetBox>
      <Form.Item name='scopeType' noStyle>
        <ScopeTypeTabs />
      </Form.Item>
      <Form.Item
        // Keyed, so switching tabs swaps in the other field with its own value and errors
        key={isUnit ? 'unit' : 'group'}
        name={isUnit ? 'unit' : 'group'}
        label={t(isUnit ? 'unit_field_label' : 'group_field_label')}
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: t(isUnit ? 'unit_required' : 'group_required') }]}
      >
        <OptionsSelect isLoading={isLoading} options={options} placeholder={t('select_placeholder')} />
      </Form.Item>
    </S.TargetBox>
  );
};

export default ScopeTargetFields;
