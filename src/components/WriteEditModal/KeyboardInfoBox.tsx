import classNames from 'classnames/bind';
import type { CustomKeyboardTypes } from '@/types/CustomKeyboardTypes';
import styles from './KeyboardInfoBox.module.scss';

interface KeyboardInfoBoxProps {
  keyboardInfo: CustomKeyboardTypes;
  isCustomReview?: boolean;
}
const cn = classNames.bind(styles);

export default function KeyboardInfoBox({ keyboardInfo, isCustomReview }: KeyboardInfoBoxProps) {
  const {
    layout,
    appearance_texture: appearanceTexture,
    appearance_color: appearanceColor,
    switch: keyboardSwitch,
    has_point_key: hasPointKey,
    keycap_color: keycapColor,
  } = keyboardInfo;
  const optionString = `${layout} 
                        / ${appearanceTexture} 
                        / ${appearanceColor} 
                        / ${keyboardSwitch} 
                        / 포인트 키캡 ${hasPointKey ? 'o' : 'x'}
                      `;

  const keycapColors = Object.entries(keycapColor)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');

  return (
    <div>
      {isCustomReview && <p className={cn('sub-text')}>해당 후기는 커뮤니티란에 게시됩니다.</p>}
      <div className={cn('container')}>
        <div className={cn('keyboard-image')} />
        <div className={cn('keyboard-info-text')}>
          <h3 id={cn('title')}>키득 커스텀 기보드</h3>
          <h3 id={cn('products-list')}>키득 베어본, 키득 스위치, 키득 키캡</h3>
          <div className={cn('options-div')}>
            {optionString}
            <div className={cn('keycap-color')}>{keycapColors}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
