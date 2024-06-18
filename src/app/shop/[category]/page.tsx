import { getCategoryProductList } from '@/api/getProductList';
import Pagination from '@/components/Pagination/Pagination';
import { CategoryKey } from '@/types/Category';
import classNames from 'classnames/bind';
import ProductList from '../_components/Product/ProductList';
import TitleWrap from './_components/TitleWrap';
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
    sort: searchParams.sort || 'views_desc',
    page: searchParams.page || '0',
    size: '16',
    company: searchParams.company,
    switchType: searchParams.switchType,
    minPrice: searchParams.minPrice || '0',
    maxPrice: searchParams.maxPrice || '0',
  };

  const { data } = await getCategoryProductList(getCategoryProductParams);
  const { content, ...rest } = data;
  console.log(data);

  return (
    <>
      <TitleWrap category={category} />
      <section className={cn('list-section')}>
        <ProductList content={content} size='lg' />
        <Pagination {...rest} searchParams={searchParams} />
      </section>
    </>
  );
}
