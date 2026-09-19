import type { FormInstance, UploadProps } from 'antd';

import { useTr } from '@branch-services/translation';

import useUploadHolidayFileMutation from '../queries/use-upload-holiday-file-mutation';

// Uploads the holidays file of a form and reports a failed upload on its `file` field
const useHolidayFileUpload = (form: FormInstance) => {
  const [t] = useTr();
  const mutation = useUploadHolidayFileMutation();

  const upload: NonNullable<UploadProps['customRequest']> = ({ file, onSuccess, onError }) => {
    mutation.mutate(file as File, {
      onSuccess: (response) => onSuccess?.(response),
      onError: () => {
        form.setFields([{ name: 'file', errors: [t('upload_failed')] }]);
        onError?.(new Error(t('upload_failed')));
      },
    });
  };

  const remove = () => {
    mutation.reset();
    form.setFieldValue('file', undefined);
  };

  return { upload, remove, result: mutation.data, isPending: mutation.isPending };
};

export default useHolidayFileUpload;
