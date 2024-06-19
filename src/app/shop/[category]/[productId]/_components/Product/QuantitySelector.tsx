import { MinusIcon, PlusIcon } from '@/public/index';
import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';

const cn = classNames.bind(styles);

interface QuantitySelectorProps {
  count: number;
  updateCount: (count: number) => void;
}

export default function QuantitySelector({ count, updateCount }: QuantitySelectorProps) {
  const incrementCount = () => updateCount(count + 1);
  const decrementCount = () => count > 1 && updateCount(count - 1);

  return (
    <div className={cn('count-icons')}>
      <MinusIcon className={cn('icon', { 'gray-icon': count === 1 })} onClick={decrementCount} />
      <span>{count}</span>
      <PlusIcon className={cn('icon')} onClick={incrementCount} />
    </div>
  );
}
