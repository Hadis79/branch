import { useResponsive } from '@branch-services/hooks';
import React from 'react';

function AchSvg({ fill = '#007A7F' }) {
  const { isMobileOrTablet } = useResponsive();

  return (
    <svg
      width={isMobileOrTablet ? '24' : '40'}
      height={isMobileOrTablet ? '24' : '41'}
      viewBox='0 0 41 40'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M17.3567 3.33333H31.6667C32.1087 3.33333 32.5326 3.50893 32.8452 3.82149C33.1577 4.13405 33.3333 4.55797 33.3333 5V28.3333C33.3333 28.7754 33.1577 29.1993 32.8452 29.5118C32.5326 29.8244 32.1087 30 31.6667 30H1.66667C1.22464 30 0.800716 29.8244 0.488155 29.5118C0.175595 29.1993 0 28.7754 0 28.3333V1.66667C0 1.22464 0.175595 0.800716 0.488155 0.488155C0.800716 0.175595 1.22464 0 1.66667 0H14.0233L17.3567 3.33333ZM3.33333 3.33333V26.6667H30V6.66667H15.9767L12.6433 3.33333H3.33333ZM16.6667 15V10L23.3333 16.6667L16.6667 23.3333V18.3333H10V15H16.6667Z'
        fill={fill}
      />
    </svg>
  );
}

export default AchSvg;
