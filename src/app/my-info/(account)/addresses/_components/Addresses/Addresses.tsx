'use client';

import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';

import { getAddresses } from '@/api/shippingAPI';
import type { UserAddress } from '@/types/shippingType';
import { Address, AddressesEmptyCase } from './index';

import styles from './Addresses.module.scss';

const cn = classNames.bind(styles);

export default function Addresses() {
  const { data: addressesData } = useQuery<{ data: UserAddress[] }>({
    queryKey: ['addressesData'],
    queryFn: getAddresses,
  });

  const addresses = addressesData?.data ?? [];
  const sortedAddresses = [...addresses].sort((a, b) => (b.isDefault ? 1 : -1) - (a.isDefault ? 1 : -1));

  return (
    <div className={cn('addresses')}>
      {addressesData ? sortedAddresses?.map((item) => <Address item={item} key={item.id} />) : <AddressesEmptyCase />}
    </div>
  );
}
