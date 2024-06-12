import classNames from 'classnames/bind';
import PostCard from './_components/PostCard';
import styles from './page.module.scss';
import { COMMUNITY_DATA } from '../mj/communityData';

const cn = classNames.bind(styles);

export default function Page() {
  return (
    <div className={cn('container')}>
      <PostCard cardData={COMMUNITY_DATA} />
    </div>
  );
}
