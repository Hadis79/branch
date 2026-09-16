import React, { useEffect, useState } from 'react';
import Player from 'lottie-react';
import AnimateData from '../../../assets/animation/data.json';
import * as S from './../validation-step.style';
import { Timer } from '@branch-services/ui-kit';
import { useTr } from '@branch-services/translation';

type Props = {
  counter: number;
  totalRecord: number;
};

function TimerComponent({ totalRecord, counter }: Props) {
  const [t] = useTr();

  const [animationLoop, setAnimationLoop] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const remainingRecords = totalRecord - counter;

    const newTimer = Math.ceil((remainingRecords / 220) * 5);

    setTimer(newTimer);
    setAnimationLoop(newTimer > 0);
  }, [totalRecord, counter]);

  return (
    <S.RemainingTime>
      <div className='timer-animation'>
        <Player autoplay loop={animationLoop} animationData={AnimateData} />
      </div>
      <div className='timer'>
        <span>{t('remaining_time')}:</span>
        {timer ? (
          <Timer
            key={timer}
            initialSeconds={timer}
            onCountDown={(t) => setTimer(t)}
            onComplete={() => setAnimationLoop(false)}
          />
        ) : (
          '00:00'
        )}
      </div>
    </S.RemainingTime>
  );
}
export default TimerComponent;
