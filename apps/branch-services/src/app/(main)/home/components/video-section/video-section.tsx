import React, { useState } from 'react';
import * as S from '../video-section/video-section.style';
import { ReactComponent as PdfIcon } from '../../assets/media/pdf-icon.svg';
import { ReactComponent as PlayBtn } from '../../assets/media/play-btn.svg';
import VideoModal from './modal/video-modal';
import { useTr } from '@branch-services/translation';

function VideoSection() {
  const [open, setOpen] = useState(false);
  const [t] = useTr();
  return (
    <>
      <S.VideoWrapper>
        <div className='info'>
          <div className='title'>{t('video_section.title')}</div>
          <div className='pdf'>
            <PdfIcon />
            <a href='/assets/pdf/group-deposit-request-form.pdf' download={t('video_section.link')}>
              <span>{t('video_section.link')}</span>
            </a>
          </div>
        </div>
        <div className='video-container' onClick={() => setOpen(true)}>
          <img src='/assets/svgs/branch-batch-payment.svg' alt='branch-batch-payment' />
          <div className='play-btn'>
            <PlayBtn />
          </div>
        </div>
      </S.VideoWrapper>
      {open && <VideoModal open={open} setOpen={setOpen} />}
    </>
  );
}

export default VideoSection;
