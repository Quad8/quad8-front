'use client';

import { getProductDetail } from '@/api/productAPI';
import { getUserProductReviews } from '@/api/productReviewAPI';

import { formatDateToQueryString } from '@/utils/formatDateToQueryString';

import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useState } from 'react';

import { DatePicker, LogoLoading, MyInfoEmptyCase, Pagination, ReviewItem } from '@/components';
import type { ReviewPageProps, ReviewParamsType } from '@/types/productReviewType';
import MyReviewProduct from './MyReviewProduct';

import styles from './MyReviewProduct.module.scss';

const cn = classNames.bind(styles);

export default function MyReviewList({ searchParams }: ReviewPageProps) {
  const initialParams: ReviewParamsType = {
    page: searchParams.page || '0',
    size: searchParams.size || '16',
  };

  const [searchDate, setSearchDate] = useState<{ startDate: string; endDate: string }>({
    startDate: formatDateToQueryString('start', new Date()),
    endDate: formatDateToQueryString('end', new Date()),
  });
  const queryClient = useQueryClient();

  const { data: reviewsData, isPending: isReviewsPending } = useQuery({
    queryKey: ['userProductReviews'],
    queryFn: () =>
      getUserProductReviews({ startDate: searchDate.startDate, endDate: searchDate.endDate, ...initialParams }),
  });

  const productQueries = useQueries({
    queries: (reviewsData?.reviewDtoList || []).map((review) => ({
      queryKey: ['product', review.productId],
      queryFn: () => getProductDetail(review.productId),
    })),
  });

  const isPending = isReviewsPending || productQueries.some((query) => query.isPending);

  const handleDateChange = (date: { startDate: Date; endDate: Date }) => {
    const newSearchDate = {
      startDate: formatDateToQueryString('start', date.startDate),
      endDate: formatDateToQueryString('end', date.endDate),
    };
    setSearchDate(newSearchDate);
    queryClient.invalidateQueries({ queryKey: ['userProductReviews'] });
  };

  if (isPending) {
    return <LogoLoading />;
  }

  return (
    <div>
      <DatePicker startDate={searchDate.startDate} endDate={searchDate.endDate} onDateChange={handleDateChange} />
      {reviewsData && reviewsData?.reviewDtoList.length > 0 ? (
        <div className={cn('total-review-container')}>
          <div className={cn('review-list')}>
            {reviewsData.reviewDtoList.map((reviewData, index) => (
              <div key={reviewData.id}>
                {productQueries[index]?.data && (
                  <MyReviewProduct reviewData={reviewData} productData={productQueries[index].data} />
                )}
                <ReviewItem reviewData={reviewData} usage='mypage' />
              </div>
            ))}
          </div>
          <Pagination
            totalElements={reviewsData.totalElements}
            totalPages={reviewsData.totalPages}
            number={reviewsData.currentPage}
            first={reviewsData.first}
            last={reviewsData.last}
            searchParams={searchParams}
          />
        </div>
      ) : (
        <MyInfoEmptyCase message='구매 후기가 없습니다.' />
      )}
    </div>
  );
}
