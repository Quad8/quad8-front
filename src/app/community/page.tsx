import classNames from 'classnames/bind';

import { Dropdown } from '@/components';
import { getAllCommunityPost } from '@/api/communityAPI';
import Pagination from '@/components/Pagination/Pagination';
import type { CommunityParamsType, CommunityPostCardDataType } from '@/types/CommunityTypes';
import PostCard from './_components/PostCard';
import WritePostButton from './_components/WritePostButton';

import styles from './page.module.scss';

const cn = classNames.bind(styles);

interface CommunityPageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function CommunityPage({ searchParams }: CommunityPageProps) {
  const getAllCommunityParams: CommunityParamsType = {
    sort: searchParams.sort || 'new',
    page: searchParams.page || '0',
    size: searchParams.page || '10',
  };

  const data = await getAllCommunityPost(getAllCommunityParams);
  const { content, ...rest } = data;

  return (
    <div className={cn('container')}>
      <p className={cn('page-name')}>커뮤니티</p>
      <div className={cn('filter-write-button-wrapper')}>
        <Dropdown options={['인기순', '최신순', '조회순']} sizeVariant='xs' />
        <WritePostButton />
      </div>
      <div className={cn('post-wrapper')}>
        {content.map((cardData: CommunityPostCardDataType) => (
          <PostCard key={cardData.id} cardData={cardData} />
        ))}
      </div>
      <Pagination {...rest} searchParams={searchParams} />
    </div>
  );
}
