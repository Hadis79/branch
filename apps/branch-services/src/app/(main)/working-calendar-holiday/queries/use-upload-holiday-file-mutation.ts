import { useMutation } from '@tanstack/react-query';

import { Api } from '../services';
import { holidayMutationKeys } from '../utils/constants';

// Uploading only parses the file; nothing is saved until the form is submitted
const useUploadHolidayFileMutation = () =>
  useMutation({
    mutationKey: holidayMutationKeys.upload,
    mutationFn: Api.uploadOfficialFile,
  });

export default useUploadHolidayFileMutation;
