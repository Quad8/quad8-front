import { Dropdown } from '@/components';
import { Address } from './_components';

export default function AddressesPage() {
  return (
    <>
      <Address />
      <Dropdown options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} sizeVariant='xs' isDate />
    </>
  );
}
