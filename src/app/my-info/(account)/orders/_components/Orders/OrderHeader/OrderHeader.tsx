import classNames from 'classnames/bind';
import styles from './OrderHeader.module.scss';

const cn = classNames.bind(styles);

export default function OrderHeader() {
  return (
    <div className={cn('header')}>
      <p className={cn('column', 'column1')}>상품정보</p>
      <p className={cn('column', 'column2')}>구매 / 구매확정일</p>
      <p className={cn('column', 'column3')}>후기 작성</p>
    </div>
  );
}
