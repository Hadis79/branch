import { useMutation } from '@tanstack/react-query';

import { ApiUtil } from '@branch-services/utils';

import useHolidayStore from '../store/use-widget-store';
import { holidayMutationKeys } from '../utils/constants';
import type { DownloadedFile } from '../utils/types';

// Runs a file request (sample file, holidays of a year) and saves the result
const useDownloadFileMutation = () => {
  const setMessage = useHolidayStore((state) => state.setMessage);

  return useMutation({
    mutationKey: holidayMutationKeys.download,
    mutationFn: (request: () => Promise<DownloadedFile>) => request(),
    onSuccess: ({ data, type, fileName }) => ApiUtil.downloadFile(data, type, fileName.split('.').pop(), fileName),
    onError: (error) => setMessage(ApiUtil.getErrorMessage(error)),
  });
};

export default useDownloadFileMutation;
