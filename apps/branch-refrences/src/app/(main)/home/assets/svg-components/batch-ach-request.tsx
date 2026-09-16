import { useResponsive } from '@branch-services/hooks';
import React from 'react';

function BatchAchRequestSvg({ fill = '#007A7F' }) {
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
        d='M16.6667 33.3333C7.46167 33.3333 0 25.8717 0 16.6667C0 7.46167 7.46167 0 16.6667 0C25.8717 0 33.3333 7.46167 33.3333 16.6667C33.3333 25.8717 25.8717 33.3333 16.6667 33.3333ZM16.6667 30C20.2029 30 23.5943 28.5952 26.0948 26.0948C28.5952 23.5943 30 20.2029 30 16.6667C30 13.1304 28.5952 9.73906 26.0948 7.23858C23.5943 4.73809 20.2029 3.33333 16.6667 3.33333C13.1304 3.33333 9.73906 4.73809 7.23858 7.23858C4.73809 9.73906 3.33333 13.1304 3.33333 16.6667C3.33333 20.2029 4.73809 23.5943 7.23858 26.0948C9.73906 28.5952 13.1304 30 16.6667 30V30ZM8.33333 18.3333H23.3333V21.6667H16.6667V26.6667L8.33333 18.3333ZM16.6667 11.6667V6.66667L25 15H10V11.6667H16.6667Z'
        fill={fill}
      />
    </svg>
  );
}

export default BatchAchRequestSvg;
