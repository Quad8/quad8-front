import classNames from 'classnames/bind';
import styles from './BoardOption.module.scss';

const cn = classNames.bind(styles);

export default function BoardOption() {
  return <div className={cn('wrapper')}>board</div>;
}
