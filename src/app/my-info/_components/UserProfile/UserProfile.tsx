'use client';

import { Modal } from '@/components';
import defaultIamge from '@/public/images/defaultProfile.png';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useState } from 'react';
import EditProfileModal from './EditProfileModal/EditProfileModal';
import styles from './UserProfile.module.scss';

const cn = classNames.bind(styles);

export default function UserProfile() {
  const [isImageError, setIsImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { data: userData } = useQuery({ queryKey: ['UserData'] });
  // const { userImage, name, email } = userData;

  const handleEditProfileButton = () => {
    setIsModalOpen(true);
  };

  return (
    <article className={cn('user')}>
      <div className={cn('user-profile')}>
        <div className={cn('user-image')}>
          <Image
            src={isImageError ? defaultIamge : defaultIamge}
            alt='user-iamge'
            width={53}
            onError={() => {
              setIsImageError(true);
            }}
          />
        </div>
        <div className={cn('user-info')}>
          <h1 className={cn('user-name')}>고양고양고양이 님</h1>
          <p className={cn('user-email')}>email@email.com</p>
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
