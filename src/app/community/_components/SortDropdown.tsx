'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Dropdown } from '@/components';
import { COMMUNITY_REVIEW_SORT_OPTIONS } from '@/constants/dropdownOptions';

export default function SortDropdown() {
  const [selectedOption, setSelectedOption] = useState(COMMUNITY_REVIEW_SORT_OPTIONS[0].label);
  const router = useRouter();

  const updateQuery = (queryValue: string) => {
    const query = new URLSearchParams(window.location.search);
    query.set('sort', queryValue);
    router.push(`${window.location.pathname}?${query.toString()}`);
  };

  const handleDropdownChange = (option: string) => {
    setSelectedOption(option);
    const queryValue = COMMUNITY_REVIEW_SORT_OPTIONS.find((opt) => opt.label === option)?.value;
    if (!queryValue) {
      return;
    }
    updateQuery(queryValue);
  };

  return (
    <Dropdown
      options={COMMUNITY_REVIEW_SORT_OPTIONS.map((option) => option.label)}
      sizeVariant='xs'
      onChange={handleDropdownChange}
      value={selectedOption}
    />
  );
}
