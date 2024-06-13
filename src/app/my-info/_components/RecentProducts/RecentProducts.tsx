import classNames from 'classnames/bind';
import MyInfoEmptyCase from '../MyInfoEmptyCase/MyInfoEmptyCase';
import styles from './RecentProducts.module.scss';

const cn = classNames.bind(styles);

export default function RecentProducts() {
  return (
    <article className={cn('recent')}>
      <h1 className={cn('recent-title')}>최근 본 상품</h1>
      <MyInfoEmptyCase text='최근 본 상품이 없습니다.' isBackgroundColor />
    </article>
  );
}
