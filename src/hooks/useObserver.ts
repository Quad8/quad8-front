import { useEffect, useRef, useState, MutableRefObject } from 'react';

const useObserver = (options = {}): [MutableRefObject<HTMLElement | null>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

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
  }, [options]);

  return [elementRef, isIntersecting];
};

export default useObserver;
