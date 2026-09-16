import { useEffect, useState } from 'react';

function useBounce(callback: () => void, dependencies: any[], delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState<any>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [debouncedValue, ...dependencies]);

  return setDebouncedValue;
}

export default useBounce;
