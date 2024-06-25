'use client';

import Image from 'next/image';
import { useState } from 'react';

import { Rating } from '@/components';
import { REVIEW_KEYWORD } from '@/constants/reviewKeyword';
import type { ReviewDto } from '@/types/ProductReviewTypes';

import { CATEGORY_MAP } from '@/constants/product';
import { formatDateToString } from '@/libs/formatDateToString';
import classNames from 'classnames/bind';
import ReviewLikeButton from '../Buttons/ReviewLikeButton/ReviewLikeButton';
import ProfileImage from '../ProfileImage/ProfileImage';
import RenderImages from './RenderImages';
import styles from './ReviewItem.module.scss';

const cn = classNames.bind(styles);

interface ReviewItemProps {
  isDisplayOnMyPage?: boolean;
  data: ReviewDto;
}

const PRODUCT_LIST = Object.values(CATEGORY_MAP);

export default function ReviewItem({ isDisplayOnMyPage, data }: ReviewItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    id,
    score,
    content,
    reviewImgs,
    option1,
    option2,
    option3,
    switchOption,
    productCategoryId,
    writer,
    likeCount,
    likedByUser,
    updatedAt,
  } = data;
  const { nickname, imgUrl } = writer;
  const optionsValues = [option1, option2, option3];

  const optionKeywords = Object.entries(REVIEW_KEYWORD[PRODUCT_LIST[productCategoryId - 1]]);

  const handleToggleExpanded = () => {
    if (!isDisplayOnMyPage && reviewImgs?.length > 0) {
      setIsExpanded((prev) => !prev);
    }
  };

  return (
    <div className={cn('review-item', { expand: isExpanded, 'mypage-review': isDisplayOnMyPage })}>
      {!isDisplayOnMyPage && <ProfileImage profileImage={imgUrl} />}
      <div className={cn('review-box')}>
        <div className={cn('info-section')}>
          <div className={cn('rating-date')}>
            <Rating rating={score} />
            {isDisplayOnMyPage ? (
              <h2 className={cn('star')}>{score}</h2>
            ) : (
              <h2 className={cn('date')}>{formatDateToString(new Date(updatedAt))}</h2>
            )}
          </div>
          {!isDisplayOnMyPage && (
            <>
              <h2 className={cn('name')}>{nickname}</h2>
              {switchOption.length ? <h2 className={cn('option')}>스위치: {switchOption}</h2> : ''}
            </>
          )}
        </div>
        <div className={cn('keywords')}>
          {optionKeywords.map(([key, values], idx) => (
            <h3 key={key} className={cn('keyword')}>
              <span className={cn('key')}>{key}</span> {values[optionsValues[idx] - 1]}
            </h3>
          ))}
        </div>
        <div
          className={cn({ 'content-image-section': !isDisplayOnMyPage, 'my-page-section': isDisplayOnMyPage })}
          onClick={handleToggleExpanded}
        >
          <p className={cn('content')}>{content}</p>
          {!isDisplayOnMyPage && !isExpanded && reviewImgs?.length > 0 && (
            <div className={cn('image-section')}>
              <Image
                src={reviewImgs[0].imageUrl}
                className={cn('small-image')}
                width={123}
                height={123}
                alt='리뷰 이미지'
              />
              {data.reviewImgs.length > 1 && <div className={cn('image-count')}>{data.reviewImgs.length}</div>}
            </div>
          )}
          {!isDisplayOnMyPage && isExpanded && (
            <div className={cn('expand-image-section')}>
              <RenderImages
                className={cn('big-image')}
                reviewImgs={reviewImgs}
                width={600}
                height={600}
                altPrefix='펼친 리뷰 이미지'
              />
            </div>
          )}
          {isDisplayOnMyPage && (
            <div>
              <RenderImages
                className={cn('mypage-review-image')}
                reviewImgs={reviewImgs}
                width={80}
                height={80}
                altPrefix='마이페이지 리뷰 이미지'
              />
            </div>
          )}
        </div>
      </div>
      {!isDisplayOnMyPage && (
        <div className={cn('button-section')}>
          <ReviewLikeButton id={id} isLiked={likedByUser} likeCount={likeCount} />
        </div>
      )}
    </div>
  );
}
