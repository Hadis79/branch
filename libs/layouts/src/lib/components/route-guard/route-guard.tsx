import { useMenuStore } from '@branch-services/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { InternalRoutes } from './types';
import { extractPathsFromMenu } from '@branch-services/utils';

export const RouteGuard = ({ children }) => {
  const router = useRouter();
  const { menu } = useMenuStore();
  const pathName = usePathname();
  const cleanPathName = pathName === '/' ? pathName : pathName.replace(/^\/+/, '');
  const menuRoutes = useMemo(() => extractPathsFromMenu(menu), [menu]);
  const internalRoutes = useMemo(() => InternalRoutes, []);

  const allowedRoutes = [...menuRoutes, ...Object.values(internalRoutes)];

  if (menu?.length && !allowedRoutes.includes(cleanPathName)) {
    router.push('/not-access');
  }

  return children;
};
