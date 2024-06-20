'use client';

import { Dropdown } from '@/components';
import { LIST_SORT_OPTIONS } from '@/constants/dropdownOptions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Sort() {
  const [dropdownValue, setDropdownValue] = useState(LIST_SORT_OPTIONS[0].label);
  const router = useRouter();

  const updateQuery = (value: string) => {
    const query = new URLSearchParams(window.location.search);
    query.set('sort', value);
    router.push(`${window.location.pathname}?${query.toString()}`);
  };

  const handleDropdownChange = (selectedLabel: string) => {
    const selectedOption = LIST_SORT_OPTIONS.find((option) => option.label === selectedLabel);
    if (selectedOption) {
      setDropdownValue(selectedLabel);
      updateQuery(selectedOption.value);
    }
  };
  return (
    <Dropdown
      sizeVariant='xs'
      options={LIST_SORT_OPTIONS.map((option) => option.label)}
      onChange={handleDropdownChange}
      value={dropdownValue}
    />
  );
}
