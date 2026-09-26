import type { FormInstance, UploadProps } from 'antd';

import { useTr } from '@branch-services/translation';
import { ApiUtil } from '@branch-services/utils';

import useUploadHolidayFileMutation from '../queries/use-upload-holiday-file-mutation';

// Uploads the holidays file of a form and reports a failed upload on its `file` field
const useHolidayFileUpload = (form: FormInstance) => {
  const [t] = useTr();
  const mutation = useUploadHolidayFileMutation();

  const upload: NonNullable<UploadProps['customRequest']> = ({ file, onSuccess, onError }) => {
    mutation.mutate(file as File, {
      onSuccess: (response) => onSuccess?.(response),
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
    form.setFieldValue('file', undefined);
  };

  // A file must be selected and parsed successfully before the form can be submitted
  const validate = () => {
    if (mutation.data) return true;

    form.setFields([{ name: 'file', errors: [t('upload_failed')] }]);
    return false;
  };

  return { upload, remove, validate, result: mutation.data, isPending: mutation.isPending };
};

export default useHolidayFileUpload;
