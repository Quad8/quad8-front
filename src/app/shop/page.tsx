import { getProductList } from '@/api/getProductList';
import { Dropdown } from '@/components';
import Pagination from '@/components/Pagination/Pagination';
import { ProductParams } from '@/types/ProductItem';
import classNames from 'classnames/bind';
import CategoryMenu from './_components/CategoryMenu';
import CategoryTitle from './_components/CategoryTitle';
import ProductList from './_components/ProductList';
import styles from './page.module.scss';

const cn = classNames.bind(styles);

const option = ['인기순', '조회순', '최신순', '가격 낮은순', '가격 높은순'];

export default async function ShopAllPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const getAllProductParams: ProductParams = {
    sort: searchParams.sort,
    page: searchParams.page || '0',
    size: '16',
  };
  const { data } = await getProductList(getAllProductParams);
  const { content, ...rest } = data;
  return (
    <>
      <div className={cn('title-wrap')}>
        <CategoryTitle totalCount={rest.totalElements}>전체상품</CategoryTitle>
        <Dropdown sizeVariant='xs' options={option} />
      </div>
      <CategoryMenu />
      <section className={cn('list-section')}>
        <ProductList content={content} size='lg' />
        <Pagination {...rest} searchParams={searchParams} />
      </section>
    </>
  );
}
