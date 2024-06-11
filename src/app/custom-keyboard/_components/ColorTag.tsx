'use client';

import classNames from 'classnames/bind';
import DeleteTagIcon from '@/public/svgs/deleteTag.svg';
import type { CustomKeyboardKeyTypes } from '@/types/CustomKeyboardTypes';
import { Color } from '@react-three/fiber';
import styles from './ColorTag.module.scss';

const cn = classNames.bind(styles);

interface ColorTagProps {
  keyCap: CustomKeyboardKeyTypes;
  color: Color;
  onDelete: () => void;
}

export default function ColorTag({ keyCap, color, onDelete }: ColorTagProps) {
  return (
    <div className={cn('wrapper')}>
      <div>{`${keyCap}: ${color}`}</div>
      <DeleteTagIcon width={20} height={20} onClick={onDelete} />
    </div>
  );
}
