'use client';

import { getKeydeukPick } from '@/api/getProductList';
import ProductItem from '@/components/Products/ProductItem';
import { Product } from '@/types/ProductItem';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './KeydeukPick.module.scss';

const cn = classNames.bind(styles);

const tabKeyword = {
  저소음: '직장인을 위한 무소음 키보드',
  가성비: '가성비 키보드',
  청축: '타건감이 좋은 키보드',
};

interface ProductListProps {
  initialData: Product[];
  size: 'lg';
}

export default function KeydeukPick({ initialData, size }: ProductListProps) {
  const [pick, setPick] = useState<'저소음' | '가성비' | '청축'>('저소음');
  const [data, setData] = useState<Product[]>(initialData);
  const [loading, setLoading] = useState(false);

  const handleTabClick = async (tab: '저소음' | '가성비' | '청축') => {
    setPick(tab);
    setLoading(true);
    try {
      const { data: newData } = await getKeydeukPick(tab);
      setData(newData);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={cn('keydeuk-pick')}>
      <div className={cn('inner')}>
        <h1 className={cn('title')}>키득 PICK</h1>
        <nav className={cn('tab-nav')}>
          <ul>
            {Object.entries(tabKeyword).map(([key, value]) => (
              <li
                key={key}
                className={cn('tab', { active: pick === key })}
                onClick={() => handleTabClick(key as '저소음' | '가성비' | '청축')}
              >
                {value}
              </li>
            ))}
          </ul>
        </nav>
        {loading ? (
          <div className={cn('loading')}>Loading...</div>
        ) : (
          <ul className={cn('product-list')}>
            {data.map((product) => (
              <ProductItem key={product.id} size={size} {...product} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
