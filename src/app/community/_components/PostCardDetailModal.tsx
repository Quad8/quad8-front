import { useState } from 'react';
import classNames from 'classnames/bind';
// import { COMMUNITY_DATA_DETAIL } from '@/app/mj/CommunityData';
import Image from 'next/image';
import defaultImage from '@/public/images/default.png';
import contentImage from '@/public/images/myProfile.jpeg';
// import { calculateTimeDifference } from '@/libs/calculateDate';
import { InputField } from '@/components';
import styles from './PostCardDetailModal.module.scss';
import AuthorCard from './AuthorCard';
import { PostInteractions } from './PostInteractions';
import Comment from './Comment';
// const COMMENTS = {
//   profileImage: defaultImage,
//   nickname: 'nininini',
//   createdAt: '2024-06-01T05:56:13.073Z',
// };

const cn = classNames.bind(styles);

export default function PostCardDetailModal() {
  const images = [contentImage, defaultImage, contentImage];
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className={cn('container')}>
      <div className={cn('images-wrapper')}>
        <Image src={selectedImage} alt='키보드 이미지' className={cn('selected-image')} />
        {images.length > 1 && (
          <div className={cn('unselected-image-wrapper')}>
            {images.map((image, i) => (
              <div onClick={() => setSelectedImage(images[i])} key={image.toString()}>
                <Image src={image} alt='키보드 이미지' className={cn('images')} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={cn('content-wrapper')}>
        <p className={cn('title')}>title</p>
        <AuthorCard nickname='nickname' createdTime='2024.05.25' />
        <p className={cn('content')}>content box</p>
        <PostInteractions goodCount={20} commentCount={20} />
        <div className={cn('comment-wrapper')}>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
        <div className={cn('comment-input')}>
          <InputField placeholder='댓글을 입력해주세요' />
        </div>
      </div>
    </div>
  );
}
