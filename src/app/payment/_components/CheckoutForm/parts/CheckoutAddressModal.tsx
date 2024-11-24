import { Address, AddressesEmptyCase } from '@/app/my-info/(account)/addresses/_components/Addresses';
import { useAddresses } from '@/hooks/useAddresses';
import { sortAddressesByDefault } from '@/utils/sortAddressesByDefault';
import type { UserAddress } from '@/types/shippingType';
import classNames from 'classnames/bind';

import styles from './CheckoutAddressModal.module.scss';

const cn = classNames.bind(styles);

interface CheckoutAddressModalProps {
  onClick: (item: UserAddress) => void;
}

export default function CheckoutAddressModal({ onClick }: CheckoutAddressModalProps) {
  const { data: addressesData } = useAddresses();

  const addresses = addressesData?.data ?? [];
  const sortedAddresses = sortAddressesByDefault(addresses);

  return (
    <article className={cn('container')}>
      <h1 className={cn('title')}>주소록</h1>
      <div className={cn('addresses')}>
        {addresses.length > 0 ? (
          sortedAddresses?.map((item) => <Address item={item} key={item.id} isDisplayOnModal onClick={onClick} />)
        ) : (
          <AddressesEmptyCase isDisplayOnModal />
        )}
      </div>
    </article>
  );
}
