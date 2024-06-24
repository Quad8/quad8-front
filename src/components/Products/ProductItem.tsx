import Image from 'next/image';
import Link from 'next/link';

import { IMAGE_BLUR } from '@/constants/blurImage';
import type { CategoryKey } from '@/types/Category';
import classNames from 'classnames/bind';
import HeartButton from '../Buttons/HeartButton/HeartButton';
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
  hasShop: boolean;
  isLiked?: boolean;
}

export default function ProductItem({
  id,
  size,
  name,
  reviewscount,
  price,
  thumbnail,
  category,
  hasShop,
  isLiked = false,
}: ProductItemProps) {
  return (
    <li>
      <Link href={hasShop ? `${category}/${id}` : `/shop/${category}/${id}`}>
        <div className={cn('product-item', size)}>
          <div className={cn('product-image-wrap')}>
            <Image
              src={thumbnail}
              alt={`${name} 이미지`}
              fill
              className={cn('product-image', size)}
              sizes='(max-width: 600px) 480px, (max-width: 1200px) 800px, 1200px'
              placeholder={IMAGE_BLUR.placeholder}
              blurDataURL={IMAGE_BLUR.blurDataURL}
            />
          </div>
          <div className={cn('product-info')}>
            <h3 className={cn('product-title')}>{name}</h3>
            <div className={cn('product-details')}>
              <p className={cn('product-price')}>{price.toLocaleString()}원</p>
              <div className={cn('product-review-wishlist')}>
                <p className={cn('product-reviews')}>리뷰 {reviewscount > 99 ? '99+' : reviewscount}</p>
                <div className={cn('product-wishlist')}>
                  <HeartButton id={id} isLiked={isLiked} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
