import classNames from 'classnames/bind';
import styles from './DatePicker.module.scss';

const cn = classNames.bind(styles);

function DatePicker() {
  return (
    <div className={cn('container')}>
      <div className={cn('month-picker-wrapper')}>
        <div className={cn('month-picker')}>1개월</div>
        <div className={cn('month-picker')}>2개월</div>
        <div className={cn('month-picker')}>3개월</div>
      </div>
    </div>
  );
}

export default DatePicker;
