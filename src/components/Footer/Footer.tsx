'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames/bind';

import { LogoIcon } from '@/public/index';
import { ROUTER } from '@/constants/route';
import HoverLinkIocn from './HoverLinkIcon';
import styles from './Footer.module.scss';

const cn = classNames.bind(styles);

const INTRODUCE_PAGE = [
  { name: '회사소개', href: ROUTER.MAIN },
  { name: '공지사항', href: ROUTER.MAIN },
  { name: '이용약관', href: ROUTER.MAIN },
  { name: '개인정보처리방침', href: ROUTER.MAIN },
];

export default function Footer() {
  const pathname = usePathname();
  const isRender = pathname !== ROUTER.CUSTOM_KEYBOARD;

  return (
    <div className={cn('wrapper', { none: !isRender })}>
      <LogoIcon width={131} height={24} className={cn('logo')} />
      <div className={cn('content-wrapper')}>
        <div className={cn('left-wrapper')}>
          <ul className={cn('introduce-wrapper')}>
            {INTRODUCE_PAGE.map((element) => (
              <Link key={element.name} href={element.href}>
                <li className={cn('introduce-text')}>{element.name}</li>
              </Link>
            ))}
          </ul>
          <div className={cn('brand-wrapper')}>
            <div className={cn('corporation-wrapper')}>
              <p className={cn('corporation-text')}>COMPANY : (주)키득</p>
              <div className={cn('corporation-kanban')} />
              <p className={cn('corporation-text')}>OWNER : Quad8</p>
              <div className={cn('corporation-kanban')} />
              <p className={cn('corporation-text')}>사업자등록번호 : 202-40-62600</p>
            </div>
            <p className={cn('copyright-text')}>copyright &copy; 2024 by KEYDEUK. all rights reserved.</p>
          </div>
        </div>
        <div className={cn('right-wrapper')}>
          <div className={cn('cs-wrapper')}>
            <div className={cn('telephone-text')}>고객센터 1588-1234</div>
            <div className={cn('operation-wrapper')}>
              <p>평일 09:00 ~ 18:00 (토 ∙ 일 공휴일 휴무)</p>
              <p>점심시간 12:00 ~ 13:00</p>
            </div>
          </div>
          <div className={cn('icon-wrapper')}>
            <HoverLinkIocn color='black' href={ROUTER.GITHUB.FRONT} ballonText='Front-end' />
            <HoverLinkIocn color='white' href={ROUTER.GITHUB.BACK} ballonText='Back-end' />
          </div>
        </div>
      </div>
    </div>
  );
}
