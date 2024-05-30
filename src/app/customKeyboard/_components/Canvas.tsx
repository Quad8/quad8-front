import classNames from 'classnames/bind';
import styles from './Canvas.module.scss';

const cn = classNames.bind(styles);

export default function Canvas() {
  return <div className={cn('wrapper')}>test</div>;
}
