import { DeleteIcon } from '@/public/index';
import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import QuantitySelector from './QuantitySelector';

const cn = classNames.bind(styles);

interface OptionContainerProps {
  optionText?: string;
  price?: number;
  count: number;
  updateCount: (count: number) => void;
  deleteOption: () => void;
}

export default function OptionContainer({ optionText, price, count, updateCount, deleteOption }: OptionContainerProps) {
  return (
    <div className={cn('option-box')}>
      <h3 className={cn('option-text')}>{optionText}</h3>
      <QuantitySelector count={count} updateCount={updateCount} />
      <h3 className={cn('option-price')}>{price?.toLocaleString()}원</h3>
      <DeleteIcon className={cn('delete-icon')} onClick={deleteOption} />
    </div>
  );
}
