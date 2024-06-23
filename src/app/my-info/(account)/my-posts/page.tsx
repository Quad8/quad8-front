import Pagination from '@/components/Pagination/Pagination';
import { getMyPosts } from '@/api/communityAPI';
import classNames from 'classnames/bind';
import MyPostCardList from './_components/MyPostCardList';
import { MyInfoEmptyCase } from '../../_components';

import styles from './page.module.scss';

const cn = classNames.bind(styles);

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
      {content.length > 0 ? (
        <div>
          <header className={cn('title')}>내 게시글</header>
          <MyPostCardList searchParams={searchParams} initialData={content} />
          <Pagination {...rest} searchParams={searchParams} />
        </div>
      ) : (
        <MyInfoEmptyCase message='내 게시글이 없습니다.' />
      )}
    </div>
  );
}
