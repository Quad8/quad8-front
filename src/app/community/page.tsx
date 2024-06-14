import classNames from 'classnames/bind';
import PostCard from './_components/PostCard';
import WritePostButton from './_components/WritePostButton';
import styles from './page.module.scss';
import { COMMUNITY_DATA } from '../(test)/mj/communityData';

const cn = classNames.bind(styles);

export default function Page() {
  return (
    <div className={cn('container')}>
      <p className={cn('page-name')}>커뮤니티</p>
      <div className={cn('filter-write-button-wrapper')}>
        <div>최신글</div>
        <WritePostButton />
      </div>
      <div className={cn('post-wrapper')}>
        <PostCard cardData={COMMUNITY_DATA} />
        <PostCard cardData={COMMUNITY_DATA} />
        <PostCard cardData={COMMUNITY_DATA} />
        <PostCard cardData={COMMUNITY_DATA} />
        <PostCard cardData={COMMUNITY_DATA} />
        <PostCard cardData={COMMUNITY_DATA} />
        <PostCard cardData={COMMUNITY_DATA} />
        <PostCard cardData={COMMUNITY_DATA} />
        <PostCard cardData={COMMUNITY_DATA} />
        <PostCard cardData={COMMUNITY_DATA} />
        <PostCard cardData={COMMUNITY_DATA} />
        <PostCard cardData={COMMUNITY_DATA} />
        <PostCard cardData={COMMUNITY_DATA} />
        <PostCard cardData={COMMUNITY_DATA} />
      </div>
    </div>
  );
}
