import React from 'react';

import * as S from './announcements.style';
import { announcementsData, intermediaryAccountData } from '../../utils/mock-data';
import { useTr } from '@branch-services/translation';

function Announcements() {
  const [t] = useTr();
  return (
    <S.Wrapper>
      {announcementsData.map((item, index) => {
        return (
          <S.Announcement key={index}>
            <S.Title badgeType={item?.badgeType}>
              <div className='title_text'>
                {item.title}
                <div className='new'>{t('new')}</div>
              </div>
            </S.Title>
            <div className='desc'>{item.description}</div>
          </S.Announcement>
        );
      })}
      {intermediaryAccountData.map((item, index) => {
        return (
          <S.Announcement key={index}>
            <S.Title badgeType={item?.badgeType}>
              <div className='title_text'>
                {item.title}
                <div className='attention'>{t('attention')}</div>
              </div>
            </S.Title>
            <div className='desc'>{item.description}</div>
          </S.Announcement>
        );
      })}
    </S.Wrapper>
  );
}

export default Announcements;
