import classNames from 'classnames/bind';
import myProfileImage from '@/public/images/myProfile.jpeg';
import ShowMoreIcon from '@/public/svgs/showMore.svg';
import styles from './AuthorCard.module.scss';
import ProfileImage from './ProfileImage';

const cn = classNames.bind(styles);

interface AuthorCardProps {
  nickname: string;
  createdTime: string;
}

export default function AuthorCard({ nickname, createdTime }: AuthorCardProps) {
  return (
    <div className={cn('container')}>
      <ProfileImage profile={myProfileImage} />
      <div className={cn('info-textbox')}>
        <p id={cn('user-name')}>{nickname}</p>
        <p id={cn('sub-info')}>{createdTime}</p>
      </div>
      <div className={cn('show-more-icon')}>
        <ShowMoreIcon />
      </div>
    </div>
  );
}
