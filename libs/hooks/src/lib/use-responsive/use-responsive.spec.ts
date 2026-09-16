import { act, renderHook } from '@testing-library/react';

import useResponsive from './use-responsive';

describe('useResponsive', () => {
  it('should return responsive values based on window width', () => {
    const { result } = renderHook(() => useResponsive());

    // Check initial state  ( desktop width )
    Object.defineProperty(global.window, 'innerWidth', {
      writable: true,
      value: 1300,
    });
    act(() => {
      global.window.dispatchEvent(new Event('resize'));
    });
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(true);
    expect(result.current.isMobileOrTablet).toBe(false);
    expect(result.current.isUndefined).toBe(false);

    // Simulate mobile width
    Object.defineProperty(global.window, 'innerWidth', {
      writable: true,
      value: 320,
    });
    act(() => {
      global.window.dispatchEvent(new Event('resize'));
    });
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.isMobileOrTablet).toBe(true);
    expect(result.current.isUndefined).toBe(false);

    // Simulate tablet width
    Object.defineProperty(global.window, 'innerWidth', {
      writable: true,
      value: 800,
    });
    act(() => {
      global.window.dispatchEvent(new Event('resize'));
    });
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isDesktop).toBe(false);
    expect(result.current.isMobileOrTablet).toBe(false);
    expect(result.current.isUndefined).toBe(false);
  });
});
