import React, { useMemo, useState } from 'react';

import * as S from './services.style';
import { useTr } from '@branch-services/translation';
import { servicesData, servicesOperationData } from '../../utils/consts';
import BatchAchHistorySvg from '../../assets/svg-components/batch-ach-history';
import CurrentRequestsSvg from '../../assets/svg-components/current-requests';
import { useAppTheme, useMenuStore } from '@branch-services/hooks';
import { getHoverColor } from '../../utils/util';
import { extractPathsFromMenu } from '@branch-services/utils';
import NewRequestsSvg from '../../assets/svg-components/new-requests';

function Services() {
  const [t] = useTr();
  const [hoverIndex, setHoverIndex] = useState<number | undefined>(undefined);
  const theme = useAppTheme();
  const { menu } = useMenuStore();
  const menuRoutes = useMemo(() => extractPathsFromMenu(menu), [menu]);

  function servicesIconMapper(index) {
    const iconTypes = {
      0: <NewRequestsSvg fill={getHoverColor(hoverIndex === index, theme) ?? theme.primary} />,
      1: <BatchAchHistorySvg fill={getHoverColor(hoverIndex === index, theme) ?? theme.primary} />,
      2: <CurrentRequestsSvg fill={getHoverColor(hoverIndex === index, theme) ?? theme.primary} />,
    };

    return iconTypes[index];
  }
  const isOperationUser = menu?.some((item) => item.userType === 'OPERATION_OFFICE_USER');

  const currentServicesData = isOperationUser ? servicesOperationData : servicesData;

  const filteredServicesData = useMemo(() => {
    return currentServicesData.filter((service) => {
      const cleanPathName = service.href === '/' ? service.href : service?.href?.replace(/^\/+/, '')?.split('?')[0];
      return menuRoutes.some((route) => cleanPathName === route);
    });
  }, [currentServicesData, menuRoutes]);

  return (
    <>
      <S.Wrapper>
        <p className='services_title'>{t('services')}</p>
        <S.ServicesContainer>
          {filteredServicesData.map((item, index) => {
            return (
              <S.ServiceItem
                key={index}
                href={item.href}
                onMouseOver={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(undefined)}
              >
                {servicesIconMapper(index)}
                <div className='title'>{item.title}</div>
              </S.ServiceItem>
            );
          })}
        </S.ServicesContainer>
      </S.Wrapper>
    </>
  );
}

export default Services;
