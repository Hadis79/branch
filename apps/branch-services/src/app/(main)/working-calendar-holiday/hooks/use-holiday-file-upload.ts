import { useEffect } from 'react';
import type { FormInstance, UploadProps } from 'antd';

import { useTr } from '@branch-services/translation';
import { ApiUtil } from '@branch-services/utils';

import useUploadHolidayFileMutation from '../queries/use-upload-holiday-file-mutation';
import useHolidayStore from '../store/use-widget-store';

// Uploads the holidays file of a form and reports a failed upload on its `file` field.
// The parsed file is kept in the store, so its details page can show it.
const useHolidayFileUpload = (form: FormInstance) => {
  const [t] = useTr();
  const mutation = useUploadHolidayFileMutation();
  const result = useHolidayStore((state) => state.uploadedFile);
  const setUploadedFile = useHolidayStore((state) => state.setUploadedFile);

  // The uploaded file belongs to the form; it's dropped when the form is left (e.g. another tab is opened)
  useEffect(() => () => setUploadedFile(null), [setUploadedFile]);

  const upload: NonNullable<UploadProps['customRequest']> = ({ file, onSuccess, onError }) => {
    mutation.mutate(file as File, {
      onSuccess: (response) => {
        setUploadedFile(response);
        onSuccess?.(response);
      },
      onError: (error) => {
        // Shown by antd under the field itself; the service's own message takes priority over a generic fallback
        const message = ApiUtil.getErrorMessage(error);
        const errorText = message ? (message.shouldTranslate ? t(message.txt) : message.txt) : t('upload_failed');
        form.setFields([{ name: 'file', errors: [errorText] }]);
        onError?.(new Error(errorText));
      },
    });
  };

  const remove = () => {
    mutation.reset();
    setUploadedFile(null);
    form.setFieldValue('file', undefined);
  };

  const reset = () => {
    mutation.reset();
    setUploadedFile(null);
    form.resetFields();
  };

  // A file must be selected and parsed successfully before the form can be submitted
  const validate = () => {
    if (result) return true;

    form.setFields([{ name: 'file', errors: [t('upload_failed')] }]);
    return false;
  };

  return { upload, remove, reset, validate, result, isPending: mutation.isPending };
};

export default useHolidayFileUpload;
