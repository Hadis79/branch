import { useState } from 'react';
import { Form } from 'antd';

import { Box } from '@branch-services/ui-kit';

import FileEntry from './file-entry';
import FormPage from '../form-page/form-page';
import ConfirmCreateModal from '../holiday-modal/confirm-create-modal';
import useFinishCreate from '../../hooks/use-finish-create';
import useHolidayFileUpload from '../../hooks/use-holiday-file-upload';
import useHolidayPage from '../../hooks/use-holiday-page';
import useCreateOfficialMutation from '../../queries/use-create-official-mutation';
import { HolidayPage } from '../../utils/constants';

// Official holidays, added by uploading an excel file
const UploadForm = () => {
  const [form] = Form.useForm();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { navigateTo } = useHolidayPage();
  const fileUpload = useHolidayFileUpload(form);
  const createOfficial = useCreateOfficialMutation();
  const finish = useFinishCreate();

  const handleConfirm = () =>
    createOfficial.mutate(
      { holidays: fileUpload.result?.holidays ?? [] },
      {
        onSuccess: () => finish.onSuccess('official_success'),
        onError: finish.onError,
        onSettled: () => setIsConfirmOpen(false),
      }
    );

  const handleReset = () => {
    setIsConfirmOpen(false);
    createOfficial.reset();
    fileUpload.reset();
  };

  return (
    <FormPage
      submitText='create_holidays'
      submitDisabled={Boolean(fileUpload.result?.duplicateCount)}
      onReset={handleReset}
      onSubmit={() =>
        form.validateFields().then(
          () => fileUpload.validate() && setIsConfirmOpen(true),
          () => undefined
        )
      }
    >
      <Form form={form} layout='vertical'>
        <Box flexDirection='column' width='50%'>
          <FileEntry
            result={fileUpload.result}
            loading={fileUpload.isPending}
            onUpload={fileUpload.upload}
            onRemove={fileUpload.remove}
            onViewDetails={() => navigateTo(HolidayPage.UPLOAD_DETAILS)}
          />
        </Box>
      </Form>
      <ConfirmCreateModal
        open={isConfirmOpen}
        kind='official'
        loading={createOfficial.isPending}
        onConfirm={handleConfirm}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </FormPage>
  );
};

export default UploadForm;
