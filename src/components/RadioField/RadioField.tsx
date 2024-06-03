import classNames from 'classnames/bind';
import { ChangeEvent, InputHTMLAttributes, forwardRef, useEffect, useState } from 'react';
import { ErrorMessage, Radio } from '../parts';
import styles from './RadioField.module.scss';

const cn = classNames.bind(styles);

interface RadioFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  options: string[];
  errorMessage?: string;
}

/**
 * RadioField component documentation
 *
 * @param {object} props - 컴포넌트의 속성
 * @param {string} props.name - 컴포넌트의 name, 설정해야 그룹 안에서 하나의 값만 선택 가능
 * @param {string} props.label - 라디오 버튼 그룹의 레이블 텍스트
 * @param {string[]} props.options - 선택할 수 있는 옵션 목록
 * @param {string} [props.errorMessage] - 에러 메시지 텍스트
 * @param {string} [props.value] - 라디오 버튼의 초기 선택 값
 * @returns {JSX.Element} 렌더링된 라디오 버튼 그룹 컴포넌트
 */

export default forwardRef<HTMLInputElement, RadioFieldProps>(function RadioField(
  { label, options, errorMessage, value, ...rest },
  ref,
) {
  const [isSelected, setIsSelected] = useState(value || options[0]);

  useEffect(() => {
    if (value) {
      setIsSelected(value);
    }
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.value);
    if (rest.onChange) {
      rest.onChange(e);
    }
  };

  return (
    <fieldset className={cn('radio-field')}>
      <legend className={cn('label')}>{label}</legend>
      <div className={cn('radio-box')}>
        {options.map((option) => (
          <Radio
            ref={ref}
            key={option}
            id={option}
            value={option}
            onChange={handleChange}
            checked={isSelected === option}
            isError={!!errorMessage}
            {...rest}
          />
        ))}
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </fieldset>
  );
});
