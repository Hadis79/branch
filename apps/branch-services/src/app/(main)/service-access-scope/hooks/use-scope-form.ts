import { useEffect, useState } from 'react';
import { Form } from 'antd';

import { ApiUtil } from '@branch-services/utils';

import useServiceAccessScopePage from './use-service-access-scope-page';
import useCreateScopeMutation from '../queries/use-create-scope-mutation';
import useServiceAccessScopeStore from '../store/use-widget-store';
import { ServiceAccessScopePage } from '../utils/constants';
import { getFormTarget, getRangeWeekDays, hasHours, toServiceAccessScopeDto } from '../utils/utils';
import type { ScopeFormValues, ServiceAccessScopeDto } from '../utils/types';

export const INITIAL_FORM_VALUES: Partial<ScopeFormValues> = { scopeType: 'GROUP' };

// State and handlers of the two-step create page: the form, then a preview of the scope to confirm
const useScopeForm = () => {
  const [form] = Form.useForm<ScopeFormValues>();
  const values = Form.useWatch([], form) as Partial<ScopeFormValues> | undefined;
  // Set once the form step is confirmed, so the preview step shows a stable snapshot. Coming back from
  // the affected units page, it starts from the preview left there.
  const [preview, setPreview] = useState<ServiceAccessScopeDto | null>(
    () => useServiceAccessScopeStore.getState().draft?.preview ?? null
  );
  const { navigateTo } = useServiceAccessScopePage();
  const setMessage = useServiceAccessScopeStore((state) => state.setMessage);
  const setDraft = useServiceAccessScopeStore((state) => state.setDraft);
  const createMutation = useCreateScopeMutation();

  useEffect(() => {
    // Drop a message left over from another page
    setMessage(null);

    // Restore the values left for the affected units page, then let them go
    const { draft } = useServiceAccessScopeStore.getState();
    if (!draft) return;
    form.setFieldsValue(draft.values);
    setDraft(null);
  }, [form, setMessage, setDraft]);

  // Every weekday until an end date is picked (or for a week or longer), else just the range's days
  const weekDays = getRangeWeekDays(values?.startDate, values?.endDate);

  const isFormComplete = Boolean(
    values?.service &&
      getFormTarget(values) &&
      values.title?.trim() &&
      values.startDate &&
      weekDays.some((dayOfWeek) => hasHours(values.days?.[dayOfWeek]))
  );

  const showPreview = () =>
    form
      .validateFields()
      .then(() => setPreview(toServiceAccessScopeDto(form.getFieldsValue(true), weekDays)))
      // The invalid fields already show their errors
      .catch(() => undefined);

  // Cancel on either step starts over with an empty form
  const cancel = () => {
    form.resetFields();
    setPreview(null);
  };

  const showAffectedUnits = () => {
    if (!preview) return;
    setDraft({ values: form.getFieldsValue(true), preview });
    navigateTo(ServiceAccessScopePage.AFFECTED_UNITS);
  };

  const submit = () => {
    if (!preview) return;

    createMutation.mutate(preview, {
      onSuccess: () => {
        setMessage({ txt: 'create_success', type: 'success', shouldTranslate: true });
        navigateTo(ServiceAccessScopePage.LIST);
      },
      onError: (error) => setMessage(ApiUtil.getErrorMessage(error)),
    });
  };

  return {
    form,
    weekDays,
    isFormComplete,
    preview,
    isSubmitting: createMutation.isPending,
    showPreview,
    showAffectedUnits,
    cancel,
    submit,
  };
};

export default useScopeForm;
