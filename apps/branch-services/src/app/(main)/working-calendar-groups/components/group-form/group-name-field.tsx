import { KeyboardEvent, useState } from 'react';
import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Button, Input } from '@branch-services/ui-kit';

import { GroupFormValues } from '../../utils/types';

import { GroupName, NameRow } from './style';

type GroupNameFieldProps = {
  // Edit form: the name is shown as a heading and edited in place
  inline?: boolean;
};

const GroupNameField = ({ inline = false }: GroupNameFieldProps) => {
  const [t] = useTr();
  const form = Form.useFormInstance<GroupFormValues>();
  const name = Form.useWatch('name', form);
  const [isEditing, setIsEditing] = useState(false);
  const isInputVisible = !inline || isEditing;

  const confirmName = () =>
    form
      .validateFields(['name'])
      .then(() => setIsEditing(false))
      .catch(() => undefined);

  // Enter confirms the name instead of submitting the whole form
  const handlePressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!inline) return;
    event.preventDefault();
    confirmName();
  };

  const field = (
    <Form.Item
      name='name'
      label={inline ? undefined : t('group_name')}
      rules={[{ required: true, whitespace: true, message: t('group_name_required') }]}
      hidden={!isInputVisible}
      className='group-name-input'
    >
      <Input placeholder={t('group_name_placeholder')} onPressEnter={handlePressEnter} />
    </Form.Item>
  );

  if (!inline) return field;

  return (
    <NameRow>
      {!isEditing && (
        <>
          <GroupName>{name}</GroupName>
          <Button type='link' icon={<i className='ri-edit-line' />} onClick={() => setIsEditing(true)}>
            {t('edit_name')}
          </Button>
        </>
      )}
      {field}
      {isEditing && (
        <Button
          htmlType='button'
          type='primaryOutlined'
          icon={<i className='ri-check-line' />}
          onClick={confirmName}
          aria-label={t('confirm_name')}
        />
      )}
    </NameRow>
  );
};

export default GroupNameField;
