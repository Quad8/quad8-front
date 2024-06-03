import classNames from 'classnames/bind';
import { ChangeEvent, TextareaHTMLAttributes, forwardRef, useState } from 'react';
import { Label, Textarea } from '../parts';
import styles from './TextField.module.scss';

const cn = classNames.bind(styles);

interface TextFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

/**
 * TextField component documentation
 *
 * @param {object} props - 컴포넌트의 속성
 * @param {number} [props.rows=4] - 텍스트 영역의 기본 행 수
 * @param {string} [props.label] - 텍스트 영역의 레이블 텍스트
 * @param {number} [props.minLength=20] - 입력할 수 있는 최소 문자 수
 * @param {number} [props.maxLength=200] - 입력할 수 있는 최대 문자 수
 * @param {string} [props.size='md'] - 텍스트 영역의 크기, 'sm', 'md', 'lg' 중 하나
 * @returns {JSX.Element} 렌더링된 텍스트 필드 컴포넌트
 */

export default forwardRef<HTMLTextAreaElement, TextFieldProps>(function TextField(
  { id, rows = 4, label, minLength = 20, maxLength = 200, size = 'md', ...rest },
  ref,
) {
  const [currentLength, setCurrentLength] = useState(0);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentLength(e.target.value.length);
    if (rest.onChange) {
      rest.onChange(e);
    }
  };

  return (
    <div className={cn('default', size)}>
      {label && (
        <Label htmlFor={id} size='lg'>
          {label}
        </Label>
      )}
      <Textarea
        size={size}
        ref={ref}
        id={id}
        rows={rows}
        minLength={minLength}
        maxLength={maxLength}
        onChange={handleChange}
        {...rest}
      />
      <div className={cn('character-limit')}>
        {currentLength} / {maxLength}
      </div>
    </div>
  );
});
