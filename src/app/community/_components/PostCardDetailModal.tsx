import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useQuery, useMutation } from '@tanstack/react-query';

import { InputField } from '@/components';
import { getPostDetail, postComment } from '@/api/communityAPI';
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

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ['postData'],
    queryFn: () => getPostDetail(cardId),
  });

  const { mutate: postCommentMutation } = useMutation({
    mutationFn: postComment,
    onSuccess: async () => {
      toast.success('댓글이 성공적으로 등록되었습니다.');
      if (commentRef.current) {
        commentRef.current.value = '';
      }
      await refetch();
    },
    onError: () => {
      toast.error('댓글 등록 중 오류가 발생하였습니다.');
    },
  });

  const handleSubmitComment = () => {
    if (commentRef.current) {
      const commentContent = commentRef.current.value;
      console.log(commentContent);
      postCommentMutation({ id: cardId, content: commentContent });
    }
  };

  useEffect(() => {
    const removeEvent = addEnterKeyEvent({ element: commentRef, callback: handleSubmitComment });
    return () => {
      removeEvent();
    };
  }, [commentRef]);

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
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                createdTime={comment.createdAt}
                nickname={comment.nickName}
                comment={comment.content}
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
