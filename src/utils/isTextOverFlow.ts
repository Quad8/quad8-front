import { RefObject } from 'react';

export default function isTextOverFlow(textRef: RefObject<HTMLDivElement>) {
  const targetRef = textRef.current;
  if (!targetRef || targetRef.clientWidth >= targetRef.scrollWidth) {
    return false;
  }
  return true;
}
