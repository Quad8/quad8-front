'use client';

import { ROUTER } from '@/constants/route';
import { getCookie } from '@/utils/manageCookie';
import { eventTopImg } from '@/public/index';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './AdvertisePanel.module.scss';

const cn = classNames.bind(styles);

export default function AdvertisePanel() {
  const [showPanel, setShowPanel] = useState(false);
  const router = useRouter();

  const getToday = async () => {
    const skipEventBannerForToday = await getCookie('skipEventBannerForToday');
    if (skipEventBannerForToday !== 'true') {
      setShowPanel(true);
    }
  };

  useEffect(() => {
    getToday();
  }, []);

  const handleClickClose = () => {
    setShowPanel(false);
  };

  const handleClickTodayClose = () => {
    const date = new Date(Date.now() + 86400e3).toUTCString();
    document.cookie = `skipEventBannerForToday=true; path=/; expires=${date}`;
    setShowPanel(false);
  };

  const handleClickImage = () => {
    setShowPanel(false);
    router.push(ROUTER.EVENT);
  };

  return (
    showPanel && (
      <div className={cn('container')}>
        <div className={cn('image-area')} onClick={handleClickImage}>
          <Image src={eventTopImg} width={180} height={215} alt='event' />
        </div>
        <div className={cn('button-area')}>
          <button type='button' onClick={handleClickTodayClose}>
            오늘 하루 그만보기
          </button>
          <button type='button' onClick={handleClickClose}>
            닫기
          </button>
        </div>
      </div>
    )
  );
}
