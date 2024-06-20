import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';

import { addEnterKeyEvent } from '@/libs/addEnterKeyEvent';
import { formatDateToString } from '@/libs/formatDateToString';

import { InputField } from '@/components';
import { getPostDetail } from '@/api/communityAPI';
import { toast } from 'react-toastify';
import type { CommunityPostCardDetailDataType } from '@/types/CommunityTypes';
import { customKeyboardToString } from '@/libs/CustomKeyboardToString';
import AuthorCard from './AuthorCard';
import { PostInteractions } from './PostInteractions';
import Comment from './Comment';

import styles from './PostCardDetailModal.module.scss';

const cn = classNames.bind(styles);

interface PostCardDetailModalProps {
  cardId: number;
}

const initialPostData: CommunityPostCardDetailDataType = {
  id: 0,
  userId: 0,
  nickName: '',
  userImage: null,
  title: '',
  content: '',
  comments: [],
  isLiked: false,
  liked: false,
  createdAt: '',
  updatedAt: '',
  likeCount: 0,
  commentCount: 0,
  reviewImages: [],
  custom: {
    productId: 0,
    type: 'full',
    texture: 'metal',
    boardColor: '',
    switchType: '청축',
    baseKeyColor: '',
    hasPointKeyCap: false,
    pointKeyType: '내 맘대로 바꾸기',
    pointSetColor: '',
    imgUrl: '',
    price: 0,
    individualColor: {},
  },
};

export default function PostCardDetailModal({ cardId }: PostCardDetailModalProps) {
  const [postCardData, setPostCardData] = useState<CommunityPostCardDetailDataType>(initialPostData);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const cardData = await getPostDetail(cardId);
        setPostCardData(cardData);
      } catch (error) {
        toast.error('데이터를 불러오지 못했습니다.');
      }
    };
    fetchPost();
  }, [cardId]);

  const { commentCount, comments, content, likeCount, nickName, reviewImages, title, updatedAt, userImage, custom } =
    postCardData;
  const { type, texture, boardColor, switchType, baseKeyColor, hasPointKeyCap, pointKeyType, individualColor } = custom;

  const commentRef = useRef<HTMLInputElement>(null);
  const createdDateString = formatDateToString(new Date(updatedAt));
  const [clickedImage, setClickedImage] = useState(reviewImages[0]?.imgUrl);

  const handleSubmitComment = () => {
    if (commentRef.current) {
      commentRef.current.value = '';
    }
  };

  const options = {
    type,
    texture,
    boardColor,
    switchType,
    baseKeyColor,
    hasPointKeyCap,
    pointKeyType,
    individualColor,
  };

  const optionTexts = customKeyboardToString(options);

  useEffect(() => {
    const removeEvent = addEnterKeyEvent({ element: commentRef, callback: handleSubmitComment });
    return () => {
      removeEvent();
    };
  }, []);

  const handleThumbnailClick = (i: number) => {
    setClickedImage(reviewImages[i].imgUrl);
  };

  return (
    <div className={cn('container')}>
      <div className={cn('images-wrapper')}>
        <Image src={clickedImage} alt='키보드 이미지' className={cn('selected-image')} width={492} height={536} />
        <div className={cn('unselected-image-wrapper')}>
          {reviewImages.map((image, i) => (
            <div onClick={() => handleThumbnailClick(i)} key={image.id}>
              <Image src={image.imgUrl} alt='키보드 이미지' className={cn('images')} width={48} height={48} />
            </div>
          ))}
        </div>
      </div>
      <div className={cn('right-wrapper')}>
        <div className={cn('content-wrapper')}>
          <p className={cn('title')}>{title}</p>
          <AuthorCard nickname={nickName} dateText={createdDateString} userImage={userImage} />
          <div className={cn('keyboard-option-wrapper')}>
            <div className={cn('keyboard-option')}>{optionTexts[0]}</div>
            <div className={cn('keyboard-option')}>{optionTexts[1]}</div>
          </div>
          <p className={cn('content')}>{content}</p>
          <PostInteractions likeCount={likeCount} commentCount={commentCount} />
          <div className={cn('comment-wrapper')}>
            {comments?.map((comment) => (
              <Comment
                key={comment.id}
                createdTime={comment.createdAt}
                nickname={comment.nickName}
                comment={content}
                profile={comment.imgUrl}
              />
            ))}
          </div>
        </div>
        <div className={cn('comment-input')}>
          <InputField placeholder='댓글을 입력해주세요' ref={commentRef} />
        </div>
      </div>
    </div>
  );
}
