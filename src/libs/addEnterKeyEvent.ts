/**
 * addEnterKeyEvent - enter 키 이벤트를 추가하는 함수입니다.
 * @param inputElement - key event를 추가할 ref를 넣어주세요.
 * @param callback - enter 키를 눌렀을 때 실행할 함수를 넣어주세요.
 */

import { RefObject } from 'react';

interface AddEnterKeyEventParams<T extends HTMLElement> {
  element: RefObject<T>;
  callback: () => void;
}

export const addEnterKeyEvent = <T extends HTMLElement>({ element, callback }: AddEnterKeyEventParams<T>) => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      callback();
    }
  };

  element.current?.addEventListener('keypress', handleKeyPress);

  return () => {
    element.current?.removeEventListener('keypress', handleKeyPress);
  };
};
