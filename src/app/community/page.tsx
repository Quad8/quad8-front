import classNames from 'classnames/bind';

import { Dropdown } from '@/components';
import PostCard from './_components/PostCard';
import WritePostButton from './_components/WritePostButton';

import { COMMUNITY_DATA } from '../(test)/mj/communityData';

import styles from './page.module.scss';

const cn = classNames.bind(styles);

export default function Page() {
  return (
    <div className={cn('container')}>
      <p className={cn('page-name')}>커뮤니티</p>
      <div className={cn('filter-write-button-wrapper')}>
        <Dropdown options={['인기순', '최신순', '조회순']} sizeVariant='xs' />
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
