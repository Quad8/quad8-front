import { MinusIcon, PlusIcon } from '@/public/index';
import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';

const cn = classNames.bind(styles);

interface QuantitySelectorProps {
  count: number;
  incrementCount: () => void;
  decrementCount: () => void;
}

export default function QuantitySelector({ count, incrementCount, decrementCount }: QuantitySelectorProps) {
  return (
    <div className={cn('count-icons')}>
      <MinusIcon className={cn('icon', { 'gray-icon': count === 1 })} onClick={decrementCount} />
      <span>{count}</span>
      <PlusIcon className={cn('icon')} onClick={incrementCount} />
    </div>
  );
}
