'use client';

import { pointImg, rouletteImg } from '@/public/index';
import { useEffect, useState } from 'react';

import { Dialog } from '@/components';
import SignInModal from '@/components/SignInModal/SignInModal';
import { ANIMATION_DURATION, CONFETTI_NUMBER, EMOJI_SIZE, MIN_PRICE_MULTIPLIER, REWARDS } from '@/constants/event';
import { useCreateCouponMutation } from '@/hooks/useCreateCouponMutation';
import { calculateRotation, getRandomIndex, getTodayDateString, hasRouletteCoupon } from '@/utils/wheelUtils';
import type { CouponResponse } from '@/types/couponType';
import { UserDataResponseType } from '@/types/userType';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import JSConfetti from 'js-confetti';
import Image from 'next/image';
import styles from './Roulette.module.scss';

const cn = classNames.bind(styles);

export default function Roulette() {
  const [result, setResult] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isParticipated, setIsParticipated] = useState(false);
  const [isTodayParticipated, setIsTodayParticipated] = useState(false);

  const { data: couponList } = useQuery<CouponResponse[]>({
    queryKey: ['coupons'],
  });

  const queryClient = useQueryClient();
  const { mutate: createCoupon } = useCreateCouponMutation(setIsModalOpen);

  useEffect(() => {
    const jsConfetti = new JSConfetti();
    if (isAnimating) {
      const resultIndex = getRandomIndex(0, REWARDS.length - 1);
      const newRotation = calculateRotation(resultIndex, REWARDS.length);
      setRotation(newRotation);

      setTimeout(() => {
        setIsAnimating(false);
        const finalResult = REWARDS[resultIndex];
        setResult(finalResult);
        jsConfetti.addConfetti({
          emojis: ['💳', '💵', '💶', '💰', '🤑', '💸'],
          emojiSize: EMOJI_SIZE,
          confettiNumber: CONFETTI_NUMBER,
        });

        const expiredDate = new Date();
        expiredDate.setDate(expiredDate.getDate() + 1);

        createCoupon({
          name: '룰렛 쿠폰',
          price: finalResult,
          minPrice: finalResult * MIN_PRICE_MULTIPLIER,
          expiredDate,
          isWelcome: false,
        });
      }, ANIMATION_DURATION);
    }
  }, [isAnimating, createCoupon]);

  const startRoulette = async () => {
    const userData = queryClient.getQueryData<UserDataResponseType>(['userData']);

    if (!userData?.data) {
      setIsLoginOpen(true);
      return;
    }

    const today = getTodayDateString();
    if (hasRouletteCoupon(couponList, '룰렛 쿠폰', today)) {
      setIsParticipated(true);
      return;
    }

    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    setIsTodayParticipated(true);
  };

  return (
    <div className={cn('tag')}>
      <div className={cn('event-area')}>
        <div className={cn('roulette-area')}>
          <Image src={pointImg} alt='point' className={cn('point-img')} width={78} />
          <Image
            src={rouletteImg}
            alt='룰렛'
            className={cn('roulette')}
            width={650}
            height={650}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: isAnimating ? `transform ${ANIMATION_DURATION / 1000}s ease-out` : 'none',
            }}
          />
        </div>
        <div className={cn('button-area')}>
          <button
            type='button'
            onClick={startRoulette}
            className={cn('start-button')}
            disabled={isAnimating || isTodayParticipated}
          >
            {isTodayParticipated ? '참여완료' : '룰렛 돌리고 쿠폰 받기!'}
          </button>
        </div>
        <Dialog
          type='alert'
          iconType='accept'
          message={`${result}원 쿠폰에 당첨 됐습니다.`}
          isOpen={isModalOpen}
          buttonText='확인'
          onClick={() => setIsModalOpen(false)}
        />
        <SignInModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        <Dialog
          type='alert'
          iconType='warn'
          message='오늘은 더 이상 참여 할 수 없습니다.\n내일 다시 참여해주세요.'
          isOpen={isParticipated}
          buttonText='확인'
          onClick={() => setIsParticipated(false)}
        />
      </div>
    </div>
  );
}
