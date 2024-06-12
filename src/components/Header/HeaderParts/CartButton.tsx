import CartIcon from '@/public/svgs/cart.svg';
import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './CartButton.module.scss';

interface CartButtonProps {
  cartCount: number;
  isBlack?: boolean;
}

const cn = classNames.bind(styles);

export default function CartButton({ cartCount, isBlack }: CartButtonProps) {
  const countStatus = cartCount > 9 ? '9+' : String(cartCount);

  return (
    <div className={cn('wrapper')}>
      <Link href='/cart' className={cn('icon')}>
        <CartIcon className={cn('cart-icon', { black: isBlack })} width={24} height={24} />
        {cartCount > 0 && <div className={cn('cart-count', cartCount > 9 && 'count-more-digit')}>{countStatus}</div>}
      </Link>
    </div>
  );
}
