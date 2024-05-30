import classNames from 'classnames/bind';
import styles from './Option.module.scss';

const cn = classNames.bind(styles);

export default function Option() {
  return <div className={cn('wrapper')}>test</div>;
}
