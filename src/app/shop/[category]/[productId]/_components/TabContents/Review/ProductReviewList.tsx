import { getProductReviews } from '@/api/productReviewAPI';
import { Dropdown } from '@/components';
import Pagination from '@/components/Pagination/Pagination';
import ReviewItem from '@/components/ReviewItem/ReviewItem';

import { PRODUCT_REVIEW_SORT_OPTIONS } from '@/constants/dropdownOptions';
import { searchParamsToObject } from '@/utils/searchParamsToObject';

import { NoReviewIcon } from '@/public/index';
import type { ProductReviewType, ReviewParamsType } from '@/types/productReviewType';
import { useQuery } from '@tanstack/react-query';

import classNames from 'classnames/bind';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import styles from './ProductReviewList.module.scss';

import ReviewImageList from './ReviewImageList';
import ReviewPreview from './ReviewPreview';

const cn = classNames.bind(styles);

interface ProductReviewListProps {
  productId: number;
}

export default function ProductReviewList({ productId }: ProductReviewListProps) {
  const [dropdownValue, setDropdownValue] = useState(PRODUCT_REVIEW_SORT_OPTIONS[0].label);
  const [sortQuery, setSortQuery] = useState<string | undefined>(PRODUCT_REVIEW_SORT_OPTIONS[0].value);
  const searchParams = useSearchParams();

  const initialParams: ReviewParamsType = {
    page: searchParams.get('page') || '0',
    size: searchParams.get('size') || '16',
  };
  const searchParamsObj = searchParamsToObject(searchParams);

  const { data: reviewData } = useQuery<ProductReviewType>({
    queryKey: ['review', productId],
    queryFn: () => getProductReviews({ productId }),
  });

  const { data: sortedData } = useQuery<ProductReviewType>({
    queryKey: ['review', productId, sortQuery, initialParams.page, initialParams.size],
    queryFn: () =>
      getProductReviews({ productId, sort: sortQuery, page: initialParams.page, size: initialParams.size }),
    enabled: !!reviewData,
  });

  if (!reviewData || !reviewData.reviewDtoList || reviewData.reviewDtoList.length === 0) {
    return (
      <div className={cn('no-review-container')}>
        <NoReviewIcon />
        <h4 className={cn('no-review-text')}>등록된 리뷰가 없습니다</h4>
      </div>
    );
  }

  const { reviewDtoList, ...previewData } = reviewData;
  const allReviewImgs = reviewDtoList.flatMap((review) =>
    review.reviewImgs.map((img) => ({
      reviewId: review.id,
      id: img.id,
      imageUrl: img.imageUrl,
      enabled: !!reviewData,
    })),
  );

  const displayData = sortedData || reviewData;
  const { reviewDtoList: displayReviewDtoList, currentPage, ...rest } = displayData;

  const handleChangeSortReview = (selectedValue: string) => {
    const sortOption = PRODUCT_REVIEW_SORT_OPTIONS.find((option) => option.label === selectedValue);
    setDropdownValue(selectedValue);
    setSortQuery(sortOption?.value);
  };

  return (
    <div>
      <h3 className={cn('main-title')}>상품 리뷰</h3>
      <div className={cn('review-container')}>
        <ReviewPreview previewData={previewData} />
        <ReviewImageList productId={productId} reviewImgs={allReviewImgs} />
        <Dropdown
          options={PRODUCT_REVIEW_SORT_OPTIONS.map((option) => option.label)}
          sizeVariant='xs'
          value={dropdownValue}
          onChange={handleChangeSortReview}
        />
        <div className={cn('review-items')}>
          {displayReviewDtoList.map((review) => (
            <ReviewItem key={review.id} reviewData={review} />
          ))}
        </div>
        <Pagination {...rest} number={currentPage} searchParams={searchParamsObj} />
      </div>
    </div>
  );
}
