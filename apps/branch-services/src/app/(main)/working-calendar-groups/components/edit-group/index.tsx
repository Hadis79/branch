import { Form, TabsProps, UploadProps } from 'antd';
import React, { useState } from 'react';

import { Box, Button } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

import AddGroupManually from './manually';
import GroupFileEntry from './upload-file';
import ConfirmModal from '../modals/confirm-modal';
import useWidgetStore from '../../store/use-widget-store';
import { WorkingCalendarGroupPage } from '../../utils/constants';
import { AddGroupFormValues, toGroupRequestDto } from '../../utils/types';
import useUploadFileMutation from '../../queries/use-upload-file-mutation';
import useWorkingCalendarGroupPage from '../../hooks/use-working-calendar-group-page';
import useCreateGroupsMutation from '../../queries/use-create-group-mutation';

import { StyledTabs } from './style';

const EditGroup = () => {
  const [t] = useTr();
  const [form] = Form.useForm<AddGroupFormValues>();

  const [activeKeyTab, setActiveKeyTab] = useState('file-entry');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const createGroup = useCreateGroupsMutation();
  const uploadGroupFile = useUploadFileMutation();
  const { navigateTo } = useWorkingCalendarGroupPage();
  const { setMessage } = useWidgetStore();

  const handleFileUpload: NonNullable<UploadProps['customRequest']> = ({ file, onError, onSuccess }) => {
    uploadGroupFile.mutate(
      { file: file as File },
      {
        onSuccess: (result) => {
          if (result.success === false) {
            onError?.(new Error(t('group_file_upload_failed')));
            return;
          }

          form.setFields([{ name: 'file', errors: [] }]);
          onSuccess?.(result);
        },
        onError: (error) => onError?.(error),
      }
    );
  };

  const handleFileRemove = () => {
    uploadGroupFile.reset();
  };

  const tabs = [
    {
      key: 'file-entry',
      label: t('file_upload'),
      children: (
        <GroupFileEntry
          loading={uploadGroupFile.isPending}
          onUpload={handleFileUpload}
          onRemove={handleFileRemove}
          uploadResult={uploadGroupFile.data}
        />
      ),
    },
    { key: 'manualy', label: t('manual_entry'), children: <AddGroupManually /> },
  ];
  const handleChange: TabsProps['onChange'] = (key) => {
    setActiveKeyTab(key);
  };

  const handleCancel = () => {
    form.resetFields();
    uploadGroupFile.reset();
  };

  const handleCreateSuccess = (status: number, groupName: string) => {
    if (status !== 200) return;

    setMessage({
      txt: t('create_group_success', { groupName }),
      type: 'success',
      shouldTranslate: false,
    });
    setIsConfirmModalOpen(false);
    form.resetFields();
    navigateTo(WorkingCalendarGroupPage.LIST);
  };

  const handleConfirm = () => {
    if (createGroup.isPending) return;

    const values = form.getFieldsValue(true);
    const isFileEntry = activeKeyTab === 'file-entry';
    const uploadedUnits = uploadGroupFile.data?.units;

    if (isFileEntry) {
      if (!uploadGroupFile.isSuccess || uploadGroupFile.data?.success === false || !uploadedUnits?.length) {
        form.setFields([{ name: 'file', errors: [t('group_file_upload_failed')] }]);
        setIsConfirmModalOpen(false);
        return;
      }
    }

    const requestBody = isFileEntry ? { name: values.name, units: uploadedUnits! } : toGroupRequestDto(values);

    createGroup.mutate(requestBody, {
      onSuccess: (status) => handleCreateSuccess(status, values.name),
    });
  };
  const handleFinish = () => setIsConfirmModalOpen(true);

  return (
    <>
      <Form layout='vertical' form={form} onFinish={handleFinish}></Form>
    </>
  );
};

export default EditGroup;
