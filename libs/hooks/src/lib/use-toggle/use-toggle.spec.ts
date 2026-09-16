import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import useToggle from './use-toggle';

describe('useToggle hook', () => {
  it('should toggle state value', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(false);
  });

  it('should initialize state to true', () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current[0]).toBe(true);
  });
});
