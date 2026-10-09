import { Form } from 'antd';

import { useTr } from '@branch-services/translation';

import * as S from './duty-form.style';
import ScopeTypeTabs from './scope-type-tabs';
import OptionsSelect from '../options-select/options-select';
import useQueryErrorMessage from '../../hooks/use-query-error-message';
import useGroupOptionsQuery from '../../queries/use-group-options-query';
import useUnitOptionsQuery from '../../queries/use-unit-options-query';
import { getScopeTypeKeys } from '../../utils/utils';
import type { ScopeType } from '../../utils/types';

// Who the duty applies to: a tab per scope type, and the group or unit picker of the active one.
// Each list loads the first time its tab is opened; a pick on the other tab is kept but not used.
const ScopeTargetFields = () => {
  const [t] = useTr();
  const form = Form.useFormInstance();
  const scopeType: ScopeType = Form.useWatch('scopeType', form) ?? 'GROUP';
  const isUnit = scopeType === 'UNIT';
  const groups = useGroupOptionsQuery(!isUnit);
  const units = useUnitOptionsQuery(isUnit);
  const { data: options, isLoading, error } = isUnit ? units : groups;
  const { fieldLabelKey, requiredKey } = getScopeTypeKeys(scopeType);
  const fieldName = isUnit ? 'unit' : 'group';
  useQueryErrorMessage(error);

  return (
    <S.TargetBox>
      <Form.Item name='scopeType' noStyle>
        <ScopeTypeTabs />
      </Form.Item>
      <Form.Item
        // Keyed, so switching tabs swaps in the other field with its own value and errors
        key={fieldName}
        name={fieldName}
        label={t(fieldLabelKey)}
        style={{ marginBottom: 0 }}
        rules={[{ required: true, message: t(requiredKey) }]}
      >
        <OptionsSelect isLoading={isLoading} options={options} placeholder={t('select_placeholder')} />
      </Form.Item>
    </S.TargetBox>
  );
};

export default ScopeTargetFields;
