import classNames from 'classnames/bind';
import PostCard from './_components/PostCard';
import styles from './page.module.scss';

const cn = classNames.bind(styles);

export default function page() {
  return (
    <div className={cn('container')}>
      <PostCard />
    </div>
  );
}
