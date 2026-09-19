import { useState } from 'react';
import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { Box, Select } from '@branch-services/ui-kit';

import FileEntry from './file-entry';
import SampleFileLink from './sample-file-link';
import FormPage from '../form-page/form-page';
import ConfirmCreateModal from '../holiday-modal/confirm-create-modal';
import useFinishCreate from '../../hooks/use-finish-create';
import useHolidayFileUpload from '../../hooks/use-holiday-file-upload';
import useHolidayPage from '../../hooks/use-holiday-page';
import useCreateOfficialMutation from '../../queries/use-create-official-mutation';
import useHolidayStore from '../../store/use-widget-store';
import { HolidayPage, HolidayTab } from '../../utils/constants';
import { getYearOptions } from '../../utils/utils';

// Official holidays of a year, added by uploading an excel file
const UploadForm = () => {
  const [t] = useTr();
  const [form] = Form.useForm<{ year?: number }>();
  const year = Form.useWatch('year', form);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { navigateTo } = useHolidayPage();
  const setUploadedHolidays = useHolidayStore((state) => state.setUploadedHolidays);
  const fileUpload = useHolidayFileUpload(form);
  const createOfficial = useCreateOfficialMutation();
  const finish = useFinishCreate(HolidayTab.OFFICIAL);
  const holidays = fileUpload.result?.holidays ?? [];

  const handleViewDetails = () => {
    setUploadedHolidays(holidays);
    navigateTo(HolidayPage.UPLOAD_DETAILS);
  };

  const handleConfirm = () =>
    createOfficial.mutate(
      { year: year as number, holidays },
      {
        onSuccess: () =>
          finish.onSuccess({ txt: t('official_success', { year }), type: 'success', shouldTranslate: false }),
        onError: finish.onError,
        onSettled: () => setIsConfirmOpen(false),
      }
    );

  return (
    <FormPage
      info='upload_info'
      infoDescription={<SampleFileLink />}
      submitText='create_holidays'
      submitDisabled={Boolean(fileUpload.result?.duplicateCount)}
      onSubmit={() =>
        form.validateFields().then(
          () => setIsConfirmOpen(true),
          () => undefined
        )
      }
    >
      <Form form={form} layout='vertical'>
        <Box flexDirection='column' width='50%'>
          <Form.Item name='year' label={t('year')} rules={[{ required: true, message: t('year_required') }]}>
            <Select options={getYearOptions()} placeholder={t('select_placeholder')} />
          </Form.Item>
          <FileEntry
            result={fileUpload.result}
            loading={fileUpload.isPending}
            onUpload={fileUpload.upload}
            onRemove={fileUpload.remove}
            onViewDetails={handleViewDetails}
          />
        </Box>
      </Form>
      <ConfirmCreateModal
        open={isConfirmOpen}
        textKey='confirm_official'
        params={{ year: year ?? '' }}
        confirmText='create'
        loading={createOfficial.isPending}
        onConfirm={handleConfirm}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </FormPage>
  );
};

export default UploadForm;
