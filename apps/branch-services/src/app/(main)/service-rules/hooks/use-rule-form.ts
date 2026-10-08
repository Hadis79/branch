import { useEffect, useState } from 'react';
import { Form } from 'antd';

import { ApiUtil } from '@branch-services/utils';

import useServiceRulesPage from './use-service-rules-page';
import useCreateRuleMutation from '../queries/use-create-rule-mutation';
import useServiceRulesStore from '../store/use-widget-store';
import { ServiceRulesPage } from '../utils/constants';
import { getRangeWeekDays, hasHours, toServiceRuleDto } from '../utils/utils';
import type { RuleFormValues, ServiceRuleDto } from '../utils/types';

// State and handlers of the two-step create page: the form, then a preview of the rule to confirm
const useRuleForm = () => {
  const [form] = Form.useForm<RuleFormValues>();
  const values = Form.useWatch([], form) as Partial<RuleFormValues> | undefined;
  // Set once the form step is confirmed, so the preview step shows a stable snapshot
  const [preview, setPreview] = useState<ServiceRuleDto | null>(null);
  const { navigateTo } = useServiceRulesPage();
  const setMessage = useServiceRulesStore((state) => state.setMessage);
  const createMutation = useCreateRuleMutation();

  // Drop a message left over from the list page
  useEffect(() => setMessage(null), [setMessage]);

  // Every weekday until an end date is picked (or for a week or longer), else just the range's days
  const weekDays = getRangeWeekDays(values?.startDate, values?.endDate);

  const isFormComplete = Boolean(
    values?.service &&
      values.title?.trim() &&
      values.startDate &&
      weekDays.some((dayOfWeek) => hasHours(values.days?.[dayOfWeek]))
  );

  const showPreview = () =>
    form
      .validateFields()
      .then(() => setPreview(toServiceRuleDto(form.getFieldsValue(true), weekDays)))
      // The invalid fields already show their errors
      .catch(() => undefined);

  // Cancel on either step starts over with an empty form
  const cancel = () => {
    form.resetFields();
    setPreview(null);
  };

  const submit = () => {
    if (!preview) return;

    createMutation.mutate(preview, {
      onSuccess: () => {
        setMessage({ txt: 'create_success', type: 'success', shouldTranslate: true });
        navigateTo(ServiceRulesPage.LIST);
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
    cancel,
    submit,
  };
};

export default useRuleForm;
