import classNames from 'classnames/bind';
import ContentImage from '@/public/images/myProfile.jpeg';
import Image from 'next/image';
import styles from './PostCard.module.scss';
import AuthorCard from './AuthorCard';
import { PostInteractions } from './PostInteractions';

const cn = classNames.bind(styles);

export default function PostCard() {
  return (
    <div className={cn('container')}>
      <AuthorCard />
      <Image src={ContentImage} className={cn('keyboard-image')} alt="키보드 이미지" />
      <p className={cn('title')}>제목이에오</p>
      <PostInteractions />
    </div>
  );
}
