'use client';

import { useRef, useState, MouseEvent, MutableRefObject } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { useShallow } from 'zustand/react/shallow';
import classNames from 'classnames/bind';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { NotificationIcon } from '@/public/index';
import { getAlarm, postAlarmRead, deleteAlarm } from '@/api/alarmAPI';
import type { AlarmAPIDataType, AlarmType } from '@/types/alarmType';
import { getCurrentAlarm } from '@/utils/getCurrentAlarm';
import { useEventSource } from '@/hooks/useEventSource';
import { useEventAlarmStore, useProductAlarmStore } from '@/store/alarmStore';
import NotificationCard from './NotificationCard';

import styles from './NotificationButton.module.scss';

const cn = classNames.bind(styles);

interface NotificationButtonProps {
  isBlack: boolean;
  eventSource: MutableRefObject<EventSource | null>;
}

const CATEGORY_LIST = ['전체', '상품', '이벤트', '커뮤니티'] as const;
type CategoryType = (typeof CATEGORY_LIST)[number];

const MAX_ALARM_COUNT = 9;
const MAX_PREV_ALARM_COUNT = 99;

export default function NotificationButton({ isBlack, eventSource }: NotificationButtonProps) {
  const queryClient = useQueryClient();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isOpenAlarm = useRef<boolean>(false);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isRender, setIsRender] = useState(false);

  const { data: communityAlarm } = useQuery<AlarmAPIDataType>({ queryKey: ['communityAlarm'], queryFn: getAlarm });
  const {
    alarm: productAlarm,
    deleteAlarm: deleteProductAlarm,
    deleteAllAlarm: deleteAllProductAlarm,
    readAlarm: readProductAlarm,
  } = useProductAlarmStore(
    useShallow((state) => ({
      alarm: state.alarm,
      deleteAlarm: state.deleteAlarm,
      deleteAllAlarm: state.deleteAllAlarm,
      readAlarm: state.readAlarm,
    })),
  );
  const {
    alarm: eventAlarm,
    deleteAlarm: deleteEventAlarm,
    deleteAllAlarm: deleteAllEventAlarm,
    readAlarm: readEventAlarm,
  } = useEventAlarmStore(
    useShallow((state) => ({
      alarm: state.alarm,
      deleteAlarm: state.deleteAlarm,
      deleteAllAlarm: state.deleteAllAlarm,
      readAlarm: state.readAlarm,
    })),
  );

  const [currentCategory, setCurrentCategory] = useState<CategoryType>('전체');

  const unreadCount = {
    상품: productAlarm.filter((alarm) => !alarm.isRead).length,
    이벤트: eventAlarm.filter((alarm) => !alarm.isRead).length,
    커뮤니티: communityAlarm?.alarmDtoList ? communityAlarm?.alarmDtoList.filter((alarm) => !alarm.isRead).length : 0,
  };

  const currentAlarm = getCurrentAlarm(
    currentCategory,
    {
      상품: productAlarm,
      이벤트: eventAlarm,
      커뮤니티: communityAlarm?.alarmDtoList ?? [],
    },
    unreadCount,
  );
  const totalUnreadCount = Object.values(unreadCount).reduce((acc, value) => acc + value, 0);

  const { mutate: postAlarmReadMutate } = useMutation({
    mutationFn: (id: number) => postAlarmRead(id),
  });

  const { mutate: deleteAlarmMutate } = useMutation({
    mutationFn: (id: number[]) => deleteAlarm(id),
  });

  const handleClickButton = () => {
    if (isOpenModal) {
      return;
    }

    setIsOpen((prev) => {
      if (!prev) {
        setIsRender(true);
        isOpenAlarm.current = true;
      }
      return !prev;
    });
  };

  useOutsideClick(wrapperRef, handleClickButton);
  useEventSource(eventSource, isOpenAlarm);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsRender(false);
      isOpenAlarm.current = false;
    }
  };

  const handleCategoryButtonClick = (value: CategoryType) => {
    setCurrentCategory(value);
  };

  const handleDeleteButtonClick = () => {
    if (currentCategory === '전체' || currentCategory === '커뮤니티') {
      queryClient.setQueryData(['communityAlarm'], (prev: AlarmAPIDataType) => {
        deleteAlarmMutate(prev.alarmDtoList.map((alarm) => alarm.id));
        return { count: 0, alarmDtoList: [] };
      });
    }

    if (currentCategory === '전체' || currentCategory === '상품') {
      deleteAllProductAlarm();
    }
    if (currentCategory === '전체' || currentCategory === '이벤트') {
      deleteAllEventAlarm();
    }
  };

  const handleAlarmDataToRead = (id: number, type: AlarmType) => {
    if (type === 'COMMUNITY') {
      queryClient.setQueryData(['communityAlarm'], (prev: AlarmAPIDataType) => ({
        ...prev,
        alarmDtoList: prev.alarmDtoList.map((alarm) => (alarm.id === id ? { ...alarm, isRead: true } : alarm)),
      }));
      postAlarmReadMutate(id);
      return;
    }
    if (type === 'PRODUCT_ORDER') {
      readProductAlarm(id);
      return;
    }
    readEventAlarm(id);
  };

  const handleAlarmDataToDelete = (id: number, type: AlarmType) => {
    if (type === 'COMMUNITY') {
      queryClient.setQueryData(['communityAlarm'], (prev: AlarmAPIDataType) => ({
        count: prev.count - 1 ?? 0,
        alarmDtoList: prev.alarmDtoList.filter((alarm) => alarm.id !== id),
      }));
      deleteAlarmMutate([id]);
      return;
    }

    if (type === 'PRODUCT_ORDER') {
      deleteProductAlarm(id);
      return;
    }
    deleteEventAlarm(id);
  };

  const handleOpenModal = (value: boolean) => {
    setIsOpenModal(value);
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <div className={cn('button-wrapper')}>
        <NotificationIcon
          width={24}
          height={24}
          className={cn('icon', { 'bg-black': isBlack })}
          onClick={handleClickButton}
        />
        {totalUnreadCount > 0 && (
          <div
            className={cn('alarm-count', totalUnreadCount > MAX_ALARM_COUNT && 'count-more-digit')}
            onClick={handleClickButton}
          >
            {totalUnreadCount > MAX_ALARM_COUNT ? `${MAX_ALARM_COUNT}+` : totalUnreadCount}
          </div>
        )}
        {isRender && (
          <div className={cn('wrapper', { 'fade-out': !isOpen })} onAnimationEnd={handleAnimationEnd}>
            <div ref={wrapperRef} className={cn('notification-wrapper', { 'slide-out': !isOpen })}>
              <div className={cn('title-wrapper')}>
                <div className={cn('title')}>알림</div>
                <div className={cn('category-wrapper')}>
                  {CATEGORY_LIST.map((category) => (
                    <button
                      type='button'
                      key={category}
                      className={cn('category', { 'is-selected-category': currentCategory === category })}
                      onClick={() => handleCategoryButtonClick(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className={cn('content-wrapper')}>
                {currentAlarm.alarmList.length ? (
                  <>
                    <div className={cn('content-title-wrapper')}>
                      <div
                        className={cn('content-title')}
                      >{`지난 알림(${currentAlarm.count <= MAX_PREV_ALARM_COUNT ? currentAlarm.count : `${MAX_PREV_ALARM_COUNT}+`})`}</div>
                      <button type='button' className={cn('content-delete-all')} onClick={handleDeleteButtonClick}>
                        전체 삭제
                      </button>
                    </div>
                    <div className={cn('content-card-wrapper')}>
                      {currentAlarm.alarmList.map((alarmData) => (
                        <NotificationCard
                          key={alarmData.id}
                          isOpenModal={isOpenModal}
                          alarmData={alarmData}
                          onChangeOpenModal={handleOpenModal}
                          onChangeAlarmDataToRead={handleAlarmDataToRead}
                          onChangeAlarmDataToDelete={handleAlarmDataToDelete}
                          onCloseAlarmTab={handleClickButton}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className={cn('hollow-card-wrapper')}>
                    <NotificationIcon width={36} height={36} className={cn('hollow-card-icon')} />
                    <p className={cn('hollow-card-text')}>새로운 알림이 없습니다</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div onClick={handleClick}>
        <ToastContainer
          bodyClassName={cn('toast-body')}
          autoClose={3000}
          containerId='alarm'
          position='bottom-right'
          pauseOnHover={false}
          pauseOnFocusLoss={false}
          closeOnClick
        />
      </div>
    </>
  );
}
