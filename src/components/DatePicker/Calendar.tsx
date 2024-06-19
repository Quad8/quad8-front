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
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export default function Calendar({ selectedDate, setSelectedDate, onCloseCalendar }: CalendarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  useOutsideClick(ref, onCloseCalendar);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const startDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

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
    const numDays = daysInMonth(year, month);
    const startDay = startDayOfMonth(year, month);

    const days = [];
    for (let i = 0; i < startDay; i += 1) {
      days.push(<div key={`empty-${i}`} className={cn('day')} />);
    }

    for (let day = 1; day <= numDays; day += 1) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;
      days.push(
        <div key={day} className={cn('day', { 'selected-day': isSelected })} onClick={() => handleDayClick(day)}>
          {day}
        </div>,
      );
    }

    return days;
  };

  return (
    <div className={cn('container')} ref={ref}>
      <div className={cn('month-year-select-wrapper')}>
        <div className={cn('month-select')}>
          <ArrowIcon stroke='black' className={cn('arrow-left')} onClick={handlePrevMonth} />
          <Dropdown
            options={['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']}
            sizeVariant='xs'
            value={currentDate.getMonth() + 1}
            onChange={(val) => handleMonthSelect(val)}
          />
          {currentDate.getFullYear()}
          <ArrowIcon stroke='black' className={cn('arrow-right')} onClick={handleNextMonth} />
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
