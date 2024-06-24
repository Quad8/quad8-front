import { getAllProductList } from '@/api/productAPI';
import Pagination from '@/components/Pagination/Pagination';
import type { ProductParams } from '@/types/ProductItem';
import classNames from 'classnames/bind';
import CategoryMenu from './_components/Category/CategoryMenu';
import CategoryTitle from './_components/Category/CategoryTitle';
import ProductList from './_components/Product/ProductList';
import Sort from './_components/Sort/Sort';
import styles from './page.module.scss';

const cn = classNames.bind(styles);

interface ShopAllPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ShopAllPage({ searchParams }: ShopAllPageProps) {
  const sortParam = Array.isArray(searchParams.sort) ? searchParams.sort[0] : searchParams.sort || 'createdAt_desc';
  const pageParam = Array.isArray(searchParams.page) ? searchParams.page[0] : searchParams.page || '0';

  const getAllProductParams: ProductParams = {
    sort: sortParam as string,
    page: pageParam as string,
    size: '16',
  };

  const { data } = await getAllProductList(getAllProductParams);
  const { content, ...rest } = data;
  return (
    <>
      <div className={cn('title-wrap')}>
        <CategoryTitle totalCount={rest.totalElements}>전체상품</CategoryTitle>
        <Sort />
      </div>
      <CategoryMenu />
      <section className={cn('list-section')}>
        <ProductList content={content} size='lg' />
        <Pagination {...rest} searchParams={searchParams} />
      </section>
    </>
  );
}
