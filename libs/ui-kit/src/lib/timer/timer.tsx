import React from 'react';
import { useState, useEffect } from 'react';

export type TimerProps = {
  initialSeconds: number;
  onCountDown?: any;
  onComplete?: any;
};
export const Timer = (props: TimerProps) => {
  const { initialSeconds = 0, onCountDown, onComplete } = props;

  const _initialMin = Math.floor(initialSeconds / 60);
  const _initialSec = initialSeconds - _initialMin * 60;

  const [minutes, setMinutes] = useState(_initialMin);
  const [seconds, setSeconds] = useState(_initialSec);

  function handleCountDown() {
    if (onCountDown) {
      onCountDown(minutes * 60 + seconds);
    }
  }

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
        handleCountDown();
      }
      if (seconds === 0) {
        if (minutes === 0) {
          handleCountDown();
          if (onComplete) {
            onComplete();
          }
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
          handleCountDown();
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [minutes, seconds]);

  function getTime() {
    let result = '';
    result = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    return result;
  }

  return <>{minutes === 0 && seconds === 0 ? null : <span> {getTime()}</span>}</>;
};

// export default Timer;
