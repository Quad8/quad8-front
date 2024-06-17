import classNames from 'classnames/bind';
import Image from 'next/image';

import CheckboxCircleIcon from '@/public/svgs/checkboxCircle.svg';
import styles from './OptionProductCard.module.scss';

const cn = classNames.bind(styles);

interface OptionProductCardProps {
  isChecked: boolean;
  onClick: () => void;
  productImage: string;
  productName: string;
  price: number;
}

export default function OptionProductCard({
  isChecked,
  onClick,
  productName,
  productImage,
  price,
}: OptionProductCardProps) {
  return (
    <div className={cn('wrapper')} onClick={onClick}>
      <div className={cn('image-wrapper')}>
        <Image src={productImage} alt='옵션' width={221} height={221} className={cn('image')} />
        <CheckboxCircleIcon width={32} height={32} className={cn('checkbox-icon', { checked: isChecked })} />
      </div>
      <div className={cn('content-wrapper')}>
        <p>{productName}</p>
        <p>{price.toLocaleString()}원</p>
      </div>
    </div>
  );
}
