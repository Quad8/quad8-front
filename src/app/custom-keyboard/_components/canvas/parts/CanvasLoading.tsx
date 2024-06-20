import classNames from 'classnames/bind';

import { CanvasLoadingIcon } from '@/public/index';
import styles from './CanvasLoading.module.scss';

const cn = classNames.bind(styles);

export default function CanvasLoading() {
  return (
    <div className={cn('wrapper')}>
      <CanvasLoadingIcon width={25} height={25} className={cn('loading')} />
    </div>
  );
}
