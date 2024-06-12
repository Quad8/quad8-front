'use client';

import classNames from 'classnames/bind';
import type { CustomKeyboardKeyTypes } from '@/types/CustomKeyboardTypes';
import { Color } from '@react-three/fiber';
import DeleteTagIcon from '@/public/svgs/delete.svg';
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
      <DeleteTagIcon width={20} height={20} fill='#4968F6' onClick={onDelete} />
    </div>
  );
}
