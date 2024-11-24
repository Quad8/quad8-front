import { getAllCommunityPost } from '@/api/communityAPI';
import Pagination from '@/components/Pagination/Pagination';
import type { CommunityParamsType, CommunityPostListResponse } from '@/types/communityType';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchQueryBonding } from '@/utils/fetchQueryBounding';
import { getQueryClient } from '@/libs/client';
import CommunityEmptyCase from './_components/CommunityEmptyCase';
import PostCardList from './_components/PostCardList';

interface CommunityPageProps {
  searchParams: { [key: string]: string };
}

export default async function CommunityPage({ searchParams }: CommunityPageProps) {
  const initialParams: CommunityParamsType = {
    sort: searchParams.sort || 'new',
    page: searchParams.page || '0',
    size: searchParams.size || '16',
  };

  const queryClient = getQueryClient();
  const posts = await fetchQueryBonding<CommunityPostListResponse | null>(queryClient, {
    queryKey: ['postCardsList'],
    queryFn: () => getAllCommunityPost(initialParams),
  });

  if (!posts) {
    return <CommunityEmptyCase />;
  }

  const { content, ...rest } = posts;

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostCardList searchParams={searchParams} />
        <Pagination {...rest} searchParams={searchParams} />
      </HydrationBoundary>
    </div>
  );
}
