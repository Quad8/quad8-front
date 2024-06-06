import classNames from 'classnames/bind';
// import { COMMUNITY_DATA_DETAIL } from '@/app/mj/CommunityData';
import Image from 'next/image';
import contentImage from '@/public/images/myProfile.jpeg';
// import defaultImage from '@/public/images/defaultProfile.png';
// import { calculateTimeDifference } from '@/libs/calculateDate';
import styles from './PostCardDetailModal.module.scss';
import AuthorCard from './AuthorCard';
import { PostInteractions } from './PostInteractions';

// const COMMENTS = {
//   profileImage: defaultImage,
//   nickname: 'nininini',
//   createdAt: '2024-06-01T05:56:13.073Z',
// };

const cn = classNames.bind(styles);

export default function PostCardDetailModal() {
  const images = [contentImage, contentImage, contentImage];
  return (
    <div className={cn('container')}>
      <div className={cn('images-wrapper')}>
        <Image src={images[0]} alt='키보드 이미지' className={cn('selected-image')} />
        {images.length > 1 && (
          <div className={cn('unselected-image-wrapper')}>
            <Image src={images[0]} alt='키보드 이미지' className={cn('unselected-image')} />
            <Image src={images[0]} alt='키보드 이미지' className={cn('unselected-image')} />
          </div>
        )}
      </div>
      <div className={cn('content-wrapper')}>
        <p className={cn('title')}>title</p>
        <AuthorCard nickname='nickname' createdTime='2024.05.25' />
        <p className={cn('content')}>content box</p>
        <PostInteractions goodCount={20} commentCount={20} />
      </div>
    </div>
  );
}
