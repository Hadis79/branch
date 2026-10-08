import { useEffect } from 'react';

import { useTr } from '@branch-services/translation';
import { ApiUtil } from '@branch-services/utils';

import WorkingHoursForm from './working-hours-form';
import { PageSkeleton } from '../loading-skeletons/loading-skeletons';
import useUpdateWorkingHoursMutation from '../../queries/use-update-working-hours-mutation';
import useWorkingHoursPage from '../../hooks/use-working-hours-page';
import useQueryErrorMessage from '../../hooks/use-query-error-message';
import useWorkingHoursQuery from '../../queries/use-working-hours-query';
import useWorkingHoursStore from '../../store/use-widget-store';
import { WorkingHoursPage } from '../../utils/constants';

// Edits the bank's existing default working hours; saved directly, without a review step
const EditWorkingHours = () => {
  const [t] = useTr();
  const { data, isLoading, error } = useWorkingHoursQuery();
  const { navigateTo } = useWorkingHoursPage();
  const setMessage = useWorkingHoursStore((state) => state.setMessage);
  const updateMutation = useUpdateWorkingHoursMutation();
  useQueryErrorMessage(error);

  // Drop a message left over from a previous visit to this page
  useEffect(() => setMessage(null), [setMessage]);

  // The form only reads its initial values once, so wait for the saved hours
  if (isLoading) return <PageSkeleton />;
  if (error) return null;

  return (
    <WorkingHoursForm
      initialDays={data?.days}
      noteType='warning'
      submitText={t('save_changes')}
      submitLoading={updateMutation.isPending}
      onSubmit={(days) =>
        updateMutation.mutate(
          { days },
          {
            onSuccess: () => {
              setMessage({ txt: t('update_success'), type: 'success', shouldTranslate: false });
              navigateTo(WorkingHoursPage.LIST);
            },
            onError: (error) => setMessage(ApiUtil.getErrorMessage(error)),
          }
        )
      }
    />
  );
};

export default EditWorkingHours;
