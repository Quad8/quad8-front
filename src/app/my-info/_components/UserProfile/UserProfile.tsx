'use client';

import { Modal } from '@/components';
import type { Users } from '@/types/profileType';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useState } from 'react';
import EditProfileModal from './EditProfileModal/EditProfileModal';
import styles from './UserProfile.module.scss';

const cn = classNames.bind(styles);

export default function UserProfile() {
  // const [isImageError, setIsImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userData } = useQuery<{ data: Users }>({ queryKey: ['userData'] });

  const users = userData?.data ?? { nickname: '', email: '' };

  const handleEditProfileButton = () => {
    setIsModalOpen(true);
  };

  return (
    <article className={cn('user')}>
      <div className={cn('user-profile')}>
        <div className={cn('user-image')}>
          {/* <Image
            src={isImageError ? defaultIamge.src : imgUrl}
            alt='user-iamge'
            width={53}
            height={53}
            onError={() => {
              setIsImageError(true);
            }}
          /> */}
        </div>
        <div className={cn('user-info')}>
          <h1 className={cn('user-name')}>{users.nickname} 님</h1>
          <p className={cn('user-email')}>{users.email}</p>
        </div>
      </div>
      <button className={cn('user-edit-button')} type='button' onClick={handleEditProfileButton}>
        회원정보 변경
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <EditProfileModal />
      </Modal>
    </article>
  );
}
