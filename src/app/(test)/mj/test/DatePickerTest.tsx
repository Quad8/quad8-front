'use client';

import { useState } from 'react';
import DatePicker from '@/components/DatePicker/DatePicker';
import type { DataPickerChangeProps } from '@/types/DatePickerTypes';

export default function DatePickerTest() {
  const [selectedDate, setSelectedDate] = useState<DataPickerChangeProps | null>(null);
  const handleStartDateSelected = (date: DataPickerChangeProps) => {
    // console.log(date);
    /** 조회 버튼 누르면 시작 날짜와 마감 날짜 확인이 가능합니다. */
    setSelectedDate(date);
  };

  return (
    <>
      <DatePicker onDateChane={handleStartDateSelected} />
      <div>시작 날짜: {selectedDate?.startDate?.toString()}</div>
      <div>마감 날짜: {selectedDate?.endDate?.toString()}</div>
    </>
  );
}
