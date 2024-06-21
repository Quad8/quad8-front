import classNames from 'classnames/bind';

import Sort from '@/app/shop/_components/Sort/Sort';
import FilterButton from './FilterButton';
import styles from './FilterSort.module.scss';

const cn = classNames.bind(styles);

interface FilterSortProps {
  onClick: () => void;
}

export default function FilterSort({ onClick }: FilterSortProps) {
  return (
    <div className={cn('filter-sort')}>
      <FilterButton onClick={onClick} />
      <span className={cn('bar')} />
      <Sort />
    </div>
  );
}
