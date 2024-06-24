import RenderImages from '@/components/ReviewItem/RenderImages';
import type { ReviewImage } from '@/types/ProductReviewTypes';
import classNames from 'classnames/bind';
import styles from './ReviewImageList.module.scss';

const cn = classNames.bind(styles);
interface ReviewImageListProps {
  reviewImgs: ReviewImage[];
}

export default function ReviewImageList({ reviewImgs }: ReviewImageListProps) {
  return (
    <div className={cn('all-review-image-lists')}>
      <RenderImages
        className={cn('all-review-image')}
        reviewImgs={reviewImgs}
        width={228}
        height={228}
        altPrefix='전체 리뷰 이미지'
      />
    </div>
  );
}
