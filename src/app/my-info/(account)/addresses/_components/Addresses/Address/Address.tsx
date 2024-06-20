import type { UserAddress } from '@/types/shippingType';
import classNames from 'classnames/bind';

import styles from './Address.module.scss';

const cn = classNames.bind(styles);

interface AddressProps {
  item: UserAddress;
}

export default function Address({ item }: AddressProps) {
  const { phone, address, zoneCode, name, detailAddress, isDefault } = item;

  return (
    <article className={cn('address', { 'address-default': isDefault })}>
      <div className={cn('address-textbox')}>
        <div className={cn('address-namebox')}>
          <h1 className={cn('address-name')}>{name}</h1>
          {isDefault && <span className={cn('address-default-badge')}>기본 배송지</span>}
        </div>
        <p>{phone}</p>
        <p>
          ({zoneCode}) {address} {detailAddress}
        </p>
      </div>
      <div className={cn('button-box')}>
        <button className={cn('button')} type='button'>
          수정
        </button>
        <div className={cn('hr')} />
        <button className={cn('button')} type='button'>
          삭제
        </button>
      </div>
    </article>
  );
}
