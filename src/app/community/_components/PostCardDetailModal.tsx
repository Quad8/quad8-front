import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { Button, InputField, Modal } from '@/components';
import Dialog from '@/components/Dialog/Dialog';
import { deletePostCard, getPostDetail, postComment } from '@/api/communityAPI';
import { addEnterKeyEvent } from '@/libs/addEnterKeyEvent';
import { formatDateToString } from '@/libs/formatDateToString';
import type { CommunityPostCardDetailDataType } from '@/types/CommunityTypes';
import { keydeukImg } from '@/public/index';
import WriteEditModal from '@/components/WriteEditModal/WriteEditModal';
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
  onClose: () => void;
  isMine?: boolean;
}

export default function PostCardDetailModal({ cardId, onClose, isMine }: PostCardDetailModalProps) {
  const queryClient = useQueryClient();
  const [commentRef, setCommentRef] = useState<HTMLInputElement | null>(null);
  const [clickedImage, setClickedImage] = useState('');

  const [isCheckEditAlertOpen, setIsCheckEditAlertOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCheckDeleteAlertOpen, setIsCheckDeleteAlertOpen] = useState(false);

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ['postData', cardId],
    queryFn: () => getPostDetail(cardId),
  });

  const handleSuccessSubmitComment = async () => {
    if (commentRef) {
      commentRef.value = '';
    }
    queryClient.invalidateQueries({ queryKey: ['postCardsList'] });
    await refetch();
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
      toast.success('리뷰를 삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['MyCustomReview'],
      });
    },
    onError: () => {
      toast.error('리뷰 삭제 중 오류가 발생하였습니다.');
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
    return <span>Loading...</span>;
  }

  if (isError) {
    toast.error('데이터를 불러오는데 실패하였습니다.');
    return <span>Error: {error.message}</span>;
  }

  const { data: postData, status, message } = data;

  if (status === 'FAIL') {
    toast.error(message);
    onClose();
    return null;
  }

  const { commentCount, comments, content, likeCount, nickName, reviewImages, title, updatedAt, userImage, custom } =
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

  const handleClickThumbnail = (i: number) => {
    setClickedImage(reviewImages[i].imgUrl);
  };

  const handleClickDeleteAlertButon = () => {
    deletePostMutation(cardId);
    setIsCheckDeleteAlertOpen(false);
  };

  const handleCloseDeleteAlert = () => {
    setIsCheckDeleteAlertOpen(false);
  };

  const handleClickEditAlertButton = () => {
    setIsEditModalOpen(true);
    setIsCheckEditAlertOpen(false);
  };

  const handleCloseEditAlert = () => {
    setIsCheckEditAlertOpen(false);
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
    <div className={cn('container')}>
      {isMine && (
        <div className={cn('edit-button-wrapper')}>
          <Button width={72} paddingVertical={8} onClick={() => setIsCheckEditAlertOpen(true)}>
            수정
          </Button>
          <Button width={72} paddingVertical={8} onClick={() => setIsCheckDeleteAlertOpen(true)}>
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
            />
          </div>
          {reviewImages.length > 1 && (
            <div className={cn('unselected-image-wrapper')}>
              {reviewImages.map((image: ReviewImageType, i: number) => (
                <div onClick={() => handleClickThumbnail(i)} key={image.id}>
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
                  cardId={cardId}
                  commentId={comment.id}
                  userId={comment.userId}
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
          isOpen={isCheckEditAlertOpen}
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
          isOpen={isCheckDeleteAlertOpen}
          iconType='warn'
          buttonText={{ left: '댣기', right: '확인' }}
          onClick={{
            left: () => handleCloseDeleteAlert(),
            right: () => handleClickDeleteAlertButon(),
          }}
        />
      </div>
    </div>
  );
}
