import classNames from 'classnames/bind';
import styles from './PostCard.module.scss';
import AuthorCard from './AuthorCard';

const cn = classNames.bind(styles);

export default function PostCard() {
  return (
    <div className={cn('container')}>
      <AuthorCard />
    </div>
  );
}
