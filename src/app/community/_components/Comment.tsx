import classNames from 'classnames/bind';

import ProfileImage from '@/components/ProfileImage/ProfileImage';
import { calculateTimeDifference } from '@/libs/calculateDate';

import styles from './Comment.module.scss';

const cn = classNames.bind(styles);

interface CommentProps {
  nickname: string;
  profile?: string;
  createdTime: string;
  comment: string;
}

export default function Comment({ nickname, profile, createdTime, comment }: CommentProps) {
  const createdTimeToDate = new Date(createdTime);
  const timeAgo = calculateTimeDifference(createdTimeToDate);
  return (
    <div className={cn('container')}>
      <ProfileImage profileImage={profile || null} />
      <div className={cn('content-wrapper')}>
        <div className={cn('user-info')}>
          <p className={cn('nickname')}>{nickname}</p>
          <p className={cn('time-ago')}>{timeAgo}</p>
        </div>
        <div className={cn('content')}>{comment}</div>
      </div>
    </div>
  );
}
