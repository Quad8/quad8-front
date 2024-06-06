import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import defaultImage from '@/public/images/default.png';
import styles from './Comment.module.scss';

const cn = classNames.bind(styles);

interface CommentProps {
  profile?: string;
}

export default function Comment({ profile }: CommentProps) {
  return (
    <div className={cn('container')}>
      <div className={cn('profile-image')}>
        <Image src={profile || defaultImage} alt='프로필 이미지' fill />
      </div>
      <div className={cn('content-wrapper')}>
        <div className={cn('user-info')}>
          <p id={cn('nickname')}>닉네임</p>
          <p id={cn('time-ago')}>1분전</p>
        </div>
        <div className={cn('content')}>댓글 내용이 들어가는곳</div>
      </div>
    </div>
  );
}
