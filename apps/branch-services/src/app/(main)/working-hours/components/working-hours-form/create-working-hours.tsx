import { useEffect, useState } from 'react';

import { useTr } from '@branch-services/translation';
import { ApiUtil } from '@branch-services/utils';

import WorkingHoursForm from './working-hours-form';
import WorkingHoursReview from './working-hours-review';
import useCreateWorkingHoursMutation from '../../queries/use-create-working-hours-mutation';
import useWorkingHoursPage from '../../hooks/use-working-hours-page';
import useWorkingHoursStore from '../../store/use-widget-store';
import { WorkingHoursPage } from '../../utils/constants';
import type { WorkingDay } from '../../utils/types';

// Defines the bank's default working hours (only shown once, before they exist): the form first,
// then a review of every weekday before saving
const CreateWorkingHours = () => {
  const [t] = useTr();
  // The submitted hours, shown by the review step
  const [days, setDays] = useState<WorkingDay[]>();
  const [isReviewing, setIsReviewing] = useState(false);
  // Bumped to remount the form empty, since it only reads its initial values once
  const [formKey, setFormKey] = useState(0);
  const { navigateTo } = useWorkingHoursPage();
  const setMessage = useWorkingHoursStore((state) => state.setMessage);
  const createMutation = useCreateWorkingHoursMutation();

  // Drop a message left over from a previous visit to this page
  useEffect(() => setMessage(null), [setMessage]);

  // Cancel on either step starts over with an empty form
  const handleReset = () => {
    setDays(undefined);
    setIsReviewing(false);
    setFormKey((key) => key + 1);
  };

  const handleConfirm = () =>
    createMutation.mutate(
      { days: days ?? [] },
      {
        onSuccess: () => {
          setMessage({ txt: t('create_success'), type: 'success', shouldTranslate: false });
          navigateTo(WorkingHoursPage.LIST);
        },
        onError: (error) => setMessage(ApiUtil.getErrorMessage(error)),
      }
    );

  if (isReviewing && days)
    return (
      <WorkingHoursReview
        days={days}
        loading={createMutation.isPending}
        onConfirm={handleConfirm}
        onCancel={handleReset}
      />
    );

  return (
    <WorkingHoursForm
      key={formKey}
      noteType='info'
      submitText={t('continue')}
      onSubmit={(values) => {
        setDays(values);
        setIsReviewing(true);
      }}
      onCancel={handleReset}
    />
  );
};

export default CreateWorkingHours;
