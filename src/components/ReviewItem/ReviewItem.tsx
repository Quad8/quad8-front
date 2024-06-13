'use client';

import { Rating } from '@/components';
import type { ReviewType } from '@/types/ReviewItem';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useState } from 'react';
import styles from './ReviewItem.module.scss';

const cn = classNames.bind(styles);

interface ReviewItemProps {
  isDisplayOnMyPage?: boolean;
  data: ReviewType;
}

export default function ReviewItem({ isDisplayOnMyPage, data }: ReviewItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpanded = () => {
    if (!isDisplayOnMyPage) {
      setIsExpanded((prev) => !prev);
    }
  };

  const renderImages = (className: string, width: number, height: number, altPrefix: string) =>
    data.imgList.map((item, idx) => (
      <Image
        key={item.id}
        className={cn(className)}
        src={item.imgUrl}
        width={width}
        height={height}
        alt={`${altPrefix} ${idx + 1}`}
      />
    ));

  return (
    <div className={cn('review-item', { expand: isExpanded, 'mypage-review': isDisplayOnMyPage })}>
      {!isDisplayOnMyPage && (
        <Image className={cn('profile-image')} src={data.profile_img} width={64} height={64} alt='프로필 이미지' />
      )}
      <div className={cn('review-box')}>
        <div className={cn('info-section')}>
          <div className={cn('rating-date')}>
            <Rating rating={data.star} />
            {isDisplayOnMyPage ? (
              <h2 className={cn('star')}>{data.star}</h2>
            ) : (
              <h2 className={cn('date')}>{data.date}</h2>
            )}
          </div>
          {!isDisplayOnMyPage && (
            <>
              <h2 className={cn('name')}>{data.name}</h2>
              <h2 className={cn('option')}>{data.option}</h2>
            </>
          )}
        </div>
        <div className={cn('keywords')}>
          <h3 className={cn('keyword')}>
            <span className={cn('key')}>키감</span> {data.keyword[0].키감}
          </h3>
          <h3 className={cn('keyword')}>
            <span className={cn('key')}>색감</span> {data.keyword[1].색감}
          </h3>
          <h3 className={cn('keyword')}>
            <span className={cn('key')}>소리</span> {data.keyword[2].소리}
          </h3>
        </div>
        <div
          className={cn({ 'content-image-section': !isDisplayOnMyPage, 'my-page-section': isDisplayOnMyPage })}
          onClick={() => handleToggleExpanded()}
        >
          <p className={cn('content')}>{data.content}</p>
          {!isDisplayOnMyPage && !isExpanded && data.imgList.length > 0 && (
            <div className={cn('image-section')}>
              <Image
                src={data.imgList[0].imgUrl}
                className={cn('small-image')}
                width={123}
                height={123}
                alt='리뷰 이미지'
              />
              {data.imgList.length > 1 && <div className={cn('image-count')}>{data.imgList.length}</div>}
            </div>
          )}
          {!isDisplayOnMyPage && isExpanded && (
            <div className={cn('expand-image-section')}>{renderImages('big-image', 600, 600, '펼친 리뷰 이미지')}</div>
          )}
          {isDisplayOnMyPage && <div>{renderImages('mypage-review-image', 80, 80, '마이페이지 리뷰 이미지')}</div>}
        </div>
      </div>
      {!isDisplayOnMyPage && (
        <div className={cn('button-section')}>
          {/* <LikeButton isChecked={false} forReview onClick={() => console.log('hi')} count={data.star} /> */}
        </div>
      )}
    </div>
  );
}
