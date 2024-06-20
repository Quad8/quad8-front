'use client';

import { getKeydeukPick } from '@/api/productAPI';
import ProductItem from '@/components/Products/ProductItem';
import { tabKeyword } from '@/constants/product';
import type { Product, TabType } from '@/types/ProductItem';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './KeydeukPick.module.scss';

const cn = classNames.bind(styles);

interface ProductListProps {
  initialData: Product[];
  size: 'lg';
}

export default function KeydeukPick({ initialData, size }: ProductListProps) {
  const [pick, setPick] = useState<TabType>('저소음');
  const [data, setData] = useState<Product[]>(initialData);
  const [loading, setLoading] = useState(false);

  const handleTabClick = async (tab: TabType) => {
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
                onClick={() => handleTabClick(key as TabType)}
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
