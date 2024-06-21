import { getCategoryProductList } from '@/api/productAPI';
import Pagination from '@/components/Pagination/Pagination';
import type { CategoryKey } from '@/types/Category';
import classNames from 'classnames/bind';
import ProductList from '../_components/Product/ProductList';
import TitleWrap from './_components/TitleWrap/TitleWrap';
import styles from './page.module.scss';

const cn = classNames.bind(styles);

export default async function Page({
  params,
  searchParams,
}: {
  params: { category: CategoryKey };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { category } = params;

  const getCategoryProductParams = {
    keyword: category,
    sort: searchParams.sort || 'createdAt_desc',
    page: searchParams.page || '0',
    size: '16',
    company: searchParams.company,
    switchType: searchParams.switchType,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
  };

  const { data } = await getCategoryProductList(getCategoryProductParams);
  const { content, ...rest } = data;

  return (
    <div className={cn('inner')}>
      <TitleWrap category={category} totalCount={rest.totalElements} />
      <section className={cn('list-section')}>
        <ProductList content={content} size='lg' hasShop />
        <Pagination {...rest} searchParams={searchParams} />
      </section>
    </div>
  );
}
