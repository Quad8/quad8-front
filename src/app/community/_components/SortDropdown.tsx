'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Dropdown } from '@/components';

const DROPDOWN_OPTIONS: { [key: string]: string } = {
  new: '최신순',
  popular: '인기순',
  views: '조회순',
};

export default function SortDropdown() {
  const [selectedOption, setSelectedOption] = useState('최신순');
  const router = useRouter();

  const updateQuery = (queryValue: string) => {
    const query = new URLSearchParams(window.location.search);
    query.set('sort', queryValue);
    router.push(`${window.location.pathname}?${query.toString()}`);
  };

  const handleDropdownChange = (option: string) => {
    setSelectedOption(option);
    const queryValue = Object.keys(DROPDOWN_OPTIONS).find((key) => DROPDOWN_OPTIONS[key] === option);
    if (!queryValue) {
      return;
    }
    updateQuery(queryValue);
  };

  return (
    <Dropdown
      options={Object.values(DROPDOWN_OPTIONS)}
      sizeVariant='xs'
      onChange={handleDropdownChange}
      value={selectedOption}
    />
  );
}
