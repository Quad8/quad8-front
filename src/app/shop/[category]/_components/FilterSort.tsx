import { Dropdown } from '@/components';
import { LIST_SORT_OPTIONS } from '@/constants/drodownOptions';
import classNames from 'classnames/bind';
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
      <Dropdown sizeVariant='xs' options={LIST_SORT_OPTIONS} />
    </div>
  );
}
