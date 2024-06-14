import classNames from 'classnames/bind';
import styles from './Select.module.scss';

const cn = classNames.bind(styles);

export default function Select() {
  return (
    <div className={cn('select-container')}>
      <select className={cn('select-box')}>
        <option className={cn('option')} value='' selected>
          Select an option
        </option>
        <option className={cn('option')} value='option1'>
          Option 1
        </option>
        <option className={cn('option')} value='option2'>
          Option 2
        </option>
        <option className={cn('option')} value='option3'>
          Option 3
        </option>
        <option className={cn('option')} value='custom'>
          직접 입력
        </option>
      </select>
    </div>
  );
}
