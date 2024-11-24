'use client';

import { useAddresses } from '@/hooks/useAddresses';
import { sortAddressesByDefault } from '@/utils/sortAddressesByDefault';
import classNames from 'classnames/bind';
import { Address, AddressesEmptyCase } from './index';

import styles from './Addresses.module.scss';

const cn = classNames.bind(styles);

export default function Addresses() {
  const { data: addressesData } = useAddresses();

  const addresses = addressesData?.data ?? [];
  const sortedAddresses = sortAddressesByDefault(addresses);

  return (
    <div className={cn('addresses')}>
      {addresses.length > 0 ? (
        sortedAddresses?.map((item) => <Address item={item} key={item.id} />)
      ) : (
        <AddressesEmptyCase />
      )}
    </div>
  );
}
