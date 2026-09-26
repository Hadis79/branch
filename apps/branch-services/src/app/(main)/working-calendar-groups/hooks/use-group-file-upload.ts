import type { FormInstance, UploadProps } from 'antd';

import { useTr } from '@branch-services/translation';
import { ApiUtil } from '@branch-services/utils';

import useUploadFileMutation from '../queries/use-upload-file-mutation';
import type { GroupFormValues } from '../utils/types';

// Uploads the units file of a group form and keeps the `file` field errors in sync with the result.
const useGroupFileUpload = (form: FormInstance<GroupFormValues>) => {
  const [t] = useTr();
  const mutation = useUploadFileMutation();
  const result = mutation.data;
  const units = result?.units ?? [];

  const upload: NonNullable<UploadProps['customRequest']> = ({ file, onError, onSuccess }) => {
    mutation.mutate(
      { file: file as File },
      {
        onSuccess: (response) => {
          form.setFields([{ name: 'file', errors: [] }]);
          onSuccess?.(response);
        },
        onError: (error) => {
          // Shown by antd under the field itself; the service's own message takes priority over a generic fallback
          const message = ApiUtil.getErrorMessage(error);
          const errorText = message
            ? message.shouldTranslate
              ? t(message.txt)
              : message.txt
            : t('group_file_upload_failed');
          form.setFields([{ name: 'file', errors: [errorText] }]);
          onError?.(new Error(errorText));
        },
      }
    );
  };

  const validate = () => {
    if (units.length) return true;

    form.setFields([{ name: 'file', errors: [t('group_file_upload_failed')] }]);
    return false;
  };

  return {
    upload,
    validate,
    reset: mutation.reset,
    result,
    units,
    unitCount: result?.unitCount ?? 0,
    isPending: mutation.isPending,
  };
};

export default useGroupFileUpload;
