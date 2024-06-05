import Image from 'next/image';
import Link from 'next/link';

import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';

const cn = classNames.bind(styles);

interface ProductItemProps {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  reviewCount: number;
  size: 'sm' | 'lg';
}

export default function ProductItem({ id, size, title, reviewCount, price, imageUrl }: ProductItemProps) {
  return (
    <Link href={`/products/${id}`}>
      <div className={cn('product-item', size)}>
        <div className={cn('product-image-wrap')}>
          <Image src={imageUrl} alt={`${title} 이미지`} fill className={cn('product-image', size)} />
        </div>
        <div className={cn('product-info')}>
          <h3 className={cn('product-title')}>{title}</h3>
          <div className={cn('product-details')}>
            <p className={cn('product-price')}>{price.toLocaleString()}원</p>
            <div className={cn('product-review-wishlist')}>
              <p className={cn('product-reviews')}>리뷰 {reviewCount > 99 ? '99+' : reviewCount}</p>
              <button type='button' className={cn('product-wishlist')}>
                찜버튼 영역
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
