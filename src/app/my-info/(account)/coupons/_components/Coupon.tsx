'use client';

import classNames from 'classnames/bind';
import { VerticalTripleDotIcon, ChevronIcon } from '@/public/index';
import { useState } from 'react';

import { formatDateFromYMD } from '@/utils/formatDateToString';
import { formatNumberToPrice } from '@/utils/formatNumberToPrice';
import type { CouponTypes } from '@/types/couponType';

import styles from './Coupon.module.scss';

const cn = classNames.bind(styles);

interface CouponProps {
  data: CouponTypes;
}

export default function Coupon({ data }: CouponProps) {
  const [isClickedTripleDot, setIsClickedTripleDot] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClickIcon = () => {
    setIsAnimating(true);
    setIsClickedTripleDot((prev) => !prev);

    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const { price, minPrice, name, isExpired, expiredAt } = data;
  const formattedPrice = formatNumberToPrice(price);
  const formattedMinPrice = formatNumberToPrice(minPrice);
  const formattedExpiredAt = formatDateFromYMD(new Date(expiredAt));

  return (
    <div className={cn('container', { 'slit-in-vertical': isAnimating }, { 'expired-overlay': isExpired })}>
      {!isClickedTripleDot ? (
        <>
          <div className={cn('info-wrapper')}>
            <h1 className={cn('discount-rate', { 'expired-price': isExpired })}>
              {formattedPrice}원 {isExpired && <span className={cn('expired-text')}>사용 완료</span>}
            </h1>
            <h3 className={cn('name')}>{name}</h3>
            <p className={cn('coupon-info')}>최소주문금액: {formattedMinPrice}원</p>
            <p className={cn('coupon-info')}>사용기간: {formattedExpiredAt}까지</p>
          </div>
          <VerticalTripleDotIcon className={cn('icon', 'triple-dot')} fill='#c6c6c6' onClick={handleClickIcon} />
        </>
      ) : (
        <>
          <ChevronIcon
            width={5}
            height={5}
            className={cn('icon', 'chevron')}
            onClick={handleClickIcon}
            fill='#a5a5a5'
          />
          <ul className={cn('explanation-list')}>
            <li>최소 {formattedMinPrice}원 이상 주문 시 쿠폰 적용이 가능합니다.</li>
            <li>쿠폰은 다른 계정으로 양도하실 수 없습니다. </li>
            <li>이 쿠폰은 {formattedExpiredAt}까지 유효합니다. </li>
            <li>이 쿠폰은 한 계정당 1회만 사용할 수 있습니다.</li>
          </ul>
        </>
      )}
    </div>
  );
}
