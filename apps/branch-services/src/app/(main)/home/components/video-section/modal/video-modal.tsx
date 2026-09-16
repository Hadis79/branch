import React from 'react';
import { ModalStyled, VideoStyled } from './video-modal.style';
import { useTr } from '@branch-services/translation';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const VideoModal: React.FC<Props> = ({ open, setOpen }) => {
  const [t] = useTr();

  return (
    <ModalStyled
      centered
      width={'100%'}
      title={<p>{t(`branch_batch_title`)}</p>}
      footer={null}
      open={open}
      onCancel={() => setOpen(false)}
    >
      {open ? (
        <VideoStyled controls autoPlay>
          <source src='/assets/videos/branch-batch-payment.mp4' type='video/mp4' />
          Your browser does not support the video tag.
        </VideoStyled>
      ) : (
        <p>Loading video...</p>
      )}
    </ModalStyled>
  );
};

export default VideoModal;
