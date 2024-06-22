import { CartIcon } from '@/public/index';
import classNames from 'classnames/bind';
import styles from './CartButton.module.scss';

interface CartButtonProps {
  cartCount: number;
  isBlack?: boolean;
  onClick: () => void;
}

const cn = classNames.bind(styles);

export default function CartButton({ cartCount, isBlack, onClick }: CartButtonProps) {
  const countStatus = cartCount > 9 ? '9+' : String(cartCount);

  return (
    <div className={cn('wrapper')}>
      <CartIcon className={cn('cart-icon', { black: isBlack })} onClick={onClick} />
      {cartCount > 0 && <div className={cn('cart-count', cartCount > 9 && 'count-more-digit')}>{countStatus}</div>}
    </div>
  );
}
