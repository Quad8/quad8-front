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
  onClick: () => void;
}

export default function PostCard({ cardData, onClick }: PostCardProps) {
  const { title } = cardData;
  return (
    <button type='button' className={cn('container')} onClick={onClick}>
      <AuthorCard nickname={cardData.user_nickname} createdAt={cardData.created_at} />
      <Image src={ContentImage} className={cn('keyboard-image')} alt='키보드 이미지' />
      <p className={cn('title')}>{title}</p>
      <PostInteractions goodCount={cardData.good_count} commentCount={cardData.comment_count} />
    </button>
  );
}
