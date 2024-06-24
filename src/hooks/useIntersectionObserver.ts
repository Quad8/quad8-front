import { MutableRefObject, useEffect, useState } from 'react';

export const useIntersectionObserver = (
  elementRef: MutableRefObject<HTMLElement | null>,
  options?: IntersectionObserverInit,
) => {
  const [isIntersecting, setIsIntersecting] = useState(true);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setIsIntersecting(entry.isIntersecting);
    };

    const observer = new IntersectionObserver(observerCallback, options);
    const observerRef = elementRef.current;

    if (observerRef) {
      observer.observe(observerRef);
    }

    return () => {
      if (observerRef) {
        observer.unobserve(observerRef);
      }
    };
  }, [options, elementRef]);

  return isIntersecting;
};
