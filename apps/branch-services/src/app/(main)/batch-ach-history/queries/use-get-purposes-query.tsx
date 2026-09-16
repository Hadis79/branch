import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@branch-services/types';
import { Api } from '../services';
import { SelectProps } from 'antd';
import useNewRequestsWidgetStore from '../store/use-widget-store';
import { ApiUtil } from '@branch-services/utils';

function handleError(reason: any): any {
  return ApiUtil.getErrorMessage(reason);
}

const usePurposesQuery = () => {
  const { setMessage, resetMessage } = useNewRequestsWidgetStore();
  return useQuery({
    queryKey: [QueryKeys.PURPOSES],
    queryFn: async () => {
      try {
        resetMessage();
        const res = await Api.getPurposes();
        if (res) {
          const result: SelectProps['options'] = [];
          const data = res?.filter((item) => item.transferType);
          data?.map((item) => {
            return result.push({
              value: item?.statementCode?.toString().trim(),
              label: item?.titleFA?.toString().trim(),
            });
          });
          return result ?? [];
        }
      } catch (err) {
        setMessage(handleError(err));
      }
    },
  });
};

export default usePurposesQuery;
