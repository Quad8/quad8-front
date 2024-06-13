'use client';

// import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import styles from './DetailTab.module.scss';

const cn = classNames.bind(styles);

export default function DetailTab() {
  interface TabData {
    id: number;
    button: string;
    content: string;
    ref: React.RefObject<HTMLDivElement>;
  }
  const tabRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  const tabData: TabData[] = [
    { id: 0, button: '상품 상세 정보', content: '상품 상품 상세 정보 content', ref: tabRefs[0] },
    { id: 1, button: '교환 및 반품 안내', content: '교환 및 반품 안내 content', ref: tabRefs[1] },
    { id: 2, button: '리뷰', content: '리뷰 content', ref: tabRefs[2] },
  ];
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (id: number, ref: React.RefObject<HTMLDivElement>) => {
    setActiveTab(id);
    if (ref.current)
      window.scrollTo({
        top: ref.current.offsetTop - 100,
        behavior: 'smooth',
      });
  };

  // const isNextIntersecting = useIntersectionObserver(tabRefs[activeTab + 1], { threshold: 0.5 });
  // const isBeforeIntersecting = useIntersectionObserver(tabRefs[activeTab - 1], { threshold: 0.5 });

  // useEffect(() => {
  //   if (isNextIntersecting) {
  //     setActiveTab(activeTab + 1);
  //   }
  //   if (isBeforeIntersecting && activeTab > 0) {
  //     setActiveTab(activeTab - 1);
  //   }
  // }, [isNextIntersecting, isBeforeIntersecting, activeTab]);

  return (
    <div className={cn('container')}>
      <div className={cn('tab-buttons')}>
        {tabData.map((tab) => (
          <button
            key={tab.id}
            type='button'
            className={cn('tab-button', { active: activeTab === tab.id })}
            onClick={() => handleTabClick(tab.id, tab.ref)}
          >
            {tab.button}
          </button>
        ))}
      </div>
      <div className={cn('content-container')}>
        {tabData.map((tab) => (
          <div key={tab.id} className={cn('tab-content')} ref={tab.ref}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}
