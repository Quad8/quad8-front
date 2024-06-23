'use client';

import CategoryTitle from '@/app/shop/_components/Category/CategoryTitle';
import { CATEGORY_MAP } from '@/constants/product';
import type { CategoryKey } from '@/types/Category';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Filter from './Filter';
import FilterSort from './FilterSort';
import styles from './TitleWrap.module.scss';

const cn = classNames.bind(styles);

interface TitleWrapProp {
  category: CategoryKey;
  totalCount: number;
}
export default function TitleWrap({ category, totalCount }: TitleWrapProp) {
  const [isOpen, setIsOpen] = useState(true);
  const handleClickFilter = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className={cn('title-wrap')}>
        <CategoryTitle totalCount={totalCount}>{CATEGORY_MAP[category]}</CategoryTitle>
        <FilterSort onClick={handleClickFilter} />
      </div>
      {isOpen && <Filter category={category} />}
    </>
  );
}
