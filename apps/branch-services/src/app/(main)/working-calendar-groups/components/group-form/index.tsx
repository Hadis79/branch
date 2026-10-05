import { Form } from 'antd';
import { useEffect, useRef, useState } from 'react';

import { Box, Button } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import FileEntry from './file-entry';
import ManualEntry from './manual-entry';
import EditEntry from './edit-entry';
import ConfirmModal from '../modals/confirm-modal';
import { EntryMode, WorkingCalendarGroupPage } from '../../utils/constants';
import type { GroupFormValues, GroupFormVariant } from '../../utils/types';
import useGroupFileUpload from '../../hooks/use-group-file-upload';
import useGroupMessage from '../../hooks/use-group-message';
import useWorkingCalendarGroupPage from '../../hooks/use-working-calendar-group-page';
import useSaveGroup from '../../hooks/use-save-group';
import useGroupUnitsQuery from '../../queries/use-group-units-query';
import useGroupStore from '../../store/use-widget-store';

import { FormActions, StyledTabs } from './style';

type GroupFormProps = {
  variant: GroupFormVariant;
};

const GroupForm = ({ variant }: GroupFormProps) => {
  const isEdit = variant === 'edit';
  const [t] = useTr();
  const [form] = Form.useForm<GroupFormValues>();
  const { showSuccess, showError, resetMessage } = useGroupMessage();
  const { groupId, editMode, navigateTo, navigateToDetails, navigateToGroupDetails } = useWorkingCalendarGroupPage();
  const setUploadedUnits = useGroupStore((state) => state.setUploadedUnits);

  // In create mode the user picks the entry mode with tabs, in edit mode it comes from the URL
  const [activeTab, setActiveTab] = useState<EntryMode>(EntryMode.FILE);
  const entryMode = isEdit ? editMode : activeTab;
  const isFileEntry = entryMode === EntryMode.FILE;

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const fileUpload = useGroupFileUpload(form);
  // The group name and unit count come from the row picked in the list
  const selectedGroup = useGroupStore((state) => state.selectedGroup);
  // Compared as strings: the URL param is a string, and older stored rows may hold a numeric id
  const editedGroup = isEdit && selectedGroup && String(selectedGroup.id) === groupId ? selectedGroup : null;
  const isMissingGroup = isEdit && !editedGroup;
  const { save, isSaving } = useSaveGroup();
  // Backs the result box's unit count until a new file is uploaded (only fetched in the file-replace edit form)
  const previousUnits = useGroupUnitsQuery(isEdit && isFileEntry ? groupId : null, { page: 1, size: 1 });

  useEffect(() => {
    resetMessage();

    return () => {
      // Form errors must not follow the user back to the list; success messages should.
      const { message, resetMessage: clearMessage } = useGroupStore.getState();
      if (message?.type === 'error') clearMessage();
    };
  }, [resetMessage]);

  useEffect(() => {
    if (editedGroup) form.setFieldsValue({ name: editedGroup.name, groupType: editedGroup.groupType });
  }, [editedGroup, form]);

  // Opened without picking a group (e.g. a link in another tab): there is nothing to edit
  const hasRedirected = useRef(false);
  useEffect(() => {
    if (!isMissingGroup || hasRedirected.current) return;

    hasRedirected.current = true;
    navigateTo(WorkingCalendarGroupPage.LIST);
  }, [isMissingGroup, navigateTo]);

  const handleCancel = () => {
    fileUpload.reset();
    form.resetFields();
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

  const handleConfirm = async () => {
    if (isSaving || fileUpload.isPending || (isEdit && !groupId)) return;

    // Create needs a file; edit can also just rename the group and keep its existing units
    if (isFileEntry && (!isEdit || form.getFieldValue('file')?.length) && !fileUpload.validate()) {
      setIsConfirmModalOpen(false);
      return;
    }

    const values: GroupFormValues = form.getFieldsValue(true);
    // Edit only shows the type (locked); the group's existing one travels through unchanged
    const groupType = isEdit ? editedGroup?.groupType : values.groupType;
    if (!groupType) return;

    try {
      const saved = await save({
        values,
        groupType,
        target: isEdit && groupId ? { variant: 'edit', id: groupId } : { variant: 'create' },
        isFileEntry,
        uploadedUnits: fileUpload.result?.units,
      });
      if (saved) handleSaveSuccess(values.name);
    } catch (error) {
      handleSaveError(error);
    }
  };

  const handleViewNewFileDetails = () => {
    if (fileUpload.result) setUploadedUnits(fileUpload.result.units);
    navigateToDetails();
  };
  const handleViewPreviousDetails = () => {
    if (groupId) navigateToGroupDetails(groupId);
  };

  const fileEntry = (
    <FileEntry
      loading={fileUpload.isPending}
      uploadError={fileUpload.errorText}
      onUpload={fileUpload.upload}
      onRemove={fileUpload.reset}
      uploadResult={fileUpload.result}
      previousUnitCount={isEdit && isFileEntry ? previousUnits.data?.totalElements : undefined}
      inlineName={isEdit}
      onViewNewFileDetails={handleViewNewFileDetails}
      onViewPreviousDetails={handleViewPreviousDetails}
    />
  );

  const entryContent = isEdit ? (
    editedGroup && <EditEntry group={editedGroup} isFileEntry={isFileEntry} fileEntry={fileEntry} />
  ) : (
    <StyledTabs
      activeKey={activeTab}
      className='half-width'
      items={[
        { key: EntryMode.FILE, label: t('file_upload'), children: fileEntry },
        { key: EntryMode.MANUAL, label: t('manual_entry'), children: <ManualEntry /> },
      ]}
      onChange={(key) => {
        if (key !== activeTab && (key === EntryMode.FILE || key === EntryMode.MANUAL)) {
          handleCancel();
          setActiveTab(key);
        }
      }}
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
            {!isEdit && (
              <Button htmlType='button' type='primaryOutlined' onClick={handleCancel}>
                {t('button.cancel')}
              </Button>
            )}
            <Button htmlType='submit' type='primary' disabled={isSaving || fileUpload.isPending}>
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
