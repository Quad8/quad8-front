import classNames from 'classnames/bind';

import myProfileImage from '@/public/images/myProfile.jpeg';
import ShowMoreIcon from '@/public/svgs/verticalTripleDot.svg';

import ProfileImage from '@/components/ProfileImage/ProfileImage';

import styles from './AuthorCard.module.scss';

const cn = classNames.bind(styles);

interface AuthorCardProps {
  nickname: string;
  dateText: string;
}

export default function AuthorCard({ nickname, dateText }: AuthorCardProps) {
  return (
    <div className={cn('container')}>
      <ProfileImage profileImage={myProfileImage} />
      <div className={cn('info-textbox')}>
        <p className={cn('user-name')}>{nickname}</p>
        <p className={cn('sub-info')}>{dateText}</p>
      </div>
      <div className={cn('show-more-icon')}>
        <ShowMoreIcon />
      </div>
    </div>
  );
}
