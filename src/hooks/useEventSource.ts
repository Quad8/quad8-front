import { getCookie } from '@/utils/manageCookie';
import { useQueryClient } from '@tanstack/react-query';
import { Event, EventSourcePolyfill } from 'event-source-polyfill';
import { MutableRefObject, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import type { AlarmDataType } from '@/types/alarmType';
import { updateToken } from '@/api/interceptor/updateToken';

const BASE_URL = process.env.NEXT_PUBLIC_KEYDEUK_API_BASE_URL;

const closeEvent = (eventRef: MutableRefObject<EventSource | null>) => {
  if (eventRef.current) {
    eventRef.current.close();
    Object.assign(eventRef, { current: null });
  }
};

export const useEventSource = (
  eventRef: MutableRefObject<EventSource | null>,
  isOpenAlarm: MutableRefObject<boolean>,
) => {
  const timerRef = useRef<null | NodeJS.Timeout>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const eventSource = eventRef.current;
    const addServerSentEvent = async () => {
      const accessToken = await getCookie('accessToken');
      if (eventSource || !accessToken) {
        return;
      }
      closeEvent(eventRef);
      const newEventSource = new EventSourcePolyfill(`${BASE_URL}/api/v1/alarm/subscribe`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'text/event-stream',
        },
        heartbeatTimeout: 3600000,
      });

      /* eslint-disable-next-line */
      newEventSource.addEventListener('error', async (error: any) => {
        closeEvent(eventRef);
        if (error.status === 401) {
          await updateToken();
          await addServerSentEvent();
        }
      });

      newEventSource.addEventListener('COMMUNITY', (e: Event) => {
        const event = e as MessageEvent;
        const newData = JSON.parse(event.data) as AlarmDataType;
        if (timerRef.current) {
          return;
        }
        const timerId = setTimeout(() => {
          queryClient.invalidateQueries({ queryKey: ['communityAlarm'] });
          if (!isOpenAlarm.current) {
            toast.info(newData.message, {
              containerId: 'alarm',
            });
          }
          Object.assign(timerRef, { current: null });
        }, 500);
        Object.assign(timerRef, { current: timerId });
      });

      Object.assign(eventRef, { current: newEventSource });
    };
    addServerSentEvent();
    return () => {
      closeEvent(eventRef);
    };
  }, [eventRef, isOpenAlarm, queryClient]);
};
