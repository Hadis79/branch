import { useMutation } from '@tanstack/react-query';

import { ApiUtil } from '@branch-services/utils';

import { Api } from '../services';
import { groupsMutationKeys } from '../utils/constants';
import useGroupMessage from '../hooks/use-group-message';

const useDownloadSampleFileMutation = () => {
  const { showError } = useGroupMessage();

  return useMutation({
    mutationKey: groupsMutationKeys.downloadSample,
    mutationFn: Api.downloadSampleFile,
    onSuccess: ({ data, type, fileName }) => ApiUtil.downloadFile(data, type, fileName.split('.').pop(), fileName),
    onError: showError,
  });
};

export default useDownloadSampleFileMutation;
