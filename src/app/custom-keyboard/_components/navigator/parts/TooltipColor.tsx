import { Color } from '@react-three/fiber';
import { useRef, useState } from 'react';
import classNames from 'classnames/bind';

import { getColorUpperCase } from '@/libs/getColorUpperCase';
import { convertHexToHsva, convertHsvaToHsla } from '@/libs/convertColor';

import styles from './TooltipColor.module.scss';

const cn = classNames.bind(styles);

interface TooltipColorProps {
  colorInfo: [string, Color];
}

export default function TooltipColor({ colorInfo }: TooltipColorProps) {
  const paletteRef = useRef<HTMLDivElement>(null);
  const [key, color] = colorInfo;
  const [isHover, setIsHover] = useState(false);

  const hsvColor = convertHexToHsva(color.toString());
  const baseColor = convertHsvaToHsla({ h: hsvColor.h, s: 100, v: 100, a: 1 });

  return (
    <div className={cn('wrapper')}>
      <div className={cn('key')}>{`${key}:`}</div>
      <div className={cn('color-wrapper')}>
        <div
          className={cn('palette-wrapper')}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className={cn('palette')} ref={paletteRef} style={{ backgroundColor: color.toString() }} />
          {isHover && (
            <div
              className={cn('color-picker-wrapper')}
              style={{ backgroundColor: `hsl(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%)` }}
            >
              <div
                className={cn('color-picker-dot')}
                style={{ top: `${(100 - hsvColor.v) * 0.098 - 0.25}rem`, left: `${hsvColor.s * 0.098 - 0.25}rem` }}
              />
            </div>
          )}
        </div>
        <div className={cn('color')}>{getColorUpperCase(color)},</div>
      </div>
    </div>
  );
}
