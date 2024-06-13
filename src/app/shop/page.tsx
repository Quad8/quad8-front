import { getProductList } from '@/api/getProductList';
import { Dropdown } from '@/components';
import Pagination from '@/components/Pagination/Pagination';
import classNames from 'classnames/bind';
import { Suspense } from 'react';
import CategoryMenu from './_components/CategoryMenu';
import CategoryTitle from './_components/CategoryTitle';
import ProductList from './_components/ProductList';
import styles from './page.module.scss';

const cn = classNames.bind(styles);

const option = ['인기순', '조회순', '최신순', '가격 낮은순', '가격 높은순'];

export default async function ShopAllPage() {
  const { data } = await getProductList('all', 'createdAt_desc', 0, 16);
  const { content } = data;
  return (
    <>
      <div className={cn('title-wrap')}>
        <CategoryTitle totalCount={data.totalElements}>전체상품</CategoryTitle>
        <Dropdown sizeVariant='xs' options={option} />
      </div>
      <CategoryMenu />
      <ProductList content={content} size='lg' />
      <Suspense>
        <Pagination count={data.totalElements} limit={data.size} />
      </Suspense>
    </>
  );
}
