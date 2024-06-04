import classNames from 'classnames/bind';
import ContentImage from '@/public/images/myProfile.jpeg';
import Image from 'next/image';
import { CommunityCardDataType } from '@/app/mj/CommunityData';
import styles from './PostCard.module.scss';
import AuthorCard from './AuthorCard';
import { PostInteractions } from './PostInteractions';

const cn = classNames.bind(styles);

interface PostCardProps {
  cardData: CommunityCardDataType;
}

export default function PostCard({ cardData }: PostCardProps) {
  const { title } = cardData;
  return (
    <div className={cn('container')}>
      <AuthorCard nickname={cardData.user_nickname} createdAt={cardData.created_at} />
      <Image src={ContentImage} className={cn('keyboard-image')} alt="키보드 이미지" />
      <p className={cn('title')}>{title}</p>
      <PostInteractions goodCount={cardData.good_count} commentCount={cardData.comment_count} />
    </div>
  );
}
