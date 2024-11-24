import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'react-toastify';

import { deletePostCard, getCommentsInfiniteScroll, getPostDetail, postComment } from '@/api/communityAPI';
import { IMAGE_BLUR } from '@/constants/blurImage';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { addEnterKeyEvent } from '@/utils/addEnterKeyEvent';
import { communityPopOverOption } from '@/utils/communityPopOverOption';
import { keydeukImg, SpinLoading } from '@/public/index';
import type { UserDataResponseType } from '@/types/userType';
import type { CommentType } from '@/types/communityType';

import { Button, CustomOption, InputField, Modal, ModalSkeleton } from '@/components';
import Dialog from '@/components/Dialog/Dialog';
import ImageZoom from '@/components/ImageZoom/ImageZoom';
import WriteEditModal from '@/components/WriteEditModal/WriteEditModal';
import { formatDateToKSTString } from '@/utils/formatDateToKSTString';
import AuthorCard from '../AuthorCard';
import Comment from '../Comment';
import { PostInteractions } from '../PostInteractions';
import ErrorFallbackDetailModal from './ErrorFallbackDetailModal';

import styles from './PostCardDetailModal.module.scss';

const cn = classNames.bind(styles);

interface PostCardDetailModalProps {
  cardId: number;
  onClose: () => void;
  isMine?: boolean;
  commentCount?: number;
}

export default function PostCardDetailModal({ cardId, onClose, isMine, commentCount }: PostCardDetailModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastCommentRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const [commentRef, setCommentRef] = useState<HTMLInputElement | null>(null);
  const [clickedImage, setClickedImage] = useState('');
  const [isEditAlertOpen, setIsEditAlertOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [clickedPopOverCommentId, setClickedPopOverCommentId] = useState(0);

  const [lastCommentId, setLastCommentId] = useState(0);
  const [visibleComments, setVisibleComments] = useState<CommentType[]>([]);

  const handleOpenAuthorPopOver = () => {
    setIsPopupOpen((prevIsOpen) => !prevIsOpen);
    setClickedPopOverCommentId(0);
  };

  const handleClosePopOver = () => {
    setIsPopupOpen(false);
  };

  const handleOpenCommentPopOver = (commentId: number) => {
    setClickedPopOverCommentId(commentId);
    setIsPopupOpen(false);
  };

  const handleCloseCommentPopOver = () => {
    setClickedPopOverCommentId(0);
  };

  const handleOpenCommentProfileCard = () => {
    setClickedPopOverCommentId(0);
    setIsPopupOpen(false);
  };

  const userData = queryClient.getQueryData<UserDataResponseType>(['userData']);

  const { data: postCardListData, refetch } = useQuery({
    queryKey: ['postData', cardId],
    queryFn: () => getPostDetail(cardId),
  });

  const {
    data: infiniteCommentData,
    refetch: infiniteCommentRefetch,
    isFetching: isCommentLoading,
  } = useQuery({
    queryKey: ['infiniteCommentData'],
    queryFn: () => getCommentsInfiniteScroll({ communityId: cardId, commentId: lastCommentId }),
    enabled: false,
    initialData: null,
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
    onSuccess: (updatedData) => {
      toast.success('게시글이 삭제되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['myCustomReview'],
      });
      queryClient.invalidateQueries({ queryKey: ['postCardsList'] });
      queryClient.setQueryData(['myCustomReview'], updatedData);
    },
    onError: () => {
      toast.error('게시글 삭제 중 오류가 발생하였습니다.');
    },
  });

  useEffect(() => {
    const handleSubmitComment = () => {
      if (!userData) {
        return toast.error('로그인이 필요합니다.');
      }
      if (commentRef) {
        const commentContent = commentRef.value;
        postCommentMutation({ id: cardId, content: commentContent });
      }
      return null;
    };
    const removeEvent = addEnterKeyEvent({ element: { current: commentRef }, callback: handleSubmitComment });
    return () => {
      removeEvent();
    };
  }, [cardId, postCommentMutation, commentRef, userData]);

  const isLastCommentIntersecting = useIntersectionObserver(lastCommentRef, { threshold: 1 });

  useEffect(() => {
    if (lastCommentRef.current && isLastCommentIntersecting) {
      const restComments = infiniteCommentData?.data;

      if (!restComments || restComments.length !== 0) {
        infiniteCommentRefetch();
      }
    }
  }, [isLastCommentIntersecting, infiniteCommentData, infiniteCommentRefetch]);

  useEffect(() => {
    const restComments = infiniteCommentData?.data;
    const haveRestComments =
      restComments &&
      visibleComments[visibleComments.length - 1]?.id !== restComments[restComments.length - 1]?.id &&
      restComments.length !== 0;

    if (haveRestComments) {
      setVisibleComments((prev) => [...prev, ...restComments]);
      setLastCommentId(restComments[restComments.length - 1].id);
    }
  }, [infiniteCommentRefetch, infiniteCommentData?.data, visibleComments]);

  useEffect(() => {
    // 처음에 가져온 댓글 데이터
    queryClient.setQueryData(['infiniteCommentData'], null);
    if (postCardListData?.data) {
      const initialComments = postCardListData.data.comments;
      const lastCommentData = initialComments[initialComments.length - 1];
      setVisibleComments(initialComments);
      setLastCommentId(lastCommentData?.id);
    }
  }, [postCardListData, queryClient]);

  if (!postCardListData) return <ModalSkeleton />;

  const { data: postData, status, message } = postCardListData;

  if (status === 'ERROR') {
    toast.error(message);
    onClose();
    return null;
  }

  const {
    content,
    likeCount,
    commentCount: postCommentCount,
    nickName,
    reviewImages,
    title,
    updatedAt,
    userId,
    userImage,
    custom,
    isLiked,
  } = postData;

  const createdDateString = formatDateToKSTString(updatedAt);

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
    setIsEditModalOpen(true);
    queryClient.invalidateQueries({
      queryKey: ['myCustomReview'],
    });
    queryClient.invalidateQueries({
      queryKey: ['postData', cardId],
    });
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const setCommentRefType = (commentId: number) => {
    if (commentId === lastCommentId) {
      return lastCommentRef;
    }

    return null;
  };

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackDetailModal}>
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
            <div className={cn('selected-image-wrapper')}>
              <ImageZoom
                image={clickedImage || (reviewImages.length > 0 ? reviewImages[0].imgUrl : keydeukImg)}
                alt='키보드 이미지'
                width={493}
                height={reviewImages.length > 1 ? 536 : 604}
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
              <AuthorCard
                nickname={nickName}
                userId={userId}
                dateText={createdDateString}
                userImage={userImage}
                onClickPopOver={handleOpenAuthorPopOver}
                onClosePopOver={handleClosePopOver}
                isOpenPopOver={isPopupOpen}
                popOverOptions={communityPopOverOption({
                  isMine,
                  onClickDelete: handleClickDeleteAlertButon,
                  onClickEdit: handleClickEditAlertButton,
                })}
              />
              <CustomOption wrapperRef={containerRef} customData={custom} />
              <p className={cn('content')}>{content}</p>
              <div className={cn('post-iteractions-wrapper')}>
                <PostInteractions
                  likeCount={likeCount}
                  commentCount={typeof commentCount === 'number' ? commentCount : postCommentCount}
                  cardId={cardId}
                  isLiked={isLiked}
                />
              </div>
              <div className={cn('comment-wrapper')}>
                {visibleComments.map((comment) => (
                  <Comment
                    key={comment.id}
                    cardId={cardId}
                    commentData={comment}
                    ref={setCommentRefType(comment.id)}
                    onOpenPopOver={handleOpenCommentPopOver}
                    onClosePopOver={handleCloseCommentPopOver}
                    isOpenedPopOver={clickedPopOverCommentId === comment.id}
                    onOpenProfileCard={handleOpenCommentProfileCard}
                  />
                ))}
                <div className={cn('spin-loading')}> {isCommentLoading && <SpinLoading />} </div>
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
    </ErrorBoundary>
  );
}
