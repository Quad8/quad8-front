import type { UserAddress } from '@/types/shippingType';

export const sortAddressesByDefault = (addresses: UserAddress[]) => {
  return [...addresses].sort((a, b) => (b.isDefault ? 1 : -1) - (a.isDefault ? 1 : -1));
};
