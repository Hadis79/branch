import React from 'react';

import * as S from './announcements.style';
import { announcementsData } from '../../utils/mock-data';

function Announcements() {
  return (
    <S.Wrapper>
      {announcementsData.map((item, index) => {
        return (
          <S.Announcement key={index}>
            <S.Title badgeType={item?.badgeType}>
              <div className='title_text'>{item.title}</div>
              <span className='title_badge'>{item.badgeText}</span>
            </S.Title>
            <div className='desc'>{item.description}</div>
          </S.Announcement>
        );
      })}
    </S.Wrapper>
  );
}

export default Announcements;
