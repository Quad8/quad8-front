'use client';

import classNames from 'classnames/bind';
import DeleteTagIcon from '@/public/svgs/deleteTag.svg';
import styles from './ColorTag.module.scss';

const cn = classNames.bind(styles);

interface ColorTagProps {
  keyCap: string;
  color: string;
  onClose: () => void;
}

export default function ColorTag({ keyCap, color, onClose }: ColorTagProps) {
  return (
    <div className={cn('wrapper')}>
      <div>{`${keyCap}: ${color}`}</div>
      <DeleteTagIcon width={20} height={20} onClick={onClose} />
    </div>
  );
}
