import { useEffect } from 'react';
import { Form, Modal } from 'antd';

import { useTr } from '@branch-services/translation';
import { ApiUtil } from '@branch-services/utils';
import { Box, Button, MessageBox } from '@branch-services/ui-kit';

import TimeRangeFields from '../working-hours-form/time-range-fields';
import useUpdateWorkingHoursMutation from '../../queries/use-update-working-hours-mutation';
import useWorkingHoursStore from '../../store/use-widget-store';
import type { WorkingHours } from '../../utils/types';

type EditModalProps = {
  open: boolean;
  workingHours: WorkingHours | null;
  onClose: () => void;
};

type FormValues = { from?: string; to?: string };

// Edits the bank's default working hours and lets its existing exceptions be removed
const EditModal = ({ open, workingHours, onClose }: EditModalProps) => {
  const [t] = useTr();
  const [form] = Form.useForm<FormValues>();
  const setMessage = useWorkingHoursStore((state) => state.setMessage);
  const updateMutation = useUpdateWorkingHoursMutation();

  // Re-seeded every time the modal opens, so a cancelled edit doesn't leave stale values behind
  useEffect(() => {
    if (open && workingHours) form.setFieldsValue({ from: workingHours.from, to: workingHours.to });
  }, [open, workingHours, form]);

  const handleSave = () =>
    form.validateFields().then(({ from, to }) =>
      updateMutation.mutate(
        { from: from as string, to: to as string },
        {
          onSuccess: () => {
            setMessage({ txt: t('update_success'), type: 'success', shouldTranslate: false });
            onClose();
          },
          onError: (error) => setMessage(ApiUtil.getErrorMessage(error)),
        }
      )
    );

  return (
    <Modal
      open={open}
      centered
      title={t('edit_title')}
      footer={null}
      closable={false}
      maskClosable={!updateMutation.isPending}
      onCancel={onClose}
    >
      <Box flexDirection='column' gap='2.4rem'>
        <MessageBox type='warning' message={t('edit_warning')} />
        <Form form={form} layout='vertical'>
          <TimeRangeFields />
        </Form>
        <Box justifyContent='flex-end' gap='1.2rem' fillChildren={false}>
          <Button htmlType='button' type='primaryOutlined' onClick={onClose}>
            {t('cancel')}
          </Button>
          <Button htmlType='button' type='primary' loading={updateMutation.isPending} onClick={handleSave}>
            {t('save_changes')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditModal;
