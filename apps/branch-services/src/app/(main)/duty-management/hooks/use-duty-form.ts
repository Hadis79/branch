import { useEffect, useState } from 'react';
import { Form } from 'antd';

import { ApiUtil } from '@branch-services/utils';

import useDutyPage from './use-duty-page';
import useCreateDutyMutation from '../queries/use-create-duty-mutation';
import useDutyStore from '../store/use-widget-store';
import { DutyPage } from '../utils/constants';
import { getFormTarget, toDutyDto } from '../utils/utils';
import type { DutyDto, DutyFormValues } from '../utils/types';

export const INITIAL_FORM_VALUES: Partial<DutyFormValues> = { scopeType: 'GROUP', slots: [] };

// State and handlers of the two-step create page: the form, then a preview of the duty to confirm
const useDutyForm = () => {
  const [form] = Form.useForm<DutyFormValues>();
  const values = Form.useWatch([], form) as Partial<DutyFormValues> | undefined;
  // Set once the form step is confirmed, so the preview step shows a stable snapshot. Coming back from
  // the affected units page, it starts from the preview left there.
  const [preview, setPreview] = useState<DutyDto | null>(() => useDutyStore.getState().draft?.preview ?? null);
  const { navigateTo } = useDutyPage();
  const setMessage = useDutyStore((state) => state.setMessage);
  const setDraft = useDutyStore((state) => state.setDraft);
  const createMutation = useCreateDutyMutation();

  useEffect(() => {
    // Drop a message left over from another page
    setMessage(null);

    // Restore the values left for the affected units page, then let them go
    const { draft } = useDutyStore.getState();
    if (!draft) return;
    form.setFieldsValue(draft.values);
    setDraft(null);
  }, [form, setMessage, setDraft]);

  const isFormComplete = Boolean(values && getFormTarget(values) && values.title?.trim() && values.slots?.length);

  const showPreview = () =>
    form
      .validateFields()
      .then(() => setPreview(toDutyDto(form.getFieldsValue(true))))
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
    navigateTo(DutyPage.AFFECTED_UNITS);
  };

  const submit = () => {
    if (!preview) return;

    createMutation.mutate(preview, {
      onSuccess: () => {
        setMessage({ txt: 'create_success', type: 'success', shouldTranslate: true });
        navigateTo(DutyPage.LIST);
      },
      onError: (error) => setMessage(ApiUtil.getErrorMessage(error)),
    });
  };

  return {
    form,
    isFormComplete,
    preview,
    isSubmitting: createMutation.isPending,
    showPreview,
    showAffectedUnits,
    cancel,
    submit,
  };
};

export default useDutyForm;
