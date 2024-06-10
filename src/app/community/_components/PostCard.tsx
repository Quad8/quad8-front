import classNames from 'classnames/bind';
import ContentImage from '@/public/images/myProfile.jpeg';
import Image from 'next/image';
import { CommunityCardDataType } from '@/app/mj/CommunityData';
import { calculateTimeDifference } from '@/libs/calculateDate';
import styles from './PostCard.module.scss';
import AuthorCard from './AuthorCard';
import { PostInteractions } from './PostInteractions';

const cn = classNames.bind(styles);

interface PostCardProps {
  cardData: CommunityCardDataType;
  onClick: () => void;
}

export default function PostCard({ cardData, onClick }: PostCardProps) {
  const {
    user_nickname: nickname,
    created_at: createdAt,
    title,
    image,
    good_count: goodCount,
    comment_count: commentCount,
  } = cardData;
  const nowDate = new Date();
  const createdDate = new Date(createdAt);

  const timeToString = calculateTimeDifference(createdDate, nowDate);

  return (
    <div className={cn('container')} onClick={onClick}>
      <AuthorCard nickname={nickname} timeAgoString={timeToString} />
      <div className={cn('keyboard-image-wrapper')}>
        <Image src={ContentImage} className={cn('keyboard-image')} alt='키보드 이미지' />
        {image.length > 1 && <p id={cn('image-count')}>{image.length}</p>}
      </div>
      <p className={cn('title')}>{title}</p>
      <PostInteractions goodCount={goodCount} commentCount={commentCount} />
    </div>
  );
}
