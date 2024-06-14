import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';

import defaultImage from '@/public/images/default.png';
import contentImage from '@/public/images/myProfile.jpeg';

import { addEnterKeyEvent } from '@/libs/addEnterKeyEvent';
import { formatDateToString } from '@/libs/formatDateToString';

import { InputField } from '@/components';
import AuthorCard from './AuthorCard';
import { PostInteractions } from './PostInteractions';
import Comment from './Comment';

import styles from './PostCardDetailModal.module.scss';

// const COMMENTS = {
//   profileImage: defaultImage,
//   nickname: 'nininini',
//   createdAt: '2024-06-01T05:56:13.073Z',
// };

const TEMP_DETAIL_POSTDATE = {
  id: 1234,
  userId: 12345,
  userNickname: '봉미선',
  title: '짱구야',
  content:
    '짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?짱구니?',
  createdDate: new Date(2022, 3, 22),
  goodCount: 13,
  commentCount: 192,
  keyboardImages: [
    { id: 1, src: contentImage },
    { id: 2, src: defaultImage },
  ],
};

const cn = classNames.bind(styles);

const tempKeyboardimages = [
  { id: 1, src: contentImage },
  { id: 2, src: defaultImage },
];

export default function PostCardDetailModal() {
  const commentRef = useRef<HTMLInputElement>(null);
  const [clickedImage, setClickedImage] = useState(tempKeyboardimages[0].src);

  const {
    title,
    content,
    userNickname,
    createdDate: created,
    goodCount,
    commentCount,
    keyboardImages,
  } = TEMP_DETAIL_POSTDATE;
  const createdDateString = formatDateToString(created);

  const handleMyCommentInput = () => {
    if (commentRef.current) {
      console.log(commentRef.current.value);
      commentRef.current.value = '';
    }
  };

  useEffect(() => {
    const removeEvent = addEnterKeyEvent(commentRef, handleMyCommentInput);
    return () => {
      removeEvent();
    };
  }, []);

  return (
    <div className={cn('container')}>
      <div className={cn('images-wrapper')}>
        <Image src={clickedImage} alt='키보드 이미지' className={cn('selected-image')} />
        {keyboardImages.length > 1 && (
          <div className={cn('unselected-image-wrapper')}>
            {keyboardImages.map((image, i) => (
              <div onClick={() => setClickedImage(keyboardImages[i].src)} key={image.id}>
                <Image src={image.src} alt='키보드 이미지' className={cn('images')} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={cn('content-wrapper')}>
        <p className={cn('title')}>{title}</p>
        <AuthorCard nickname={userNickname} dateText={createdDateString} />
        <p className={cn('content')}>{content}</p>
        <PostInteractions goodCount={goodCount} commentCount={commentCount} />
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
          <InputField placeholder='댓글을 입력해주세요' ref={commentRef} />
        </div>
      </div>
    </div>
  );
}
