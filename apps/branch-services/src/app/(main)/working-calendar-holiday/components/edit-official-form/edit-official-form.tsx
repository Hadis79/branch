import { useEffect, useState } from 'react';
import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { useAppTheme } from '@branch-services/hooks';
import { Box, Button, MessageBox, Select, Text } from '@branch-services/ui-kit';

import FileEntry from '../upload-form/file-entry';
import SampleFileLink from '../upload-form/sample-file-link';
import { FileInfo } from '../upload-form/upload-form.style';
import ConfirmEditModal from '../holiday-modal/confirm-edit-modal';
import DiscardEditModal from '../holiday-modal/discard-edit-modal';
import useHolidayFileUpload from '../../hooks/use-holiday-file-upload';
import useFinishCreate from '../../hooks/use-finish-create';
import useHolidayPage from '../../hooks/use-holiday-page';
import useOfficialHolidaysQuery from '../../queries/use-official-holidays-query';
import useUpdateOfficialMutation from '../../queries/use-update-official-mutation';
import useHolidayStore from '../../store/use-widget-store';
import { HolidayPage, HolidayTab } from '../../utils/constants';
import { formatCount, getFutureYearOptions } from '../../utils/utils';

// Replaces one official year's holidays with an uploaded file
const EditOfficialForm = () => {
  const [t] = useTr();
  const theme = useAppTheme();
  const [form] = Form.useForm<{ year?: number }>();
  const selectedYear = Form.useWatch('year', form);
  const { year: initialYear, navigateTo } = useHolidayPage();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDiscardOpen, setIsDiscardOpen] = useState(false);
  const setUploadedHolidays = useHolidayStore((state) => state.setUploadedHolidays);
  const setFormOrigin = useHolidayStore((state) => state.setFormOrigin);
  const fileUpload = useHolidayFileUpload(form);
  const updateOfficial = useUpdateOfficialMutation();
  const finish = useFinishCreate(HolidayTab.OFFICIAL);
  const previous = useOfficialHolidaysQuery(initialYear);
  // Until a new file is uploaded, saving keeps the year's existing holidays instead of wiping them
  const holidays = fileUpload.result?.holidays ?? previous.data ?? [];

  useEffect(() => {
    if (initialYear) form.setFieldValue('year', initialYear);
  }, [initialYear, form]);

  const handleBack = () => {
    if (fileUpload.result) setIsDiscardOpen(true);
    else navigateTo(HolidayPage.LIST);
  };

  const handleDiscard = () => {
    fileUpload.remove();
    navigateTo(HolidayPage.LIST);
  };

  const handleViewNewFile = () => {
    setUploadedHolidays(holidays, HolidayPage.EDIT);
    navigateTo(HolidayPage.UPLOAD_DETAILS, { year: initialYear as number });
  };

  const handleViewPrevious = () => {
    setFormOrigin(HolidayPage.EDIT);
    navigateTo(HolidayPage.DETAILS, { year: initialYear as number });
  };

  const handleConfirm = () =>
    updateOfficial.mutate(
      { year: selectedYear as number, holidays },
      {
        onSuccess: () =>
          finish.onSuccess({
            txt: t('official_edit_success', { year: selectedYear }),
            type: 'success',
            shouldTranslate: false,
          }),
        onError: finish.onError,
        onSettled: () => setIsConfirmOpen(false),
      }
    );

  // Opened without a year, e.g. a stale link: nothing to edit
  if (!initialYear) return null;

  return (
    <Box minHeight='75vh' flexDirection='column' justifyContent='space-between' gap='2.4rem' padding='3.2rem'>
      <Box flexDirection='column' gap='2.4rem'>
        <MessageBox type='warning' message={t('edit_official_warning')} description={<SampleFileLink />} closable />
        <Form form={form} layout='vertical'>
          <Box flexDirection='column' width='50%' gap='2.4rem'>
            <Form.Item name='year' label={t('year')} style={{ marginBottom: 0 }}>
              <Select disabled options={getFutureYearOptions()} />
            </Form.Item>
            <Box flexDirection='column' gap='1.2rem'>
              <FileEntry
                result={fileUpload.result}
                loading={fileUpload.isPending}
                onUpload={fileUpload.upload}
                onRemove={fileUpload.remove}
                onViewDetails={handleViewNewFile}
              />
              {/* The year's current file, until a new one is uploaded and its result takes this place */}
              {!fileUpload.result && (
                <FileInfo>
                  <Box justifyContent='space-between' alignItems='center' fillChildren={false}>
                    <Text as='span'>{t('prev_file_information')}</Text>
                    <Button
                      type='link'
                      icon={<i className='ri-arrow-left-s-line' />}
                      iconPosition='end'
                      onClick={handleViewPrevious}
                      size='small'
                    >
                      {t('view_file_details')}
                    </Button>
                  </Box>
                  <Box justifyContent='space-between' fillChildren={false}>
                    <Text as='span' fontWeight={400} color={theme.textSecondary}>
                      {t('day_count')}
                    </Text>
                    <Text as='span'>{formatCount(previous.data?.length ?? 0)}</Text>
                  </Box>
                </FileInfo>
              )}
            </Box>
          </Box>
        </Form>
      </Box>
      <Box justifyContent='flex-end' gap='1.2rem' fillChildren={false}>
        <Button
          htmlType='button'
          type='primary'
          // disabled={!fileUpload.result}
          onClick={() => setIsConfirmOpen(true)}
        >
          {t('save_changes')}
        </Button>
      </Box>
      <ConfirmEditModal
        open={isConfirmOpen}
        dayCount={holidays.length}
        loading={updateOfficial.isPending}
        onConfirm={handleConfirm}
        onCancel={() => setIsConfirmOpen(false)}
      />
      <DiscardEditModal
        open={isDiscardOpen}
        onDiscard={handleDiscard}
        onContinueEditing={() => setIsDiscardOpen(false)}
      />
    </Box>
  );
};

export default EditOfficialForm;
