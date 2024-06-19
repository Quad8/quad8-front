'use client';

import classNames from 'classnames/bind';
import { useState } from 'react';

import { CalendarIcon } from '@/public/index';
import Button from '../Buttons/Button/Button';
import Calendar from './Calendar';

import styles from './DatePicker.module.scss';

const cn = classNames.bind(styles);

function DatePicker() {
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(selectedStartDate);

  const [openCalendarType, setOpenCalendarType] = useState<'start' | 'end' | null>(null);

  const handleOpenStartCalendar = () => {
    setOpenCalendarType('start');
  };

  const handleOpenEndCalendar = () => {
    setOpenCalendarType('end');
  };

  const handleCloseCalendar = () => {
    setOpenCalendarType(null);
  };

  const formatDateToString = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const dateString = `${year}.${month}.${day}`;
    return dateString;
  };

  return (
    <div className={cn('container')}>
      <div className={cn('month-picker-wrapper')}>
        <Button className={cn('date-option', 'first')} hoverColor='outline-primary' paddingVertical={8}>
          1개월
        </Button>
        <Button className={cn('date-option', 'second')} hoverColor='outline-primary' paddingVertical={8}>
          2개월
        </Button>
        <Button className={cn('date-option', 'third')} hoverColor='outline-primary' paddingVertical={8}>
          3개월
        </Button>
      </div>
      <div className={cn('custom-picker-wrapper')}>
        <div
          className={cn('date-picker-input', 'start-date', `${openCalendarType === 'start' && 'is-focus'}`)}
          onClick={handleOpenStartCalendar}
        >
          <span className={cn('date-text')}>{formatDateToString(selectedStartDate)}</span>
          <CalendarIcon stroke={openCalendarType === 'start' ? '#4968F6' : '#787878'} />
          {openCalendarType === 'start' && (
            <Calendar
              selectedDate={selectedStartDate}
              setSelectedDate={setSelectedStartDate}
              onCloseCalendar={handleCloseCalendar}
            />
          )}
        </div>

        <p>~</p>

        <div
          className={cn('date-picker-input', 'end-date', `${openCalendarType === 'end' && 'is-focus'}`)}
          onClick={handleOpenEndCalendar}
        >
          <span className={cn('date-text')}>{formatDateToString(selectedEndDate)}</span>
          <CalendarIcon stroke={openCalendarType === 'end' ? '#4968F6' : '#787878'} />
          {openCalendarType === 'end' && (
            <Calendar
              selectedDate={selectedEndDate}
              setSelectedDate={setSelectedEndDate}
              onCloseCalendar={handleCloseCalendar}
            />
          )}
        </div>
      </div>
      <Button width={72} paddingVertical={8} radius={4}>
        조회
      </Button>
    </div>
  );
}

export default DatePicker;
