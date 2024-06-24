import { useOutsideClick } from '@/hooks/useOutsideClick';
import { KakaoIcon, LinkCopyIcon } from '@/public/index';
import classNames from 'classnames/bind';
import { MouseEvent, useRef } from 'react';
import styles from './ShareButton.module.scss';

const cn = classNames.bind(styles);

interface ShareBoxProps {
  handleClick: () => void;
}

export default function ShareBox({ handleClick }: ShareBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);

  useOutsideClick(boxRef, () => {
    handleClick();
  });

  const handleIconClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={cn('share-box')} ref={boxRef}>
      <h2 className={cn('share-title')}>공유하기</h2>
      <div className={cn('share-contents')}>
        <div className={cn('share-content')}>
          <KakaoIcon className={cn('share-icon')} onClick={handleIconClick} />
          <h2 className={cn('share-text')}>카카오톡</h2>
        </div>
        <div className={cn('share-content')}>
          <LinkCopyIcon className={cn('share-icon')} onClick={handleIconClick} />
          <h2 className={cn('share-text')}>링크복사</h2>
        </div>
      </div>
    </div>
  );
}
