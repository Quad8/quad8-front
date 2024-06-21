import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';

const cn = classNames.bind(styles);

interface DateType {
  year: number;
  month: number;
}

interface RenderDaysProps {
  currentDate: Date;
  selectedDate: Date;
  startDate?: Date;
  onSetSelectedDate: (date: Date) => void;
}

const daysInMonth = ({ year, month }: DateType) => new Date(year, month + 1, 0).getDate();
const startDayOfMonth = ({ year, month }: DateType) => new Date(year, month, 1).getDay();
const endDayOfMonth = ({ year, month }: DateType) => new Date(year, month + 1, 0).getDay();

export default function RenderDays({ currentDate, selectedDate, startDate, onSetSelectedDate }: RenderDaysProps) {
  const isBeforeStartDate =
    (startDate && currentDate.getFullYear() < startDate.getFullYear()) ||
    (startDate &&
      currentDate.getFullYear() === startDate.getFullYear() &&
      currentDate.getMonth() < startDate.getMonth());

  const handleDayClick = (day: number) => {
    const selected = new Date(currentDate.setDate(day));
    onSetSelectedDate(new Date(selected));
  };

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

  return <div className={cn('days-wrapper')}>{days}</div>;
}
