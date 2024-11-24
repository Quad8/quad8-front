'use client';

import classNames from 'classnames/bind';
import { forwardRef, useEffect, useState, useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

import { getOthersInfo } from '@/api/usersAPI';
import { SpinLoading, keydeukProfileImg } from '@/public/index';
import type { Users } from '@/types/userType';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';

import styles from './UserProfileCard.module.scss';

const cn = classNames.bind(styles);

interface UserProfileCardProps {
  isOpenProfileCard: boolean;
  userId: number;
  positionTop?: number;
}
export default forwardRef<HTMLDivElement, UserProfileCardProps>(function UserProfileCard(
  { isOpenProfileCard, userId, positionTop },
  ref,
) {
  const queryClient = useQueryClient();
  const savedUserInfo = queryClient.getQueryData<Users>(['clickedUserInfo']);

  const {
    data: rawUserInfo,
    isFetching,
    isPending,
  } = useQuery({
    queryKey: ['clickedUserInfo'],
    queryFn: () => getOthersInfo(userId),
  });

  const userInfo = useMemo(() => {
    return rawUserInfo;
  }, [rawUserInfo]);

  const [isAboveProfile, setIsAboveProfile] = useState(false);

  useEffect(() => {
    const VIEWPORT_HEIGHT = window.innerHeight;

    if (isOpenProfileCard && positionTop && positionTop > VIEWPORT_HEIGHT / 2) {
      setIsAboveProfile(true);
    }
  }, [isOpenProfileCard, positionTop, isAboveProfile]);

  useEffect(() => {
    if (isOpenProfileCard && !savedUserInfo && userId) {
      queryClient.invalidateQueries({ queryKey: ['clickedUserInfo'] });
    }

    if (isOpenProfileCard && savedUserInfo && savedUserInfo.id !== userId) {
      queryClient.invalidateQueries({ queryKey: ['clickedUserInfo'] });
    }
  }, [userId, isOpenProfileCard, queryClient, savedUserInfo]);

  const CONTAINER_CLASSNAME = cn(
    'user-detail-profile-card',
    { 'display-none': !isOpenProfileCard },
    { 'loading-div': isFetching || !userInfo },
    { 'above-profile': isAboveProfile },
  );

  if (isFetching || !userInfo || isPending || savedUserInfo?.id !== userId) {
    return (
      <div ref={ref} className={CONTAINER_CLASSNAME}>
        <SpinLoading />
      </div>
    );
  }

  const USER_INFO = [
    { label: '이메일', value: userInfo?.email },
    { label: '생년월일', value: userInfo?.birth },
    { label: '전화번호', value: `010-${formatPhoneNumber(userInfo?.phone)}` },
    { label: '성별', value: userInfo?.gender === 'MALE' ? '남' : '여' },
  ];

  return positionTop && positionTop === 0 ? null : (
    <div ref={ref} className={CONTAINER_CLASSNAME} onClick={(e) => e.stopPropagation()}>
      <div className={cn('profile-image')}>
        <Image src={userInfo?.imgUrl || keydeukProfileImg} alt='프로필 이미지' fill sizes='12rem' />
      </div>
      <div className={cn('info-wrapper')}>
        <p className={cn('nickname')}>{userInfo?.nickname || '사용자를 찾을 수 없습니다.'}</p>
        <ul>
          {USER_INFO.map((item) => (
            <li key={item.label} className={cn('info-list')}>
              <strong>{item.label}:</strong> {item.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
