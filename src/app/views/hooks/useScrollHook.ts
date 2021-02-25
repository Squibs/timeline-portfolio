import { debounce, throttle } from 'lodash';
import { useMemo } from 'react';

const useScrollHook = (passedContainerRef) => {
  const removeStylesMemo = useMemo(
    () =>
      debounce(() => {
        if (passedContainerRef.current.classList.contains('on-scroll')) {
          passedContainerRef.current.classList.remove('on-scroll');
        }
      }, 1000),
    [passedContainerRef],
  );

  /** throttled scroll handling */
  const handleScroll = throttle(
    () => {
      if (!passedContainerRef.current.classList.contains('on-scroll')) {
        passedContainerRef.current.classList.add('on-scroll');
      }

      removeStylesMemo();
    },
    800,
    { trailing: false, leading: true },
  );

  return { handleScroll };
};

export default useScrollHook;
