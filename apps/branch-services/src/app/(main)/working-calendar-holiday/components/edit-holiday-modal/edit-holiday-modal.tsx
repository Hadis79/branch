import { useEffect } from 'react';
import { Form } from 'antd';

import { useTr } from '@branch-services/translation';
import { ApiUtil } from '@branch-services/utils';

import EditHolidayForm, { EditHolidayValues } from './edit-holiday-form';
import HolidayModal from '../holiday-modal/holiday-modal';
import HolidayMessage from '../holiday-message/holiday-message';
import useHolidayMessage from '../../hooks/use-holiday-message';
import useUpdateHolidayMutation from '../../queries/use-update-holiday-mutation';
import type { Holiday } from '../../utils/types';

type EditHolidayModalProps = {
  open: boolean;
  onCancel: () => void;
  holiday: Holiday | null;
};

const EditHolidayModal = ({ open, onCancel, holiday }: EditHolidayModalProps) => {
  const [t] = useTr();
  const [form] = Form.useForm<EditHolidayValues>();
  const { showSuccess } = useHolidayMessage();
  const { mutate, isPending, error, reset } = useUpdateHolidayMutation();

  // Every opening starts from the picked holiday, without the error of the previous attempt
  useEffect(() => {
    if (!open || !holiday) return;

    form.setFieldsValue({ title: holiday.title, officialStatus: holiday.officialStatus });
    reset();
  }, [open, holiday, form, reset]);

  const handleSave = ({ title, officialStatus }: EditHolidayValues) => {
    if (!holiday) return;

    const nextTitle = title.trim();
    mutate(
      { ...holiday, title: nextTitle, officialStatus },
      {
        onSuccess: () => {
          showSuccess('edit_success', { title: nextTitle });
          onCancel();
        },
      }
    );
  };

  return (
    <HolidayModal
      open={open}
      title={t('edit_title', { title: holiday?.title })}
      confirmText={t('save_changes')}
      confirmLoading={isPending}
      onConfirm={form.submit}
      onCancel={onCancel}
    >
      {error && <HolidayMessage message={ApiUtil.getErrorMessage(error)} margin='0 0 2.4rem' />}
      {holiday && <EditHolidayForm form={form} holiday={holiday} onFinish={handleSave} />}
    </HolidayModal>
  );
};

export default EditHolidayModal;
