'use client';

import { InputField } from '@/components';
import { FILTER_OPTIONS } from '@/constants/product';
import { DeleteIcon, ResetIcon } from '@/public/index';
import type { CategoryKey } from '@/types/Category';
import classNames from 'classnames/bind';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useState } from 'react';
import styles from './Filter.module.scss';

const cn = classNames.bind(styles);

const DELETE_ITEM_COLOR = '#787878';

interface FilterProps {
  category: CategoryKey;
}

export default function Filter({ category }: FilterProps) {
  const searchParams = useSearchParams();
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>(
    searchParams.get('companies')?.split(',') || [],
  );
  const [selectedSwitchTypes, setSelectedSwitchTypes] = useState<string[]>(
    searchParams.get('switchTypes')?.split(',') || [],
  );
  const [minPriceState, setMinPriceState] = useState<string>(searchParams.get('minPrice') || '');
  const [maxPriceState, setMaxPriceState] = useState<string>(searchParams.get('maxPrice') || '');
  const [tempMinPrice, setTempMinPrice] = useState<string>(minPriceState);
  const [tempMaxPrice, setTempMaxPrice] = useState<string>(maxPriceState);

  const options = FILTER_OPTIONS[category];
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (companies: string[], switchTypes: string[], minPrice: string, maxPrice: string) => {
    const query: { [key: string]: string | undefined } = {
      companies: companies.length ? companies.join(',') : undefined,
      switchTypes: switchTypes.length ? switchTypes.join(',') : undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice || undefined,
    };

    router.push(
      queryString.stringifyUrl(
        {
          url: pathname,
          query,
        },
        { skipNull: true, skipEmptyString: true },
      ),
    );
  };

  const handleClickReset = () => {
    setSelectedManufacturers([]);
    setSelectedSwitchTypes([]);
    setMinPriceState('');
    setMaxPriceState('');
    setTempMinPrice('');
    setTempMaxPrice('');
    handleSearch([], [], '', '');
  };

  const handleClickFilterItem = (item: string, type: 'manufacturer' | 'switch') => {
    if (type === 'manufacturer') {
      setSelectedManufacturers((prev) => {
        const newSelected = prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item];
        handleSearch(newSelected, selectedSwitchTypes, minPriceState, maxPriceState);
        return newSelected;
      });
      return;
    }

    setSelectedSwitchTypes((prev) => {
      const newSelected = prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item];
      handleSearch(selectedManufacturers, newSelected, minPriceState, maxPriceState);
      return newSelected;
    });
  };

  const handleRemoveItem = (item: string, type: 'manufacturer' | 'switch') => {
    if (type === 'manufacturer') {
      setSelectedManufacturers((prev) => {
        const newSelected = prev.filter((x) => x !== item);
        handleSearch(newSelected, selectedSwitchTypes, minPriceState, maxPriceState);
        return newSelected;
      });
      return;
    }

    setSelectedSwitchTypes((prev) => {
      const newSelected = prev.filter((x) => x !== item);
      handleSearch(selectedManufacturers, newSelected, minPriceState, maxPriceState);
      return newSelected;
    });
  };

  const handleMinPriceChange = (value: string) => {
    setTempMinPrice(value);
  };

  const handleMaxPriceChange = (value: string) => {
    setTempMaxPrice(value);
  };

  const handlePriceSearch = () => {
    setMinPriceState(tempMinPrice);
    setMaxPriceState(tempMaxPrice);
    handleSearch(selectedManufacturers, selectedSwitchTypes, tempMinPrice, tempMaxPrice);
  };

  if (!options) {
    return <div>Invalid filter type</div>;
  }

  return (
    <div className={cn('filter-wrap')}>
      <div className={cn('filter-group')}>
        <h4>제조사</h4>
        <ul className={cn('options')}>
          {options.MANUFACTURERS.map((manufacturer) => (
            <li
              key={manufacturer}
              className={cn({ selected: selectedManufacturers.includes(manufacturer) })}
              onClick={() => handleClickFilterItem(manufacturer, 'manufacturer')}
            >
              {manufacturer}
            </li>
          ))}
        </ul>
      </div>
      {'SWITCH_TYPES' in options && (
        <div className={cn('filter-group')}>
          <h4>스위치 유형</h4>
          <ul className={cn('options')}>
            {options.SWITCH_TYPES.map((switchType) => (
              <li
                key={switchType}
                className={cn({ selected: selectedSwitchTypes.includes(switchType) })}
                onClick={() => handleClickFilterItem(switchType, 'switch')}
              >
                {switchType}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={cn('filter-group', 'price')}>
        <h4>가격</h4>
        <div className={cn('options', 'price-wrap')}>
          <div className={cn('price-input')}>
            <InputField
              type='number'
              suffixUnit='원'
              sizeVariant='sm'
              value={tempMinPrice}
              onChange={(e) => handleMinPriceChange(e.target.value)}
            />
          </div>
          <span>~</span>
          <div className={cn('price-input')}>
            <InputField
              type='number'
              suffixUnit='원'
              sizeVariant='sm'
              value={tempMaxPrice}
              onChange={(e) => handleMaxPriceChange(e.target.value)}
            />
          </div>
          <button type='button' onClick={handlePriceSearch} className={cn('search')}>
            검색
          </button>
        </div>
      </div>
      <div
        className={cn('reset-check', {
          hidden: !(selectedManufacturers.length || selectedSwitchTypes.length),
        })}
      >
        <button type='button' className={cn('reset')} onClick={handleClickReset}>
          <span>전체해제</span>
          <ResetIcon />
        </button>
        <span className={cn('bar')} />
        <ul className={cn('selected-item-list')}>
          {selectedManufacturers.map((item) => (
            <li key={item} className={cn('selected-item')}>
              {item}
              <button
                type='button'
                onClick={() => handleRemoveItem(item, 'manufacturer')}
                className={cn('remove-button')}
              >
                <DeleteIcon fill={DELETE_ITEM_COLOR} width={17} height={17} />
              </button>
            </li>
          ))}
          {selectedSwitchTypes.map((item) => (
            <li key={item} className={cn('selected-item')}>
              {item}
              <button type='button' onClick={() => handleRemoveItem(item, 'switch')} className={cn('remove-button')}>
                <DeleteIcon fill={DELETE_ITEM_COLOR} width={17} height={17} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
