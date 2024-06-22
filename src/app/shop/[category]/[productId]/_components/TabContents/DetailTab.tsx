'use client';

import { ProductReviewType } from '@/types/ProductReviewTypes';
import classNames from 'classnames/bind';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import DetailImage from './DetailImage';
import styles from './DetailTab.module.scss';
import ReturnExchangeInfo from './ReturnExchangeInfo';
import ProductReviewList from './Review/ProductReviewList';

const cn = classNames.bind(styles);

interface TabData {
  id: number;
  button: string;
  content: JSX.Element;
  ref: RefObject<HTMLDivElement>;
}
interface DetailTabProps {
  detailsImg: string;
  reviewData: ProductReviewType;
}

export default function DetailTab({ detailsImg, reviewData }: DetailTabProps) {
  const [tabRefs] = useState([
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ]);

  const tabData: TabData[] = [
    { id: 0, button: '상품 상세 정보', content: <DetailImage detailsImg={detailsImg} />, ref: tabRefs[0] },
    { id: 1, button: '교환 및 반품 안내', content: <ReturnExchangeInfo />, ref: tabRefs[1] },
    { id: 2, button: '리뷰', content: <ProductReviewList data={reviewData} />, ref: tabRefs[2] },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = useCallback((id: number, ref: RefObject<HTMLDivElement>) => {
    setActiveTab(id);
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 140,
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      tabRefs.forEach((tabRef, index) => {
        if (tabRef.current) {
          const { offsetTop } = tabRef.current;
          const offsetBottom = offsetTop + tabRef.current.clientHeight;
          if (scrollPosition >= offsetTop - 250 && scrollPosition < offsetBottom) {
            setActiveTab(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tabRefs]);

  return (
    <div className={cn('tab-container')}>
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
