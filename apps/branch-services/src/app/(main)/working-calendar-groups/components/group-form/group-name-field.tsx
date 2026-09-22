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

  const suffix = inline ? (
    <i
      className='ri-check-line'
      role='button'
      aria-label={t('confirm_name')}
      // Keep focus on the input so the click isn't lost to a blur first
      onMouseDown={(event) => event.preventDefault()}
      onClick={confirmName}
    />
  ) : undefined;

  const field = (
    <Form.Item
      name='name'
      label={inline ? undefined : t('group_name')}
      rules={[{ required: true, whitespace: true, message: t('group_name_required') }]}
      hidden={!isInputVisible}
      className='group-name-input'
    >
      <Input placeholder={t('group_name_placeholder')} onPressEnter={handlePressEnter} suffix={suffix} />
    </Form.Item>
  );

  if (!inline) return field;

  return (
    <NameRow>
      {!isEditing && (
        <>
          <GroupName>{name}</GroupName>
          <Button type='link' onClick={() => setIsEditing(true)}>
            {t('edit_name')}
            <i className='ri-edit-line' />
          </Button>
        </>
      )}
      {field}
    </NameRow>
  );
};

export default GroupNameField;
