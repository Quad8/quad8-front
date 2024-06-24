import { HeartButton, Rating } from '@/components';
import ShareButton from '@/components/Buttons/ShareButton/ShareButton';
import type { ProductType } from '@/types/ProductTypes';
import classNames from 'classnames/bind';
import OptionWithButton from './OptionWithButtons';
import styles from './ProductDetail.module.scss';
import Thumbnail from './Thumbnail';

const cn = classNames.bind(styles);

interface ProductDetailProps {
  product: ProductType;
}

const DELIVERY_TEXT = {
  '배송 방법': '택배',
  '배송 지역': '전국',
  '배송 비용': '전 제품 무료 배송',
};

const POINT_TEXT = {
  포인트: '구매 확정시 포인트 지급',
};

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className={cn('detail-container')}>
      <Thumbnail imageList={product.thubmnailList} />
      <div className={cn('right-section')}>
        <div className={cn('name-button-section')}>
          <h1>{product.name}</h1>
          <div className={cn('buttons')}>
            <HeartButton usage='detail' id={product.id} isLiked={product.isLiked} />
            <ShareButton />
          </div>
        </div>
        <div className={cn('rate-section')}>
          <Rating rating={product.scope} />
          <h4>{product.reviewscount}개 상품평</h4>
        </div>
        <h1 className={cn('price')}>{product.price?.toLocaleString()}원</h1>
        <div className={cn('delivery-section')}>
          <h2 className={cn('explain-title')}>배송 안내</h2>
          {Object.entries(DELIVERY_TEXT).map(([key, value]) => (
            <h3 key={key} className={cn('explain-text')}>
              <span>{key}</span>
              {value}
            </h3>
          ))}
        </div>
        <div className={cn('point-section')}>
          <h2 className={cn('explain-title')}>추가 혜택</h2>
          <h3 className={cn('explain-text')}>
            <span>{Object.keys(POINT_TEXT)}</span> {POINT_TEXT.포인트}
          </h3>
        </div>
        <OptionWithButton productData={product} />
      </div>
    </div>
  );
}
