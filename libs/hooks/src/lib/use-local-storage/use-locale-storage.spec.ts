import { act, renderHook } from '@testing-library/react';

import useLocalStorage from './use-local-storage';
import { storage } from '@branch-services/utils';

describe('useLocalStorage', () => {
  const key = 'test-key';
  const initialValue = { foo: 'bar' };

  beforeEach(() => {
    storage.clear();
  });

  test('should return initial value when key is not present in local storage', () => {
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    expect(result.current[0]).toEqual(initialValue);
  });

  test('should return null when no initial value is passed and key is not present in local storage', () => {
    const { result } = renderHook(() => useLocalStorage(key));

    expect(result.current[0]).toBeNull();
  });

  test('should return value from local storage when key is present', () => {
    storage.setItem(key, JSON.stringify(initialValue));
    const { result } = renderHook(() => useLocalStorage(key));

    expect(result.current[0]).toEqual(initialValue);
  });

  test('should update state and local storage when setState is called', () => {
    const newValue = { foo: 'qux' };
    const { result } = renderHook(() => useLocalStorage(key, initialValue));

    act(() => {
      result.current[1](newValue);
    });

    expect(result.current[0]).toEqual(newValue);
    expect(JSON.parse(storage.getItem(key) as string)).toEqual(newValue);
  });

  test('should remove key from local storage when remove is called', () => {
    storage.setItem(key, JSON.stringify(initialValue));
    const { result } = renderHook(() => useLocalStorage(key));

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBeNull();
    expect(storage.getItem(key)).toBeNull();
  });
});
