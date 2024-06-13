import { Color } from '@react-three/fiber';
import { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './TooltipColor.module.scss';

const cn = classNames.bind(styles);

interface TooltipColorProps {
  colorInfo: [string, Color];
}

export default function TooltipColor({ colorInfo }: TooltipColorProps) {
  const paletteRef = useRef<HTMLDivElement>(null);
  const [key, color] = colorInfo;
  const [isHover, setIsHover] = useState(false);
  const hexToHsva = (hex: string) => {
    const r = parseInt(hex.substring(1, 3), 16) / 255;
    const g = parseInt(hex.substring(3, 5), 16) / 255;
    const b = parseInt(hex.substring(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0;
    if (delta === 0) {
      h = 0;
    } else if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    h = Math.round(h * 60);
    if (h < 0) {
      h += 360;
    }
    return { h, s: max === 0 ? 0 : (delta / max) * 100, v: max * 100, a: 1 };
  };

  const hsvaToHsla = ({ h, s, v, a }: Record<'h' | 's' | 'v' | 'a', number>) => {
    let ns = s / 100;
    const nv = v / 100;

    const nl = ((2 - ns) * nv) / 2;
    if (nl !== 0) {
      if (nl === 1) {
        ns = 0;
      } else if (nl < 0.5) {
        ns *= v / (nl * 2);
      } else {
        ns *= nv / (2 - nl * 2);
      }
    }

    return { h, s: ns * 100, l: nl * 100, a };
  };
  const hsvColor = hexToHsva(color.toString());
  const baseColor = hsvaToHsla({ h: hsvColor.h, s: 100, v: 100, a: 1 });

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
        <div className={cn('color')}>{color.toString().toUpperCase()},</div>
      </div>
    </div>
  );
}
