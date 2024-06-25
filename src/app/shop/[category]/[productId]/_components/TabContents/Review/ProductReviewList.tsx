import { getProductReviews } from '@/api/productReviewAPI';
import { Dropdown } from '@/components';
import ReviewItem from '@/components/ReviewItem/ReviewItem';
import { PRODUCT_REVIEW_SORT_OPTIONS } from '@/constants/dropdownOptions';
import { NoReviewIcon } from '@/public/index';
import type { ProductReviewType } from '@/types/ProductReviewTypes';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './ProductReviewList.module.scss';
import ReviewImageList from './ReviewImageList';
import ReviewPreview from './ReviewPreview';

const cn = classNames.bind(styles);

interface ProductReviewListProps {
  data: ProductReviewType;
  productId: string;
}

export default function ProductReviewList({ data, productId }: ProductReviewListProps) {
  const { reviewDtoList, ...previewData } = data;
  const allReviewImgs = reviewDtoList.flatMap((review) => review.reviewImgs);
  const [dropdownValue, setDropdownValue] = useState(PRODUCT_REVIEW_SORT_OPTIONS[1].label);
  const [sortQuery, setSortQuery] = useState<string | undefined>(PRODUCT_REVIEW_SORT_OPTIONS[1].value);

  const {
    data: sortedData,
    refetch,
    isPending,
  } = useQuery<ProductReviewType>({
    queryKey: ['review', productId, dropdownValue],
    queryFn: () => getProductReviews({ productId, sort: sortQuery }),
    initialData: data,
  });

  useEffect(() => {
    refetch();
  }, [dropdownValue, refetch]);

  const handleChangeSortReview = (selectedValue: string) => {
    const sortOption = PRODUCT_REVIEW_SORT_OPTIONS.find((option) => option.label === selectedValue);
    setDropdownValue(selectedValue);
    setSortQuery(sortOption?.value);
  };

  return (
    <div>
      <h3 className={cn('main-title')}>상품 리뷰</h3>
      {reviewDtoList.length > 0 && !isPending ? (
        <div className={cn('review-container')}>
          <ReviewPreview previewData={previewData} />
          <ReviewImageList reviewImgs={allReviewImgs} />
          <Dropdown
            options={PRODUCT_REVIEW_SORT_OPTIONS.map((option) => option.label)}
            sizeVariant='xs'
            value={dropdownValue}
            onChange={handleChangeSortReview}
          />
          <div className={cn('review-items')}>
            {sortedData.reviewDtoList.map((reviewData) => (
              <ReviewItem key={reviewData.id} data={reviewData} />
            ))}
          </div>
        </div>
      ) : (
        <div className={cn('no-review-container')}>
          <NoReviewIcon />
          <h4 className={cn('no-review-text')}>등록된 리뷰가 없습니다</h4>
        </div>
      )}
    </div>
  );
}
