import classNames from 'classnames/bind';

import { VerticalTripleDotIcon } from '@/public/index';

import ProfileImage from '@/components/ProfileImage/ProfileImage';

import styles from './AuthorCard.module.scss';

const cn = classNames.bind(styles);

interface AuthorCardProps {
  nickname: string;
  dateText: string;
  userImage: string | null;
}

export default function AuthorCard({ nickname, dateText, userImage }: AuthorCardProps) {
  return (
    <div className={cn('container')}>
      <ProfileImage profileImage={userImage} />
      <div className={cn('info-textbox')}>
        <p className={cn('user-name')}>{nickname}</p>
        <p className={cn('sub-info')}>{dateText}</p>
      </div>
      <div className={cn('show-more-icon')}>
        <VerticalTripleDotIcon />
      </div>
    </div>
  );
}
