import classNames from 'classnames/bind';
import styles from './OrderHeader.module.scss';

const cn = classNames.bind(styles);

const columns = [
  { key: 'column1', label: '상품정보' },
  { key: 'column2', label: '구매 / 구매확정일' },
  { key: 'column3', label: '후기 작성' },
];

export default function OrderHeader() {
  return (
    <div className={cn('header')}>
      {columns.map((column) => (
        <p key={column.key} className={cn('column', column.key)}>
          {column.label}
        </p>
      ))}
    </div>
  );
}
