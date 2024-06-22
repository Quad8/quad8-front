import RenderImages from '@/components/ReviewItem/RenderImages';
import { ReviewImage } from '@/types/ProductReviewTypes';

interface ReviewImageListProps {
  reviewImgs: ReviewImage[];
}

export default function ReviewImageList({ reviewImgs }: ReviewImageListProps) {
  return (
    <div>
      <RenderImages
        className='all-review-image'
        reviewImgs={reviewImgs}
        width={228}
        height={228}
        altPrefix='전체 리뷰 이미지'
      />
    </div>
  );
}
