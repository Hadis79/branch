import { useState, useEffect, useMemo } from 'react';

import { breakpoints } from '@branch-services/utils';

type ResponsiveValues = {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isMobileOrTablet: boolean;
  isUndefined: boolean;
};

const useResponsive = (): ResponsiveValues => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop' | 'undefined'>('undefined');

  const breakpointsInPx = useMemo(() => {
    return {
      xs: parseInt(breakpoints.xs) * 16,
      sm: parseInt(breakpoints.sm) * 16,
      md: parseInt(breakpoints.md) * 16,
      lg: parseInt(breakpoints.lg) * 16,
      xl: parseInt(breakpoints.xl) * 16,
      xxl: parseInt(breakpoints.xxl) * 16,
    };
  }, []);

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    const { innerWidth } = window;
    if (innerWidth <= breakpointsInPx.xs) {
      setDeviceType('mobile');
    } else if (innerWidth <= breakpointsInPx.sm) {
      setDeviceType('mobile');
    } else if (innerWidth <= breakpointsInPx.md) {
      setDeviceType('mobile');
    } else if (innerWidth <= breakpointsInPx.lg) {
      setDeviceType('tablet');
    } else if (innerWidth <= breakpointsInPx.xl) {
      setDeviceType('desktop');
    } else if (innerWidth <= breakpointsInPx.xxl) {
      setDeviceType('desktop');
    } else {
      setDeviceType('desktop');
    }
  };

  const responsiveValues = useMemo(() => {
    const isMobile = deviceType === 'mobile';
    const isTablet = deviceType === 'tablet';
    const isDesktop = deviceType === 'desktop';
    const isUndefined = deviceType === 'undefined';
    const isMobileOrTablet = isMobile || (isTablet && window.innerWidth < breakpointsInPx.sm);

    return { isMobile, isTablet, isDesktop, isMobileOrTablet, isUndefined };
  }, [deviceType]);

  return responsiveValues;
};

export default useResponsive;
