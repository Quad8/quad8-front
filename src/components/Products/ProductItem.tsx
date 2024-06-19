import Image from 'next/image';
import Link from 'next/link';

import type { CategoryKey } from '@/types/Category';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';

const cn = classNames.bind(styles);

interface ProductItemProps {
  id: number;
  thumbnail: string;
  name: string;
  price: number;
  reviewscount: number;
  size: 'sm' | 'lg';
  category: CategoryKey;
}

export default function ProductItem({ id, size, name, reviewscount, price, thumbnail, category }: ProductItemProps) {
  return (
    <li>
      <Link href={`/${category}/${id}`}>
        <div className={cn('product-item', size)}>
          <div className={cn('product-image-wrap')}>
            <Image src={thumbnail} alt={`${name} 이미지`} fill className={cn('product-image', size)} />
          </div>
          <div className={cn('product-info')}>
            <h3 className={cn('product-title')}>{name}</h3>
            <div className={cn('product-details')}>
              <p className={cn('product-price')}>{price.toLocaleString()}원</p>
              <div className={cn('product-review-wishlist')}>
                <p className={cn('product-reviews')}>리뷰 {reviewscount > 99 ? '99+' : reviewscount}</p>
                <button type='button' className={cn('product-wishlist')}>
                  찜버튼 영역
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
