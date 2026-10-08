import { Form } from 'antd';
import { useEffect, useRef, useState } from 'react';

import useGroupFileUpload from './use-group-file-upload';
import useGroupMessage from './use-group-message';
import useSaveGroup from './use-save-group';
import useWorkingCalendarGroupPage from './use-working-calendar-group-page';
import useGroupUnitsQuery from '../queries/use-group-units-query';
import useGroupStore from '../store/use-widget-store';
import { EntryMode, WorkingCalendarGroupPage } from '../utils/constants';
import type { GroupFormValues, GroupFormVariant } from '../utils/types';

const useGroupFormController = (variant: GroupFormVariant) => {
  const isEdit = variant === 'edit';
  const [form] = Form.useForm<GroupFormValues>();
  const { showSuccess, showError, resetMessage } = useGroupMessage();
  const { groupId, editMode, navigateTo, navigateToDetails, navigateToGroupDetails } = useWorkingCalendarGroupPage();
  const setUploadedUnits = useGroupStore((state) => state.setUploadedUnits);
  const selectedGroup = useGroupStore((state) => state.selectedGroup);
  const [activeTab, setActiveTab] = useState<EntryMode>(EntryMode.FILE);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const fileUpload = useGroupFileUpload(form);
  const { save, isSaving } = useSaveGroup();

  const entryMode = isEdit ? editMode : activeTab;
  const isFileEntry = entryMode === EntryMode.FILE;
  const editedGroup = isEdit && selectedGroup && String(selectedGroup.id) === groupId ? selectedGroup : null;
  const isMissingGroup = isEdit && !editedGroup;
  const previousUnits = useGroupUnitsQuery(isEdit && isFileEntry ? groupId : null, { page: 1, size: 1 });
  const isBusy = isSaving || fileUpload.isPending;

  useEffect(() => {
    resetMessage();

    return () => {
      const { message, resetMessage: clearMessage } = useGroupStore.getState();
      if (message?.type === 'error') clearMessage();
    };
  }, [resetMessage]);

  useEffect(() => {
    if (editedGroup) form.setFieldsValue({ name: editedGroup.name, groupType: editedGroup.groupType });
  }, [editedGroup, form]);

  const hasRedirected = useRef(false);
  useEffect(() => {
    if (!isMissingGroup || hasRedirected.current) return;

    hasRedirected.current = true;
    navigateTo(WorkingCalendarGroupPage.LIST);
  }, [isMissingGroup, navigateTo]);

  const resetEntry = () => {
    fileUpload.reset();
    form.resetFields();
  };

  const changeEntryMode = (mode: string) => {
    if (mode === activeTab || (mode !== EntryMode.FILE && mode !== EntryMode.MANUAL)) return;

    resetEntry();
    setActiveTab(mode);
  };

  const confirmSave = async () => {
    if (isBusy || (isEdit && !groupId)) return;

    if (isFileEntry && (!isEdit || form.getFieldValue('file')?.length) && !fileUpload.validate()) {
      setIsConfirmOpen(false);
      return;
    }

    const values = form.getFieldsValue(true);
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

      if (saved) {
        showSuccess(`${variant}_group_success`, { groupName: values.name });
        setIsConfirmOpen(false);
        navigateTo(WorkingCalendarGroupPage.LIST);
      }
    } catch (error) {
      setIsConfirmOpen(false);
      showError(error);
    }
  };

  const showNewFileDetails = () => {
    if (fileUpload.result) setUploadedUnits(fileUpload.result.units);
    navigateToDetails();
  };

  const showPreviousDetails = () => {
    if (groupId) navigateToGroupDetails(groupId);
  };

  return {
    form,
    isEdit,
    isFileEntry,
    isMissingGroup,
    isBusy,
    activeTab,
    entryMode,
    editedGroup,
    fileUpload,
    previousUnitCount: previousUnits.data?.totalElements,
    isConfirmOpen,
    openConfirm: () => setIsConfirmOpen(true),
    closeConfirm: () => setIsConfirmOpen(false),
    resetEntry,
    changeEntryMode,
    confirmSave,
    showNewFileDetails,
    showPreviousDetails,
  };
};

export default useGroupFormController;
