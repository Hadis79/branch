import { useState } from 'react';

import { useTr } from '@branch-services/translation';
import { MessageBox } from '@branch-services/ui-kit';

import HolidayEntryForm, { EnteredHoliday } from './holiday-entry-form';
import EnteredHolidaysTable from './entered-holidays-table';
import FormPage from '../form-page/form-page';
import ConfirmCreateModal from '../holiday-modal/confirm-create-modal';
import useFinishCreate from '../../hooks/use-finish-create';
import useCreateCustomMutation from '../../queries/use-create-custom-mutation';
import { HolidayTab } from '../../utils/constants';
import type { NewCustomHoliday } from '../../utils/types';
import { formatCount } from '../../utils/utils';

const isSameHoliday = (a: NewCustomHoliday, b: NewCustomHoliday) => a.date === b.date && a.regionCode === b.regionCode;

// Non-calendar holidays, entered one by one and saved together
const ManualForm = () => {
  const [t] = useTr();
  const [holidays, setHolidays] = useState<EnteredHoliday[]>([]);
  const [isEmptyErrorVisible, setIsEmptyErrorVisible] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const createCustom = useCreateCustomMutation();
  const finish = useFinishCreate(HolidayTab.CUSTOM);

  const handleAdd = (holiday: EnteredHoliday) => {
    setHolidays((current) => [...current, holiday]);
    setIsEmptyErrorVisible(false);
  };

  const handleSubmit = () => {
    if (holidays.length) setIsConfirmOpen(true);
    else setIsEmptyErrorVisible(true);
  };

  const handleConfirm = () =>
    createCustom.mutate(
      holidays.map(({ title, regionCode, date }) => ({ title, regionCode, date })),
      {
        onSuccess: () => finish.onSuccess({ txt: 'custom_success', type: 'success', shouldTranslate: true }),
        onError: finish.onError,
        onSettled: () => setIsConfirmOpen(false),
      }
    );

  return (
    <FormPage
      info='manual_info'
      error={isEmptyErrorVisible && <MessageBox type='error' message={t('at_least_one_row')} closable />}
      submitText='submit_holidays'
      onSubmit={handleSubmit}
    >
      <HolidayEntryForm
        isDuplicate={(holiday) => holidays.some((item) => isSameHoliday(item, holiday))}
        onAdd={handleAdd}
      />
      <EnteredHolidaysTable
        holidays={holidays}
        onRemove={(holiday) => setHolidays((current) => current.filter((item) => !isSameHoliday(item, holiday)))}
      />
      <ConfirmCreateModal
        open={isConfirmOpen}
        textKey='confirm_custom'
        params={{ holidayCount: formatCount(holidays.length) }}
        confirmText='submit'
        loading={createCustom.isPending}
        onConfirm={handleConfirm}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </FormPage>
  );
};

export default ManualForm;
