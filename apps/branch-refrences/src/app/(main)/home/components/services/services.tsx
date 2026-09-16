import React, { useState } from 'react';

import * as S from './services.style';
import { useTr } from '@branch-services/translation';
import HistorySvg from '../../assets/svg-components/history';
import BatchAchRequestSvg from '../../assets/svg-components/batch-ach-request';
import AchSvg from '../../assets/svg-components/ach';
import OfflineSvg from '../../assets/svg-components/offline';
import { useAppTheme } from '@branch-services/hooks';
import { getHoverColor } from '../../utils/util';
import { Box, Button } from '@branch-services/ui-kit';
import Utils from '../../../create-request/utils/utils';

function Services() {
  const [t] = useTr();
  const [hoverIndex, setHoverIndex] = useState<number | undefined>(undefined);
  const [hoverIndexHistory, setHoverIndexHistory] = useState<number | undefined>(undefined);
  const theme = useAppTheme();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const servicesData = [
    {
      title: t('online'),
      href: '/create-request',
      icon: (hover: boolean) => <BatchAchRequestSvg fill={getHoverColor(hover, theme) ?? theme.primary} />,
    },
    // {
    //   title: t('ach'),
    //   href: '/create-request-ach',
    //   icon: (hover: boolean) => <AchSvg fill={getHoverColor(hover, theme) ?? theme.primary} />,
    // },
    // {
    //   title: t('offline'),
    //   href: '/create-request-offline',
    //   icon: (hover: boolean) => <OfflineSvg fill={getHoverColor(hover, theme) ?? theme.primary} />,
    // },
  ];

  const historyData = [
    {
      title: t('list_history'),
      href: '/list-requests',
      icon: (hover: boolean) => <HistorySvg fill={getHoverColor(hover, theme) ?? theme.primary} />,
    },
  ];

  return (
    <S.Wrapper>
      <p className='services_title'>{t('request')}</p>
      <S.ServicesContainer>
        {servicesData.map((item, index) => (
          <S.ServiceItem
            key={index}
            href={item.href}
            onMouseOver={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(undefined)}
          >
            {item.icon(hoverIndex === index)}
            <div className='title'>{item.title}</div>
          </S.ServiceItem>
        ))}
      </S.ServicesContainer>
      <p style={{ paddingTop: '1rem' }} className='services_title'>
        {t('history')}
      </p>
      <S.ServicesContainer>
        {historyData.map((item, index) => (
          <S.ServiceItem
            key={index}
            href={item.href}
            onMouseOver={() => setHoverIndexHistory(index)}
            onMouseLeave={() => setHoverIndexHistory(undefined)}
          >
            {item.icon(hoverIndexHistory === index)}
            <div className='title'>{item.title}</div>
          </S.ServiceItem>
        ))}
      </S.ServicesContainer>

      <S.DownloadFile>
        <Box className='download'>
          <div className='text-svg'>
            <div className='guid'>{t('guid_file')}</div>

            <div className='text'>{t('text_sample_file')}</div>
          </div>
          <div style={{ display: 'contents' }}>
            <Button
              type='link'
              size='small'
              style={{ alignItems: 'normal', alignSelf: 'center' }}
              // className='sample-file'
              icon={<i className='ri-download-line' />}
              // loading={state?.downloadFile?.loading}
              onClick={() => Utils.getLocalFile()}
            >
              {t('download_file')}
            </Button>
          </div>
        </Box>

        {/* <Box className='files'>
          <div className='items'>
            {t('online')}
            <Button
              type='link'
              size='small'
              className='sample-file'
              icon={<i className='ri-download-line' />}
              // loading={state?.downloadFile?.loading}
              onClick={() => Utils.getLocalFile()}
            >
              {t('download')}
            </Button>
          </div>
          <div className='items'>
            {t('ach')}
            <Button
              type='link'
              size='small'
              className='sample-file'
              icon={<i className='ri-download-line' />}
              // loading={state?.downloadFile?.loading}
              onClick={() => Utils.getLocalFile('Offline-ACH-Paya.xls')}
            >
              {t('download')}
            </Button>
          </div>
          <div className='items'>
            {t('offline')}
            <Button
              type='link'
              size='small'
              className='sample-file'
              icon={<i className='ri-download-line' />}
              // loading={state?.downloadFile?.loading}
              onClick={() => Utils.getLocalFile()}
            >
              {t('download')}
            </Button>
          </div>
        </Box> */}
      </S.DownloadFile>
    </S.Wrapper>
  );
}

export default Services;
