import classNames from 'classnames/bind';

import { getAllCommunityPost } from '@/api/communityAPI';
import Pagination from '@/components/Pagination/Pagination';
import type { CommunityParamsType } from '@/types/CommunityTypes';
import PostCardList from './_components/PostCardList';

import styles from './page.module.scss';

const cn = classNames.bind(styles);

interface CommunityPageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function CommunityPage({ searchParams }: CommunityPageProps) {
  const initialParams: CommunityParamsType = {
    sort: searchParams.sort || 'new',
    page: searchParams.page || '0',
    size: searchParams.size || '10',
  };

  const data = await getAllCommunityPost(initialParams);

  const { content, ...rest } = data;

  return (
    <div className={cn('container')}>
      <p className={cn('page-name')}>커뮤니티</p>
      <PostCardList searchParams={searchParams} initialData={content} />
      <Pagination {...rest} searchParams={searchParams} />
    </div>
  );
}
