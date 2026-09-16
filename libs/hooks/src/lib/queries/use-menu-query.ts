import { useQuery } from '@tanstack/react-query';
import useMenuStore from '../stores/use-menu-store';
import { MenuModel, QueryKeys } from '@branch-services/types';
import { Api } from '@branch-services/services';

const getMenuAction = async (): Promise<MenuModel> => {
  return await Api.getMenus();
};

const useMenuQuery = () => {
  const { menu } = useMenuStore();
  const { data, error, isLoading, isPending, isError, isSuccess, refetch } = useQuery({
    queryKey: [QueryKeys.MENU],
    queryFn: getMenuAction,
    // retry: 1,
    enabled: !menu,
  });

  return { data, error, isLoading, isPending, isError, isSuccess, refetch };
};

export default useMenuQuery;
