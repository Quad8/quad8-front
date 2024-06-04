import classNames from 'classnames/bind';
import styles from './SuffixUnit.module.scss';

const cn = classNames.bind(styles);

interface SuffixUnitProps {
  unit: '원';
}

export default function SuffixUnit({ unit }: SuffixUnitProps) {
  return <span className={cn('suffix-unit')}>{unit}</span>;
}
