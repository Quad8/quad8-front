import Link from 'next/link';
import classNames from 'classnames/bind';

import { GitHubRectangleIcon } from '@/public/index';
import styles from './HoverLinkIcon.module.scss';

const cn = classNames.bind(styles);

interface HoverLinkIconProps {
  color: 'black' | 'white';
  href: string;
  ballonText: string;
}

export default function HoverLinkIocn({ color, href, ballonText }: HoverLinkIconProps) {
  return (
    <div className={cn('wrapper')}>
      <div className={cn('ballon')}>{ballonText}</div>
      <Link href={href} target='_blank'>
        <GitHubRectangleIcon width={22} height={22} className={cn('icon', { invert: color === 'white' })} />
      </Link>
    </div>
  );
}
