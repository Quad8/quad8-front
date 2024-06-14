import { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import defaultImage from '@/public/images/default.png';
import contentImage from '@/public/images/myProfile.jpeg';
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
  const tempKeyboardimages = [
    { id: 1, src: contentImage },
    { id: 2, src: defaultImage },
  ];
  const [selectedImage, setSelectedImage] = useState(tempKeyboardimages[0].src);

  return (
    <div className={cn('container')}>
      <div className={cn('images-wrapper')}>
        <Image src={selectedImage} alt='키보드 이미지' className={cn('selected-image')} />
        {tempKeyboardimages.length > 1 && (
          <div className={cn('unselected-image-wrapper')}>
            {tempKeyboardimages.map((image, i) => (
              <div onClick={() => setSelectedImage(tempKeyboardimages[i].src)} key={image.id}>
                <Image src={image.src} alt='키보드 이미지' className={cn('images')} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={cn('content-wrapper')}>
        <p className={cn('title')}>title</p>
        <AuthorCard nickname='nickname' timeAgo='2024.05.25' />
        <p className={cn('content')}>content box</p>
        <PostInteractions goodCount={20} commentCount={20} />
        <div className={cn('comment-wrapper')}>
          <Comment createdTime='Jun 15 2024 00:01:33 GMT+0900' nickname='훈이' comment='짱구야 귀엽다' />
          <Comment createdTime='Jun 15 2024 00:00:33 GMT+0900' nickname='훈이' comment='짱구야 귀엽다' />
          <Comment createdTime='Jun 13 2024 23:03:33 GMT+0900' nickname='훈이' comment='짱구야 귀엽다' />
          <Comment createdTime='Jun 15 2024 00:03:33 GMT+0900' nickname='훈이' comment='짱구야 귀엽다' />
          <Comment createdTime='Jun 15 2024 00:03:33 GMT+0900' nickname='훈이' comment='짱구야 귀엽다' />
          <Comment createdTime='Jun 15 2024 00:03:33 GMT+0900' nickname='훈이' comment='짱구야 귀엽다' />
          <Comment createdTime='May 13 2024 00:03:33 GMT+0900' nickname='훈이' comment='짱구야 귀엽다' />
        </div>
        <div className={cn('comment-input')}>
          <InputField placeholder='댓글을 입력해주세요' />
        </div>
      </div>
    </div>
  );
}
