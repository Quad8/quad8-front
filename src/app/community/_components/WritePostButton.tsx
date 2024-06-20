'use client';

import { Button } from '@/components';
import classNames from 'classnames/bind';
import { PlusIcon } from '@/public/index';
import styles from './WritePostButton.module.scss';

const cn = classNames.bind(styles);

export default function WritePostButton() {
  const handleWritePostButton = () => {
    /** 글 작성하기 버튼 */
  };

  return (
    <Button width={120} fontSize={14} paddingVertical={8} radius={4} onClick={handleWritePostButton}>
      <div className={cn('write-button-content')}>
        <PlusIcon /> 글 작성하기
      </div>
    </Button>
  );
}
