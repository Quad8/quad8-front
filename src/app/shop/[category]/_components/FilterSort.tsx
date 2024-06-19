import classNames from 'classnames/bind';

import FilterButton from './FilterButton';
import styles from './FilterSort.module.scss';
import Sort from './Sort';

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
