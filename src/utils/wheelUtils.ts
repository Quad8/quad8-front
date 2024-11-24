import { EXTRA_ROTATION_MULTIPLIER, FULL_ROTATION_DEGREE } from '@/constants/event';
import { CouponResponse } from '@/types/couponType';

export const getRandomIndex = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

export const calculateRotation = (index: number, total: number): number =>
  (FULL_ROTATION_DEGREE / total) * index + FULL_ROTATION_DEGREE * EXTRA_ROTATION_MULTIPLIER;

export const getTodayDateString = (): string => new Date().toISOString().slice(0, 10);

export const hasRouletteCoupon = (
  couponList: CouponResponse[] | undefined,
  couponName: string,
  today: string,
): boolean => {
  const filterList = couponList?.filter((coupon) => coupon.expiredAt.slice(0, 10) === today);
  return filterList?.some((coupon) => coupon.name === couponName) ?? false;
};
