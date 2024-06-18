import { getAllProductList } from '@/api/getProductList';
import { Dropdown } from '@/components';
import Pagination from '@/components/Pagination/Pagination';
import { LIST_SORT_OPTIONS } from '@/constants/drodownOptions';
import { ProductParams } from '@/types/ProductItem';
import classNames from 'classnames/bind';
import CategoryMenu from './_components/Category/CategoryMenu';
import CategoryTitle from './_components/Category/CategoryTitle';
import ProductList from './_components/Product/ProductList';
import styles from './page.module.scss';

const cn = classNames.bind(styles);

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
  const { data } = await getAllProductList(getAllProductParams);
  const { content, ...rest } = data;
  return (
    <>
      <div className={cn('title-wrap')}>
        <CategoryTitle totalCount={rest.totalElements}>전체상품</CategoryTitle>
        <Dropdown sizeVariant='xs' options={LIST_SORT_OPTIONS} />
      </div>
      <CategoryMenu />
      <section className={cn('list-section')}>
        <ProductList content={content} size='lg' />
        <Pagination {...rest} searchParams={searchParams} />
      </section>
    </>
  );
}
