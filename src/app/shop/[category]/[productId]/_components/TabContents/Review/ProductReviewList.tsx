import ReviewItem from '@/components/ReviewItem/ReviewItem';
import { NoReviewIcon } from '@/public/index';
import type { ProductReviewType } from '@/types/ProductReviewTypes';
import classNames from 'classnames/bind';
import { memo } from 'react';
import styles from './ProductReviewList.module.scss';
import ReviewImageList from './ReviewImageList';
import ReviewPreview from './ReviewPreview';

const cn = classNames.bind(styles);

interface ProductReviewListProps {
  data: ProductReviewType;
}

export default memo(function ProductReviewList({ data }: ProductReviewListProps) {
  const { reviewDtoList, ...previewData } = data;
  const allReviewImgs = reviewDtoList.flatMap((review) => review.reviewImgs);

  return (
    <div>
      <h3 className={cn('main-title')}>상품 리뷰</h3>
      {reviewDtoList.length > 0 ? (
        <div>
          <ReviewPreview previewData={previewData} />
          <ReviewImageList reviewImgs={allReviewImgs} />
          {reviewDtoList.map((reviewData) => (
            <ReviewItem key={reviewData.id} data={reviewData} />
          ))}
        </div>
      ) : (
        <div className={cn('no-review-container')}>
          <NoReviewIcon />
          <h4 className={cn('no-review-text')}>등록된 리뷰가 없습니다</h4>
        </div>
      )}
    </div>
  );
});
