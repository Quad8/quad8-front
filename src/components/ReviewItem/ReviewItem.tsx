'use client';

import type { Review } from '@/types/ReviewItem';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useState } from 'react';
import Rating from '../Rating/Rating';
import LikeButton from '../buttons/LikeButton/LikeButton';
import styles from './ReviewItem.module.scss';

const cn = classNames.bind(styles);

interface ReviewItemProps {
  isMyPage?: boolean;
  data: Review;
}

export default function ReviewItem({ isMyPage, data }: ReviewItemProps) {
  const [isExpand, setIsExpand] = useState(false);

  return (
    <div className={cn('review-item', { expand: isExpand, 'mypage-review': isMyPage })}>
      {!isMyPage && (
        <Image className={cn('profile-image')} src={data.profile_img} width={64} height={64} alt='프로필 이미지' />
      )}
      <div className={cn('review-box')}>
        <div className={cn('info-section')}>
          <div className={cn('rating-date')}>
            <Rating rating={data.star} />
            {isMyPage ? <h2 className={cn('star')}>{data.star}</h2> : <h2 className={cn('date')}>{data.date}</h2>}
          </div>
          {!isMyPage && (
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
          className={cn({ 'content-image-section': !isMyPage, 'my-page-section': isMyPage })}
          onClick={() => !isMyPage && setIsExpand((prev) => !prev)}
        >
          <p className={cn('content')}>{data.content}</p>
          {!isMyPage && !isExpand && data.imgList.length > 0 && (
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
          {!isMyPage && isExpand && (
            <div className={cn('expand-image-section')}>
              {data.imgList.map((item) => (
                <Image
                  key={item.id}
                  className={cn('big-image')}
                  src={item.imgUrl}
                  width={600}
                  height={600}
                  alt='펼친 리뷰 이미지'
                />
              ))}
            </div>
          )}
          {isMyPage && (
            <div>
              {data.imgList.map((item) => (
                <Image
                  key={item.id}
                  className={cn('mypage-review-image')}
                  src={item.imgUrl}
                  width={80}
                  height={80}
                  alt='마이페이지 리뷰 이미지'
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {!isMyPage && (
        <div className={cn('button-section')}>
          <LikeButton isChecked={false} forReview onClick={() => console.log('hi')} count={data.star} />
        </div>
      )}
    </div>
  );
}
