import classNames from 'classnames/bind';
import styles from './AddressesEmptyCase.module.scss';

const cn = classNames.bind(styles);

export default function AddressesEmptyCase() {
  return (
    <article className={cn('addresses')}>
      <p>등록된 배송지 정보가 없습니다.</p>
      <p>새 배송지 정보를 등록해주세요.</p>
    </article>
  );
}
