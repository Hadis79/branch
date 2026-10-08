import { useState } from 'react';

import { useTr } from '@branch-services/translation';
import { MessageBox } from '@branch-services/ui-kit';

import HolidayEntryForm from './holiday-entry-form';
import EnteredHolidaysTable from './entered-holidays-table';
import FormPage from '../form-page/form-page';
import ConfirmCreateModal from '../holiday-modal/confirm-create-modal';
import useFinishCreate from '../../hooks/use-finish-create';
import useCreateCustomMutation from '../../queries/use-create-custom-mutation';
import type { NewHoliday } from '../../utils/types';
import { isSameHoliday } from '../../utils/utils';

// Non-calendar holidays, entered one by one and saved together
const ManualForm = () => {
  const [t] = useTr();
  const [holidays, setHolidays] = useState<NewHoliday[]>([]);
  const [formResetKey, setFormResetKey] = useState(0);
  const [isEmptyErrorVisible, setIsEmptyErrorVisible] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const createCustom = useCreateCustomMutation();
  const finish = useFinishCreate();

  const handleAdd = (holiday: NewHoliday) => {
    setHolidays((current) => [...current, holiday]);
    setIsEmptyErrorVisible(false);
  };

  const handleSubmit = () => {
    if (holidays.length) setIsConfirmOpen(true);
    else setIsEmptyErrorVisible(true);
  };

  const handleReset = () => {
    setHolidays([]);
    setIsEmptyErrorVisible(false);
    setIsConfirmOpen(false);
    setFormResetKey((current) => current + 1);
    createCustom.reset();
  };

  const handleConfirm = () =>
    createCustom.mutate(holidays, {
      onSuccess: () => finish.onSuccess('custom_success'),
      onError: finish.onError,
      onSettled: () => setIsConfirmOpen(false),
    });

  return (
    <FormPage
      info='manual_info'
      error={isEmptyErrorVisible && <MessageBox type='error' message={t('at_least_one_row')} closable />}
      submitText='submit_holidays'
      onReset={handleReset}
      onSubmit={handleSubmit}
    >
      <HolidayEntryForm
        key={formResetKey}
        isDuplicate={(holiday) => holidays.some((item) => isSameHoliday(item, holiday))}
        onAdd={handleAdd}
      />
      <EnteredHolidaysTable
        holidays={holidays}
        onRemove={(holiday) => setHolidays((current) => current.filter((item) => !isSameHoliday(item, holiday)))}
      />
      <ConfirmCreateModal
        open={isConfirmOpen}
        kind='custom'
        loading={createCustom.isPending}
        onConfirm={handleConfirm}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </FormPage>
  );
};

export default ManualForm;
