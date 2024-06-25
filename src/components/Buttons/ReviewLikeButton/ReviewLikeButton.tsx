'use client';

import { deleteReviewLikes, postReviewLikes } from '@/api/likesAPI';
import SignInModal from '@/components/SignInModal/SignInModal';
import { ThumbIcon } from '@/public/index';
import { Users } from '@/types/userType';
import { useMutation, useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './ReviewLikeButton.module.scss';

const cn = classNames.bind(styles);

interface ReviewLikeButtonProps {
  id: number;
  isLiked: boolean;
  likeCount: number;
}

interface ReviewLikeMutationProps {
  reviewId: number;
  reviewIsLiked: boolean;
}

export default function ReviewLikeButton({ id, isLiked, likeCount }: ReviewLikeButtonProps) {
  const [isChecked, setIsChecked] = useState(isLiked);
  const [newLikeCount, setNewLikeCount] = useState(likeCount);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  const { data: userData } = useQuery<{ data: Users }>({
    queryKey: ['userData'],
  });

  const { mutate: reviewLikeMutation } = useMutation({
    mutationFn: async ({ reviewId, reviewIsLiked }: ReviewLikeMutationProps) => {
      if (reviewIsLiked) {
        await deleteReviewLikes(reviewId);
      } else {
        await postReviewLikes(reviewId);
      }
    },
  });

  const handleClickButton = () => {
    if (!userData?.data) {
      setIsSignInModalOpen(true);
      return;
    }

    reviewLikeMutation(
      { reviewId: id, reviewIsLiked: isChecked },
      {
        onSuccess: () => {
          setIsChecked((prev) => !prev);
          setNewLikeCount((prev) => (isChecked ? prev - 1 : prev + 1));
        },
      },
    );
  };

  return (
    <>
      <button type='button' className={cn('like-circle', { 'red-circle': isChecked })} onClick={handleClickButton}>
        <ThumbIcon className={cn('thumb', isChecked && 'white-thumb')} />
        <span>{newLikeCount}</span>
      </button>

      <SignInModal isOpen={isSignInModalOpen} onClose={() => setIsSignInModalOpen(false)} />
    </>
  );
}
