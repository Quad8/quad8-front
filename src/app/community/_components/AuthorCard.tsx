import classNames from 'classnames/bind';
import { MouseEvent, useRef, useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { VerticalTripleDotIcon } from '@/public/index';
import ProfileImage from '@/components/ProfileImage/ProfileImage';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { deletePost } from '@/api/communityAPI';

import styles from './AuthorCard.module.scss';

const cn = classNames.bind(styles);

interface AuthorCardProps {
  id?: number;
  isMine?: boolean;
  nickname: string;
  dateText: string;
  userImage: string | null;
}

export default function AuthorCard({ id, isMine, nickname, dateText, userImage }: AuthorCardProps) {
  const popOverRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const { mutate: deletePostMutation } = useMutation({
    mutationFn: deletePost,
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

  const handleClickPopup = (e: MouseEvent<SVGElement>) => {
    e.stopPropagation();
    setIsPopupOpen(!isPopupOpen);
  };

  const handleClosePopOver = () => {
    setIsPopupOpen(false);
  };

  const handleClickEdit = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  const handleClickDelete = (e: MouseEvent<HTMLDivElement>) => {
    if (id) {
      deletePostMutation(id);
    } else {
      toast.error('해당 게시글이 존재하지 않습니다. 다시 확인해주세요.');
    }
    e.stopPropagation();
  };
  const handleClickReport = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  useOutsideClick(popOverRef, handleClosePopOver);

  return (
    <div className={cn('container')}>
      <ProfileImage profileImage={userImage} />
      <div className={cn('info-textbox')}>
        <p className={cn('user-name')}>{nickname}</p>
        <p className={cn('sub-info')}>{dateText}</p>
      </div>
      <div className={cn('show-more-icon')}>
        <VerticalTripleDotIcon onClick={(e) => handleClickPopup(e)} />
        {isPopupOpen && (
          <div className={cn('pop-over-container')} ref={popOverRef}>
            {isMine && (
              <div>
                <div className={cn('option')} onClick={(e) => handleClickDelete(e)}>
                  삭제하기
                </div>
                <div className={cn('option')} onClick={(e) => handleClickEdit(e)}>
                  수정하기
                </div>
              </div>
            )}
            <div className={cn('option')} onClick={(e) => handleClickReport(e)}>
              신고하기
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
