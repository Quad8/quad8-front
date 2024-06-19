import classNames from 'classnames/bind';
import { SetStateAction, useState, Dispatch, useRef } from 'react';

import ArrowIcon from '@/public/svgs/chevron.svg';
import { Dropdown } from '@/components';
import { useOutsideClick } from '@/hooks/useOutsideClick';

import styles from './Calendar.module.scss';

const cn = classNames.bind(styles);

interface CalendarProps {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  onCloseCalendar: () => void;
  startDate?: Date;
}

interface DateType {
  year: number;
  month: number;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function Calendar({ selectedDate, setSelectedDate, onCloseCalendar, startDate }: CalendarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const isBeforeStartDate =
    (startDate && currentDate.getFullYear() < startDate.getFullYear()) ||
    (startDate &&
      currentDate.getFullYear() === startDate.getFullYear() &&
      currentDate.getMonth() < startDate.getMonth());

  useOutsideClick(ref, onCloseCalendar);

  const daysInMonth = ({ year, month }: DateType) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = ({ year, month }: DateType) => new Date(year, month, 1).getDay();
  const endDayOfMonth = ({ year, month }: DateType) => new Date(year, month + 1, 0).getDay();

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    setCurrentDate(new Date(prevMonth));
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    setCurrentDate(new Date(nextMonth));
  };

  const handleDayClick = (day: number) => {
    const selected = new Date(currentDate.setDate(day));
    setSelectedDate(new Date(selected));
  };

  const handleMonthSelect = (month: string) => {
    const monthToNumber = month.replace('월', '');
    const selectedMonth = new Date(currentDate.setMonth(Number(monthToNumber) + 1));
    setCurrentDate(new Date(selectedMonth));
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const numDays = daysInMonth({ year, month });
    const startDay = startDayOfMonth({ year, month });
    const endDay = endDayOfMonth({ year, month });
    const days = [];

    const prevMonthDays = daysInMonth({ year, month: month - 1 });
    for (let i = startDay - 1; i >= 0; i -= 1) {
      days.push(
        <div key={`prev-${i}`} className={cn('day', 'disabled-day')}>
          {prevMonthDays - i}
        </div>,
      );
    }

    for (let day = 1; day <= numDays; day += 1) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;
      days.push(
        <div
          key={day}
          className={cn('day', { 'disabled-day': isBeforeStartDate }, { 'selected-day': isSelected })}
          onClick={() => handleDayClick(day)}
        >
          {day}
        </div>,
      );
    }

    for (let i = 1; i < 7 - endDay; i += 1) {
      days.push(
        <div key={`next-${i}`} className={cn('day', 'disabled-day')}>
          {i}
        </div>,
      );
    }

    return days;
  };

  return (
    <div className={cn('container')} ref={ref}>
      <div className={cn('month-year-select-wrapper')}>
        <div className={cn('month-select')}>
          <ArrowIcon className={cn('arrow-left', { 'disabled-arrow': isBeforeStartDate })} onClick={handlePrevMonth} />
          <Dropdown
            options={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']}
            sizeVariant='xs'
            value={`${currentDate.getMonth() + 1}월`}
            onChange={(val) => handleMonthSelect(val)}
          />
          {currentDate.getFullYear()}
          <ArrowIcon className={cn('arrow-right')} onClick={handleNextMonth} />
        </div>
      </div>
      <div className={cn('weeks-wrapper')}>
        {DAYS.map((day) => (
          <div className={cn('week-text')} key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className={cn('days-wrapper')}>{renderDays()}</div>
    </div>
  );
}
