import classNames from 'classnames/bind';
import myProfileImage from '@/public/images/myProfile.jpeg';
import ShowMoreIcon from '@/public/svgs/showMore.svg';
import styles from './AuthorCard.module.scss';
import ProfileImage from './ProfileImage';

const cn = classNames.bind(styles);

export default function AuthorCard() {
  return (
    <div className={cn('container')}>
      <ProfileImage profile={myProfileImage} />
      <div className={cn('info-textbox')}>
        <p id={cn('user-name')}>고양이는고양닉네임</p>
        <p id={cn('sub-info')}>1분전</p>
      </div>
      <div className={cn('show-more-icon')}>
        <ShowMoreIcon />
      </div>
    </div>
  );
}
