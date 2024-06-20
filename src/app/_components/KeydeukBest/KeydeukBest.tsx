'use client';

import { getKeydeukBest } from '@/api/productAPI';
import ProductItem from '@/components/Products/ProductItem';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import styles from './KeydeukBest.module.scss';

const cn = classNames.bind(styles);

export default function KeydeukBest() {
  const { data } = useQuery({
    queryKey: QUERY_KEYS.PRODUCT.LISTS(),
    queryFn: getKeydeukBest,
  });
  return (
    <section className={cn('keydeuk-best')}>
      <div className={cn('inner')}>
        <h1 className={cn('title')}>키득 BEST</h1>
        <ul className={cn('product-list')}>
          {data?.map((product) => <ProductItem key={product.id} size='lg' {...product} />)}
        </ul>
      </div>
    </section>
  );
}
