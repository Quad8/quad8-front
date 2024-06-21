import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

import { InputField } from '@/components';
import { getPostDetail } from '@/api/communityAPI';
import { addEnterKeyEvent } from '@/libs/addEnterKeyEvent';
import { formatDateToString } from '@/libs/formatDateToString';
import type { CommunityPostCardDetailDataType } from '@/types/CommunityTypes';
import { keydeukImg } from '@/public/index';
import Comment from './Comment';
import AuthorCard from './AuthorCard';
import { PostInteractions } from './PostInteractions';

import styles from './PostCardDetailModal.module.scss';

const cn = classNames.bind(styles);

interface ReviewImageType {
  imgUrl: string;
  id: number;
}

interface PostCardDetailModalProps {
  cardId: number;
}

export default function PostCardDetailModal({ cardId }: PostCardDetailModalProps) {
  const commentRef = useRef<HTMLInputElement>(null);
  const [clickedImage, setClickedImage] = useState('');
  const handleSubmitComment = () => {
    if (commentRef.current) {
      commentRef.current.value = '';
    }
  };
  useEffect(() => {
    const removeEvent = addEnterKeyEvent({ element: commentRef, callback: handleSubmitComment });
    return () => {
      removeEvent();
    };
  }, []);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['postData'],
    queryFn: () => getPostDetail(cardId),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    toast.error('데이터를 불러오는데 실패하였습니다.');
    return <span>Error: {error.message}</span>;
  }

  const { data: postData } = data;

  const { commentCount, comments, content, likeCount, nickName, reviewImages, title, updatedAt, userImage } =
    postData as CommunityPostCardDetailDataType;

  // const { type, texture, boardColor, switchType, baseKeyColor, hasPointKeyCap, pointKeyType, individualColor } = custom;

  const createdDateString = formatDateToString(new Date(updatedAt));

  // const options = {
  //   type,
  //   texture,
  //   boardColor,
  //   switchType,
  //   baseKeyColor,
  //   hasPointKeyCap,
  //   pointKeyType,
  //   individualColor,
  // };

  const handleThumbnailClick = (i: number) => {
    setClickedImage(reviewImages[i].imgUrl);
  };

  return (
    <div className={cn('container')}>
      <div className={cn('left-wrapper')}>
        <div className={cn('selected-image')}>
          <Image
            src={clickedImage || (reviewImages.length > 0 ? reviewImages[0].imgUrl : keydeukImg)}
            alt='키보드 이미지'
            fill
            onError={() => setClickedImage('')}
            sizes='(max-width: 1200px) 100%'
          />
        </div>
        {reviewImages.length > 1 && (
          <div className={cn('unselected-image-wrapper')}>
            {reviewImages.map((image: ReviewImageType, i: number) => (
              <div onClick={() => handleThumbnailClick(i)} key={image.id}>
                <Image src={image.imgUrl} alt='키보드 이미지' className={cn('images')} width={48} height={48} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={cn('right-wrapper')}>
        <div className={cn('content-wrapper')}>
          <p className={cn('title')}>{title}</p>
          <AuthorCard nickname={nickName} dateText={createdDateString} userImage={userImage} />
          <div className={cn('keyboard-option-wrapper')}>키보드 옵션 넣는 곳~~~~~</div>
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
