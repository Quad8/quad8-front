import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { deletePostCard, getPostDetail, postComment } from '@/api/communityAPI';
import { Button, CustomOption, InputField, Modal } from '@/components';
import Dialog from '@/components/Dialog/Dialog';
import WriteEditModal from '@/components/WriteEditModal/WriteEditModal';
import { IMAGE_BLUR } from '@/constants/blurImage';

import { addEnterKeyEvent } from '@/libs/addEnterKeyEvent';
import { formatDateToString } from '@/libs/formatDateToString';
import { keydeukImg } from '@/public/index';
import type { CommunityPostCardDetailDataType } from '@/types/CommunityTypes';
import AuthorCard from './AuthorCard';
import Comment from './Comment';
import { PostInteractions } from './PostInteractions';

import styles from './PostCardDetailModal.module.scss';

const cn = classNames.bind(styles);
interface PostCardDetailModalProps {
  cardId: number;
  onClose: () => void;
  isMine?: boolean;
}

export default function PostCardDetailModal({ cardId, onClose, isMine }: PostCardDetailModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [commentRef, setCommentRef] = useState<HTMLInputElement | null>(null);
  const [clickedImage, setClickedImage] = useState('');
  const [isEditAlertOpen, setIsEditAlertOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const { data, refetch, isPending } = useQuery({
    queryKey: ['postData', cardId],
    queryFn: () => getPostDetail(cardId),
  });
  const handleSuccessSubmitComment = () => {
    if (commentRef) {
      commentRef.value = '';
    }
    queryClient.invalidateQueries({ queryKey: ['postCardsList'] });
    refetch();
  };
  const { mutate: postCommentMutation } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      handleSuccessSubmitComment();
    },
    onError: () => {
      toast.error('댓글 등록 중 오류가 발생하였습니다.');
    },
  });
  const { mutate: deletePostMutation } = useMutation({
    mutationFn: deletePostCard,
    onSuccess: () => {
      toast.success('게시글이 삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['MyCustomReview'],
      });
    },
    onError: () => {
      toast.error('게시글 삭제 중 오류가 발생하였습니다.');
    },
  });
  useEffect(() => {
    const handleSubmitComment = () => {
      if (commentRef) {
        const commentContent = commentRef.value;
        postCommentMutation({ id: cardId, content: commentContent });
      }
    };
    const removeEvent = addEnterKeyEvent({ element: { current: commentRef }, callback: handleSubmitComment });
    return () => {
      removeEvent();
    };
  }, [cardId, postCommentMutation, commentRef]);

  if (isPending) {
    return null;
  }

  const { data: postData, status, message } = data;

  if (status === 'FAIL') {
    toast.error(message);
    onClose();
    return null;
  }

  const {
    commentCount,
    comments,
    content,
    likeCount,
    nickName,
    reviewImages,
    title,
    updatedAt,
    userImage,
    custom,
    isLiked,
  } = postData as CommunityPostCardDetailDataType;

  const createdDateString = formatDateToString(new Date(updatedAt));

  const handleClickThumbnail = (i: number) => {
    setClickedImage(reviewImages[i].imgUrl);
  };
  const handleClickDeleteAlertButon = () => {
    deletePostMutation(cardId);
    setIsDeleteAlertOpen(false);
  };
  const handleCloseDeleteAlert = () => {
    setIsDeleteAlertOpen(false);
  };
  const handleClickEditAlertButton = () => {
    setIsEditModalOpen(true);
    setIsEditAlertOpen(false);
  };
  const handleCloseEditAlert = () => {
    setIsEditAlertOpen(false);
  };
  const handleClickEditModalButton = () => {
    setIsEditModalOpen(false);
    queryClient.invalidateQueries({
      queryKey: ['MyCustomReview'],
    });
    queryClient.invalidateQueries({
      queryKey: ['postData', cardId],
    });
  };
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className={cn('container')} ref={containerRef}>
      {isMine && (
        <div className={cn('edit-button-wrapper')}>
          <Button width={72} paddingVertical={8} onClick={() => setIsEditAlertOpen(true)}>
            수정
          </Button>
          <Button width={72} paddingVertical={8} onClick={() => setIsDeleteAlertOpen(true)}>
            삭제
          </Button>
        </div>
      )}
      <div className={cn('image-content-wrapper')}>
        <div className={cn('left-wrapper')}>
          <div className={cn('selected-image')}>
            <Image
              src={clickedImage || (reviewImages.length > 0 ? reviewImages[0].imgUrl : keydeukImg)}
              alt='키보드 이미지'
              fill
              onError={() => setClickedImage('')}
              sizes='(max-width: 1200px) 100%'
              priority
              placeholder={IMAGE_BLUR.placeholder}
              blurDataURL={IMAGE_BLUR.blurDataURL}
            />
          </div>
          {reviewImages.length > 1 && (
            <div className={cn('unselected-image-wrapper')}>
              {reviewImages.map((image, i: number) => (
                <div onClick={() => handleClickThumbnail(i)} key={image.id}>
                  <Image
                    src={image.imgUrl}
                    alt='키보드 이미지'
                    className={cn('images')}
                    width={48}
                    height={48}
                    priority
                    placeholder={IMAGE_BLUR.placeholder}
                    blurDataURL={IMAGE_BLUR.blurDataURL}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={cn('right-wrapper')}>
          <div className={cn('content-wrapper')}>
            <p className={cn('title')}>{title}</p>
            <AuthorCard nickname={nickName} dateText={createdDateString} userImage={userImage} />
            <CustomOption wrapperRef={containerRef} customData={custom} />
            <p className={cn('content')}>{content}</p>
            <PostInteractions likeCount={likeCount} commentCount={commentCount} cardId={cardId} isLiked={isLiked} />
            <div className={cn('comment-wrapper')}>
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  cardId={cardId}
                  commentId={comment.id}
                  commentUserId={comment.userId}
                  createdTime={comment.createdAt}
                  nickname={comment.nickName}
                  comment={comment.content}
                  profile={comment.imgUrl}
                />
              ))}
            </div>
          </div>
          <div className={cn('comment-input')}>
            <InputField placeholder='댓글을 입력해주세요' ref={(ref) => setCommentRef(ref)} />
          </div>
        </div>
      </div>
      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        <div onClick={(e) => e.stopPropagation()}>
          <WriteEditModal
            reviewType={postData ? 'customReviewEdit' : 'customReview'}
            editCustomData={postData}
            keyboardInfo={custom}
            onSuccessReview={handleClickEditModalButton}
          />
        </div>
      </Modal>
      <div onClick={(e) => e.stopPropagation()}>
        <Dialog
          type='confirm'
          message='수정하시겠습니까'
          isOpen={isEditAlertOpen}
          iconType='warn'
          buttonText={{ left: '댣기', right: '확인' }}
          onClick={{
            left: () => handleCloseEditAlert(),
            right: () => handleClickEditAlertButton(),
          }}
        />
        <Dialog
          type='confirm'
          message='삭제하시겠습니까'
          isOpen={isDeleteAlertOpen}
          iconType='warn'
          buttonText={{ left: '닫기', right: '확인' }}
          onClick={{
            left: () => handleCloseDeleteAlert(),
            right: () => handleClickDeleteAlertButon(),
          }}
        />
      </div>
    </div>
  );
}
