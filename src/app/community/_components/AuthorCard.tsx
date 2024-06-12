import classNames from 'classnames/bind';
import myProfileImage from '@/public/images/myProfile.jpeg';
import ShowMoreIcon from '@/public/svgs/showMore.svg';

import ProfileImage from '../../../components/ProfileImage/ProfileImage';

import styles from './AuthorCard.module.scss';

const cn = classNames.bind(styles);

interface AuthorCardProps {
  nickname: string;
  timeAgo: string;
}

export default function AuthorCard({ nickname, timeAgo }: AuthorCardProps) {
  return (
    <div className={cn('container')}>
      <ProfileImage profileImage={myProfileImage} />
      <div className={cn('info-textbox')}>
        <p id={cn('user-name')}>{nickname}</p>
        <p id={cn('sub-info')}>{timeAgo}</p>
      </div>
      <div className={cn('show-more-icon')}>
        <ShowMoreIcon />
      </div>
    </div>
  );
}
