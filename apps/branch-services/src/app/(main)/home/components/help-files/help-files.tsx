import React from 'react';

import * as S from './help-file.style';
import { helpFilesData } from '../../utils/mock-data';
import { useTr } from '@branch-services/translation';

import { ReactComponent as PdfIconSvg } from '../../assets/media/pdf-icon.svg';

function HelpFiles() {
  const [t] = useTr();

  return (
    <S.Wrapper>
      <div className='title_container'>
        <div className='help_files_title'>{t('help_files_title')}</div>
        <div className='help_files_desc'>{t('help_files_desc')}</div>
      </div>
      <S.ItemContainer>
        {helpFilesData.map((item, index) => {
          return (
            <S.Item key={index} href={item.href} download>
              <div className='description'>
                <PdfIconSvg />
                <span>{item.title}</span>
              </div>
              <div className='download_btn'>
                <i className='ri-download-2-line'></i>
                <span>{t('download_link')}</span>
              </div>
            </S.Item>
          );
        })}
      </S.ItemContainer>
    </S.Wrapper>
  );
}

export default HelpFiles;
