import { Form, Spin } from 'antd';
import { useEffect, useState } from 'react';

import { Box, Button, MessageBox } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import FileEntry from './file-entry';
import ManualEntry from './manual-entry';
import ManualEditEntry from './manual-edit-entry';
import ConfirmModal from '../modals/confirm-modal';
import { EntryMode, WorkingCalendarGroupPage } from '../../utils/constants';
import { GroupDetails, GroupFormValues, GroupFormVariant, GroupRequestDto, toGroupRequestDto } from '../../utils/types';
import useGroupFileUpload from '../../hooks/use-group-file-upload';
import useGroupMessage from '../../hooks/use-group-message';
import useWorkingCalendarGroupPage from '../../hooks/use-working-calendar-group-page';
import useGroupDetailsQuery from '../../queries/use-group-details-query';
import useCreateGroupsMutation from '../../queries/use-create-group-mutation';
import useUpdateGroupMutation from '../../queries/use-update-group-mutation';
import { formatCount } from '../../utils/utils';

import { FormActions, StyledTabs, WarningBanner } from './style';

type GroupFormProps = {
  variant: GroupFormVariant;
};

type SaveCallbacks = {
  onSuccess: () => void;
  onError: (error: Error) => void;
};

const toFormValues = ({ name, units }: GroupDetails): GroupFormValues => ({
  name,
  units: units.map(({ name, code }) => ({ label: name, value: code })),
});

const GroupForm = ({ variant }: GroupFormProps) => {
  const isEdit = variant === 'edit';
  const [t] = useTr();
  const [form] = Form.useForm<GroupFormValues>();
  const { showSuccess, showError, resetMessage } = useGroupMessage();
  const { groupId, editMode, navigateTo } = useWorkingCalendarGroupPage();

  // In create mode the user picks the entry mode with tabs, in edit mode it comes from the URL
  const [activeTab, setActiveTab] = useState<EntryMode>(EntryMode.FILE);
  const entryMode = isEdit ? editMode : activeTab;
  const isFileEntry = entryMode === EntryMode.FILE;

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isReplaceWarningVisible, setIsReplaceWarningVisible] = useState(true);
  const fileUpload = useGroupFileUpload(form);
  const groupDetails = useGroupDetailsQuery(isEdit ? groupId : null);
  const createGroup = useCreateGroupsMutation();
  const updateGroup = useUpdateGroupMutation();
  const isSaving = createGroup.isPending || updateGroup.isPending;
  const previousUnitCount = groupDetails.data?.units.length;
  // Replacing members needs a new file before anything can be saved
  const isSaveDisabled = isEdit && isFileEntry && !fileUpload.units.length;

  // Drop messages left over from the list page
  useEffect(() => resetMessage(), [resetMessage]);

  useEffect(() => {
    if (groupDetails.data) form.setFieldsValue(toFormValues(groupDetails.data));
  }, [groupDetails.data, form]);

  const saveGroup = (body: GroupRequestDto, callbacks: SaveCallbacks) => {
    if (!isEdit) createGroup.mutate(body, callbacks);
    else if (groupId) updateGroup.mutate({ id: groupId, ...body }, callbacks);
  };

  const handleCancel = () => {
    fileUpload.reset();
    if (isEdit) navigateTo(WorkingCalendarGroupPage.LIST);
    else form.resetFields();
  };

  const handleSaveSuccess = (groupName: string) => {
    showSuccess(`${variant}_group_success`, { groupName });
    setIsConfirmModalOpen(false);
    navigateTo(WorkingCalendarGroupPage.LIST);
  };

  const handleConfirm = () => {
    if (isSaving) return;

    if (isFileEntry && !fileUpload.validate()) {
      setIsConfirmModalOpen(false);
      return;
    }

    const values = form.getFieldsValue(true);
    const body = isFileEntry ? { name: values.name, units: fileUpload.units } : toGroupRequestDto(values);

    saveGroup(body, {
      onSuccess: () => handleSaveSuccess(values.name),
      onError: (error) => {
        setIsConfirmModalOpen(false);
        showError(error);
      },
    });
  };

  const fileEntry = (
    <FileEntry
      loading={fileUpload.isPending}
      onUpload={fileUpload.upload}
      onRemove={fileUpload.reset}
      uploadResult={fileUpload.result}
      inlineName={isEdit}
    />
  );

  const entryContent = isEdit ? (
    <Box flexDirection='column'>
      {isFileEntry && isReplaceWarningVisible && previousUnitCount !== undefined && (
        <WarningBanner>
          <MessageBox
            type='warning'
            message={t('replace_members_warning', { unitCount: formatCount(previousUnitCount) })}
            closable
            onClose={() => setIsReplaceWarningVisible(false)}
          />
        </WarningBanner>
      )}
      {!isFileEntry && (
        <WarningBanner>
          <MessageBox type='info' message={t('manual_edit_info')} />
        </WarningBanner>
      )}
      {isFileEntry ? fileEntry : <ManualEditEntry />}
    </Box>
  ) : (
    <StyledTabs
      activeKey={activeTab}
      className='half-width'
      items={[
        { key: EntryMode.FILE, label: t('file_upload'), children: fileEntry },
        { key: EntryMode.MANUAL, label: t('manual_entry'), children: <ManualEntry /> },
      ]}
      onChange={(key) => setActiveTab(key as EntryMode)}
      destroyInactiveTabPane
      centered
    />
  );

  return (
    <>
      <Spin spinning={groupDetails.isFetching}>
        <Form
          layout='vertical'
          form={form}
          onFinish={() => setIsConfirmModalOpen(true)}
          disabled={isEdit && !groupDetails.data}
        >
          <Box minHeight={'75vh'} flexDirection='column' justifyContent='space-between' padding={'3.2rem'}>
            {entryContent}
            <FormActions>
              <Button htmlType='button' type='primaryOutlined' onClick={handleCancel}>
                {t('button.cancel')}
              </Button>
              <Button htmlType='submit' type='primary' disabled={isSaveDisabled}>
                {t(isEdit ? 'save_changes' : 'create_group')}
              </Button>
            </FormActions>
          </Box>
        </Form>
      </Spin>
      <ConfirmModal
        variant={variant}
        entryMode={entryMode}
        open={isConfirmModalOpen}
        onCancel={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        confirmLoading={isSaving || fileUpload.isPending}
        groupName={form.getFieldValue('name')}
        unitCount={isFileEntry ? fileUpload.unitCount : form.getFieldValue('units')?.length ?? 0}
      />
    </>
  );
};

export default GroupForm;
