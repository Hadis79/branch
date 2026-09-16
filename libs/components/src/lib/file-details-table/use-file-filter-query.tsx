import { useQuery } from '@tanstack/react-query';
import Api from './file-details-table-api';
import { ApiUtil } from '@branch-services/utils';
import { FileDetailsQueryKeys } from '../utils/consts';
import { useTr } from '@branch-services/translation';

function handleError(reason) {
  return ApiUtil.getErrorMessage(reason);
}

const getFileDetailsByFilter = async (): Promise<any> => {
  return await Api.getFileDetailsStatuses();
};

const useFileFilterDetailsQuery = (params) => {
  const [t] = useTr();
  const { data, error, isLoading, isPending, isError, refetch } = useQuery({
    queryKey: [FileDetailsQueryKeys.FileFilterDetails],
    queryFn: params.uploadFile ? undefined : getFileDetailsByFilter,
    select: (data) => {
      const uniqueData: any = [];
      const titles = new Set();

      for (const item of data) {
        if (!titles.has(item.title)) {
          titles.add(item.title);
          uniqueData.push(item);
        }
      }
      const newItem = { label: t('common.all'), value: null };
      const newData = uniqueData.map((item) => ({
        label: item.title,
        value: item.value,
      }));
      return [newItem, ...newData];
    },
  });

  const customizedError = isError && handleError(error);

  return { data, error: customizedError, isLoading, isPending, isError, refetch };
};

export default useFileFilterDetailsQuery;
