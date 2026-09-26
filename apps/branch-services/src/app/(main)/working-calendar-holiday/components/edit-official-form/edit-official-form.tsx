import { useEffect, useState } from 'react';
import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { useAppTheme } from '@branch-services/hooks';
import { dayjs } from '@branch-services/utils';
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
import { formatCount, formatYear } from '../../utils/utils';

// Last 10 years, in the same Jalali units as the year this page was opened for (unlike getYearOptions,
// whose value is Gregorian for the create form's api call)
const getEditYearOptions = (): { label: string; value: number }[] => {
  const currentJalaliYear = dayjs().year();
  return Array.from({ length: 10 }, (_, index) => currentJalaliYear - index).map((jalaliYear) => ({
    label: formatYear(jalaliYear),
    value: jalaliYear,
  }));
};

// Replaces one official year's holidays with an uploaded file
const EditOfficialForm = () => {
  const [t] = useTr();
  const theme = useAppTheme();
  const [form] = Form.useForm<{ year?: number }>();
  const { year, navigateTo } = useHolidayPage();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDiscardOpen, setIsDiscardOpen] = useState(false);
  const setUploadedHolidays = useHolidayStore((state) => state.setUploadedHolidays);
  const setFormOrigin = useHolidayStore((state) => state.setFormOrigin);
  const fileUpload = useHolidayFileUpload(form);
  const updateOfficial = useUpdateOfficialMutation();
  const finish = useFinishCreate(HolidayTab.OFFICIAL);
  const previous = useOfficialHolidaysQuery(year);
  // Until a new file is uploaded, saving keeps the year's existing holidays instead of wiping them
  const holidays = fileUpload.result?.holidays ?? previous.data ?? [];

  useEffect(() => {
    if (year) form.setFieldValue('year', year);
  }, [year, form]);

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
    navigateTo(HolidayPage.UPLOAD_DETAILS);
  };

  const handleViewPrevious = () => {
    setFormOrigin(HolidayPage.EDIT);
    navigateTo(HolidayPage.DETAILS, { year: year as number });
  };

  const handleConfirm = () =>
    updateOfficial.mutate(
      { year: year as number, holidays },
      {
        onSuccess: () =>
          finish.onSuccess({ txt: t('official_edit_success', { year }), type: 'success', shouldTranslate: false }),
        onError: finish.onError,
        onSettled: () => setIsConfirmOpen(false),
      }
    );

  // Opened without a year, e.g. a stale link: nothing to edit
  if (!year) return null;

  return (
    <Box minHeight='75vh' flexDirection='column' justifyContent='space-between' gap='2.4rem' padding='3.2rem'>
      <Box flexDirection='column' gap='2.4rem'>
        <MessageBox type='warning' message={t('edit_official_warning')} description={<SampleFileLink />} closable />
        <Form form={form} layout='vertical'>
          <Box flexDirection='column' width='50%' gap='2.4rem'>
            <Form.Item name='year' label={t('year')} style={{ marginBottom: 0 }}>
              <Select options={getEditYearOptions()} />
            </Form.Item>
            <Box flexDirection='column' gap='1.2rem'>
              <FileEntry
                result={fileUpload.result}
                loading={fileUpload.isPending}
                onUpload={fileUpload.upload}
                onRemove={fileUpload.remove}
                onViewDetails={handleViewNewFile}
              />
              <FileInfo>
                <Box justifyContent='space-between' alignItems='center' fillChildren={false}>
                  <Text as='span'>{t('file_information')}</Text>
                  <Button
                    type='link'
                    icon={<i className='ri-arrow-left-s-line' />}
                    iconPosition='end'
                    onClick={handleViewPrevious}
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
            </Box>
          </Box>
        </Form>
      </Box>
      <Box justifyContent='flex-end' gap='1.2rem' fillChildren={false}>
        <Button htmlType='button' type='primaryOutlined' onClick={handleBack}>
          {t('back')}
        </Button>
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
