import CartIcon from '@/public/svgs/cart.svg';
import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './CartButton.module.scss';

interface CartButtonProps {
  cartCount: number;
  white?: boolean;
}

const cn = classNames.bind(styles);

export default function CartButton({ cartCount, white }: CartButtonProps) {
  const countStatus = cartCount > 9 ? '9+' : String(cartCount);

  return (
    <div className={cn('wrapper')}>
      <Link href='/cart' className={cn('icon')}>
        <CartIcon width={24} height={24} fill={white ? '#111111' : '#ffffff'} />
        {cartCount > 0 && <div className={cn('cart-count', cartCount > 9 && 'count-more-digit')}>{countStatus}</div>}
      </Link>
    </div>
  );
}
