'use client';

import { CATEGORY_MAP } from '@/constants/product';
import { CategoryKey } from '@/types/Category';
import classNames from 'classnames/bind';
import { useState } from 'react';
import CategoryTitle from '../../_components/Category/CategoryTitle';
import Filter from './Filter';
import FilterSort from './FilterSort';
import styles from './TitleWrap.module.scss';

const cn = classNames.bind(styles);

interface TitleWrapProp {
  category: CategoryKey;
}
export default function TitleWrap({ category }: TitleWrapProp) {
  const [isOpen, setIsOpen] = useState(true);
  const handleClickFilter = () => setIsOpen(!isOpen);
  return (
    <>
      <div className={cn('title-wrap')}>
        <CategoryTitle totalCount={14}>{CATEGORY_MAP[category]}</CategoryTitle>
        <FilterSort onClick={handleClickFilter} />
      </div>
      {isOpen && <Filter category={category} />}
    </>
  );
}
