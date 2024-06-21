import classNames from 'classnames/bind';

import { getAllCommunityPost } from '@/api/communityAPI';
import Pagination from '@/components/Pagination/Pagination';
import type { CommunityParamsType, CommunityPostCardDataType } from '@/types/CommunityTypes';
import { orderListData } from '../(test)/mj/communityData';
import PostCard from './_components/PostCard';
import WritePostButton from './_components/WritePostButton';
import SortDropdown from './_components/SortDropdown';

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
  // const orderListData = await getCustomOrderList();

  const { content, ...rest } = data;

  return (
    <div className={cn('container')}>
      <p className={cn('page-name')}>커뮤니티</p>
      <div className={cn('filter-write-button-wrapper')}>
        <SortDropdown />
        <WritePostButton orderListData={orderListData} />
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
