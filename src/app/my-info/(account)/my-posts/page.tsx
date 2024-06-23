import Pagination from '@/components/Pagination/Pagination';
import { getMyPosts } from '@/api/communityAPI';
import MyPostCardList from './_components/MyPostCardList';

interface MyPostsPageProps {
  searchParams: { [key: string]: string | undefined };
}

interface MyPostsParamsType {
  sort: string;
  page?: string;
  size?: string;
}

export default async function MyPostsPage({ searchParams }: MyPostsPageProps) {
  const initialParams: MyPostsParamsType = {
    sort: searchParams.sort || 'new',
    page: searchParams.page || '0',
    size: searchParams.size || '12',
  };

  const data = await getMyPosts(initialParams);

  const { content, ...rest } = data;

  return (
    <div>
      <MyPostCardList searchParams={searchParams} initialData={content} />
      <Pagination {...rest} searchParams={searchParams} />;
    </div>
  );
}
