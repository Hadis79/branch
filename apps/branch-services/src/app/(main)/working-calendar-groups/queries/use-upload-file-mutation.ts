import { useMutation } from '@tanstack/react-query';

import { Api } from '../services';
import { groupsMutationKeys } from '../utils/constants';

// Uploading only parses the file; no group data changes until the form is saved.
const useUploadFileMutation = () =>
  useMutation({
    mutationKey: groupsMutationKeys.upload,
    mutationFn: Api.uploadFile,
  });

export default useUploadFileMutation;
