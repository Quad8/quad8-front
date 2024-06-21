import classNames from 'classnames/bind';
import { useRef, useState } from 'react';

import { Dropdown } from '@/components';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import ArrowIcon from '@/public/svgs/chevron.svg';
import RenderDays from './Days';

import styles from './Calendar.module.scss';

const cn = classNames.bind(styles);

interface CalendarProps {
  selectedDate: Date;
  onSetSelectedDate: (date: Date) => void;
  onCloseCalendar: () => void;
  startDate?: Date;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function Calendar({ selectedDate, onSetSelectedDate, onCloseCalendar, startDate }: CalendarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const isBeforeStartDate =
    (startDate && currentDate.getFullYear() < startDate.getFullYear()) ||
    (startDate &&
      currentDate.getFullYear() === startDate.getFullYear() &&
      currentDate.getMonth() < startDate.getMonth());

  useOutsideClick(ref, onCloseCalendar);

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    setCurrentDate(new Date(prevMonth));
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    setCurrentDate(new Date(nextMonth));
  };

  const handlesetSelectedDate = (date: Date) => {
    onSetSelectedDate(date);
  };

  const handleMonthSelect = (month: string) => {
    const monthToNumber = month.replace('월', '');
    const selectedMonth = new Date(currentDate.setMonth(Number(monthToNumber) + 1));
    setCurrentDate(new Date(selectedMonth));
  };

  return (
    <div className={cn('container')} ref={ref}>
      <div className={cn('month-year-select-wrapper')}>
        <div className={cn('month-select')}>
          <ArrowIcon
            className={cn('arrow-left', { 'disabled-arrow': isBeforeStartDate })}
            onClick={handlePrevMonth}
            width={24}
            height={24}
          />
          <Dropdown
            options={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']}
            sizeVariant='xs'
            value={`${currentDate.getMonth() + 1}월`}
            onChange={(month) => handleMonthSelect(month)}
            isDate
            maxHeight={4}
          />
          {currentDate.getFullYear()}
          <ArrowIcon className={cn('arrow-right')} onClick={handleNextMonth} width={24} height={24} />
        </div>
      </div>
      <div className={cn('weeks-wrapper')}>
        {DAYS.map((day) => (
          <div className={cn('week-text')} key={day}>
            {day}
          </div>
        ))}
      </div>
      <RenderDays
        currentDate={currentDate}
        selectedDate={selectedDate}
        onSetSelectedDate={handlesetSelectedDate}
        startDate={startDate}
      />
    </div>
  );
}
