import FilterIcon from '@/public/svgs/filter.svg';
import classNames from 'classnames/bind';
import styles from './FilterButton.module.scss';

const cn = classNames.bind(styles);

interface FilterButtonProps {
  onClick: () => void;
}
export default function FilterButton({ onClick }: FilterButtonProps) {
  return (
    <button type='button' className={cn('filter')} onClick={onClick}>
      <div>필터</div>
      <FilterIcon />
    </button>
  );
}
