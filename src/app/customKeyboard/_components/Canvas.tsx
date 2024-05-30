import classNames from 'classnames/bind';
import styles from './Canvas.module.scss';

const cn = classNames.bind(styles);

export default function Canvas() {
  console.log('render');
  return <div className={cn('wrapper')}>test</div>;
}
