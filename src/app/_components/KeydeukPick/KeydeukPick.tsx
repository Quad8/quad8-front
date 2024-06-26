'use client';

import { getKeydeukPick } from '@/api/productAPI';
import ProductItem from '@/components/Products/ProductItem';
import { TAB_KEYWORD } from '@/constants/product';
import { QUERY_KEYS } from '@/constants/queryKey';
import type { TabType } from '@/types/ProductItem';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './KeydeukPick.module.scss';

const cn = classNames.bind(styles);

export default function KeydeukPick() {
  const [pick, setPick] = useState<TabType>('저소음');

  const { data, error } = useQuery({
    queryKey: QUERY_KEYS.PRODUCT.LIST(pick),
    queryFn: () => getKeydeukPick(pick),
  });

  const handleTabClick = (tab: TabType) => {
    setPick(tab);
  };

  if (error) {
    return null;
  }

  return (
    <section className={cn('keydeuk-pick')}>
      <div className={cn('inner')}>
        <h1 className={cn('title')}>키득 PICK</h1>
        <nav className={cn('tab-nav')}>
          <ul>
            {Object.entries(TAB_KEYWORD).map(([key, value]) => (
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

        <ul className={cn('product-list')}>
          {data?.map((product) => <ProductItem key={product.id} size='lg' {...product} hasShop={false} />)}
        </ul>
      </div>
    </section>
  );
}
