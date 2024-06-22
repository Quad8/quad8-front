'use client';

import classNames from 'classnames/bind';

import { useQuery } from '@tanstack/react-query';
import { getMyPosts } from '@/api/communityAPI';
import PostCard from '@/app/community/_components/PostCard';
import { CommunityPostCardDataType, CommunityPostCardDetailDataType } from '@/types/CommunityTypes';
import styles from './MyPostCardList.module.scss';
import SortDropdown from './SortDropdown';

const cn = classNames.bind(styles);

interface MyPostCardListProps {
  searchParams: { [key: string]: string | undefined };
  initialData: CommunityPostCardDetailDataType;
}

interface ParamsType {
  sort: string;
  page?: string;
  size?: string;
}

export default function MyPostCardList({ searchParams, initialData }: MyPostCardListProps) {
  const getMyPostCardParams: ParamsType = {
    sort: searchParams.sort || 'new',
    page: searchParams.page || '0',
    size: searchParams.page || '10',
  };

  const {
    data: MyPostData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['MyCustomReview', searchParams],
    queryFn: () => getMyPosts(getMyPostCardParams),
  });

  const content = isLoading || !MyPostData ? initialData : MyPostData.content;

  if (isError) {
    <div>Error</div>;
  }

  return (
    <div className={cn('container')}>
      <div className={cn('filter-write-button-wrapper')}>
        <SortDropdown />
      </div>
      {content && (
        <div className={cn('post-wrapper')}>
          {content.map((cardData: CommunityPostCardDataType) => (
            <PostCard key={cardData.id} cardData={cardData} />
          ))}
        </div>
      )}
    </div>
  );
}
