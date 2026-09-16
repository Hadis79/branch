import { Form } from 'antd';
import { useEffect, useRef, useState } from 'react';

import { Box, Button, MessageBox } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import FileEntry from './file-entry';
import ManualEntry from './manual-entry';
import ManualEditEntry from './manual-edit-entry';
import ConfirmModal from '../modals/confirm-modal';
import { EntryMode, WorkingCalendarGroupPage } from '../../utils/constants';
import { GroupFormValues, GroupFormVariant, GroupRequestDto, toGroupRequestDto } from '../../utils/types';
import useGroupFileUpload from '../../hooks/use-group-file-upload';
import useGroupMessage from '../../hooks/use-group-message';
import useWorkingCalendarGroupPage from '../../hooks/use-working-calendar-group-page';
import useCreateGroupsMutation from '../../queries/use-create-group-mutation';
import useUpdateGroupMutation from '../../queries/use-update-group-mutation';
import useGroupStore from '../../store/use-widget-store';
import { fetchAllGroupUnits } from '../../services/group-units';
import { applyUnitChanges, formatCount, toGroupUnit } from '../../utils/utils';

import { FormActions, StyledTabs, WarningBanner } from './style';

type GroupFormProps = {
  variant: GroupFormVariant;
};

type SaveCallbacks = {
  onSuccess: () => void;
  onError: (error: Error) => void;
};

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
  // The group name and unit count come from the row picked in the list
  const selectedGroup = useGroupStore((state) => state.selectedGroup);
  const editedGroup = isEdit && selectedGroup?.id === groupId ? selectedGroup : null;
  const isMissingGroup = isEdit && !editedGroup;
  const createGroup = useCreateGroupsMutation();
  const updateGroup = useUpdateGroupMutation();
  // Manual edits are applied to the full unit list, which is collected from all service pages on save
  const [isCollectingUnits, setIsCollectingUnits] = useState(false);
  const isSaving = createGroup.isPending || updateGroup.isPending || isCollectingUnits;
  const previousUnitCount = editedGroup?.size;
  // Replacing members needs a new file before anything can be saved
  const isSaveDisabled = isEdit && isFileEntry && !fileUpload.units.length;

  // Drop messages left over from the list page
  useEffect(() => resetMessage(), [resetMessage]);

  useEffect(() => {
    if (editedGroup) form.setFieldsValue({ name: editedGroup.name });
  }, [editedGroup, form]);

  // Opened without picking a group (e.g. a link in another tab): there is nothing to edit
  const hasRedirected = useRef(false);
  useEffect(() => {
    if (!isMissingGroup || hasRedirected.current) return;

    hasRedirected.current = true;
    navigateTo(WorkingCalendarGroupPage.LIST);
  }, [isMissingGroup, navigateTo]);

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

  const handleSaveError = (error: unknown) => {
    setIsConfirmModalOpen(false);
    showError(error);
  };

  // Full list for a manual edit: the group's current units with the form's changes applied
  const collectEditedUnits = async (values: GroupFormValues) => {
    const currentUnits = await fetchAllGroupUnits(groupId as string);
    return applyUnitChanges(
      currentUnits,
      (values.addedUnits ?? []).map(toGroupUnit),
      (values.removedUnits ?? []).map(({ code }) => code)
    );
  };

  const buildRequestBody = async (values: GroupFormValues): Promise<GroupRequestDto> => {
    if (isFileEntry) return { name: values.name, units: fileUpload.units };
    if (!isEdit) return toGroupRequestDto(values);

    setIsCollectingUnits(true);
    try {
      return { name: values.name, units: await collectEditedUnits(values) };
    } finally {
      setIsCollectingUnits(false);
    }
  };

  const handleConfirm = async () => {
    if (isSaving) return;

    if (isFileEntry && !fileUpload.validate()) {
      setIsConfirmModalOpen(false);
      return;
    }

    const values: GroupFormValues = form.getFieldsValue(true);

    try {
      const body = await buildRequestBody(values);
      saveGroup(body, { onSuccess: () => handleSaveSuccess(values.name), onError: handleSaveError });
    } catch (error) {
      handleSaveError(error);
    }
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
      {isFileEntry ? fileEntry : editedGroup && <ManualEditEntry group={editedGroup} />}
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

  if (isMissingGroup) return null;

  return (
    <>
      <Form layout='vertical' form={form} onFinish={() => setIsConfirmModalOpen(true)}>
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
