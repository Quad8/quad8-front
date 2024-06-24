'use client';

import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';

import { getAllCommunityPost } from '@/api/communityAPI';
import type {
  CommunityParamsType,
  CommunityPostCardDataType,
  CommunityPostCardDetailDataType,
} from '@/types/CommunityTypes';
import PostCard from './PostCard';
import WritePostButton from './WritePostButton';
import SortDropdown from './SortDropdown';

import styles from './PostCardList.module.scss';

const cn = classNames.bind(styles);

interface CommunityPageProps {
  searchParams: { [key: string]: string | undefined };
  initialData: CommunityPostCardDetailDataType;
}

export default function PostCardList({ searchParams, initialData }: CommunityPageProps) {
  const getAllCommunityParams: CommunityParamsType = {
    sort: searchParams.sort || 'new',
    page: searchParams.page || '0',
    size: searchParams.size || '16',
  };

  const { data: communityData, isLoading } = useQuery({
    queryKey: ['postCardsList', searchParams],
    queryFn: () => getAllCommunityPost(getAllCommunityParams),
  });

  const content = isLoading || !communityData ? initialData : communityData.content;

  return (
    <div className={cn('container')}>
      <div className={cn('filter-write-button-wrapper')}>
        <SortDropdown />
        <WritePostButton />
      </div>
      <div className={cn('post-wrapper')}>
        {content.map((cardData: CommunityPostCardDataType) => (
          <PostCard key={cardData.id} cardData={cardData} />
        ))}
      </div>
    </div>
  );
}
