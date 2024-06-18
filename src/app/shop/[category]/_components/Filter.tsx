import { InputField } from '@/components';
import { FILTER_OPTIONS } from '@/constants/product';
import { DeleteIcon, ResetIcon } from '@/public/index';
import type { CategoryKey } from '@/types/Category';
import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './Filter.module.scss';

const cn = classNames.bind(styles);

const DELETE_ITEM_COLOR = '#787878';

export default function Filter({ category }: { category: CategoryKey }) {
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const options = FILTER_OPTIONS[category];

  const handleClickReset = () => {
    setSelectedList([]);
  };

  const handleClickFilterItem = (item: string) => {
    if (selectedList.includes(item)) {
      setSelectedList(selectedList.filter((x) => x !== item));
    } else {
      setSelectedList([...selectedList, item]);
    }
  };

  const handleRemoveItem = (item: string) => {
    setSelectedList(selectedList.filter((x) => x !== item));
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
              className={cn({ selected: selectedList.includes(manufacturer) })}
              onClick={() => handleClickFilterItem(manufacturer)}
            >
              {manufacturer}
            </li>
          ))}
        </ul>
      </div>
      {options.SWITCH_TYPES && (
        <div className={cn('filter-group')}>
          <h4>스위치 유형</h4>
          <ul className={cn('options')}>
            {options.SWITCH_TYPES.map((switchType) => (
              <li
                key={switchType}
                className={cn({ selected: selectedList.includes(switchType) })}
                onClick={() => handleClickFilterItem(switchType)}
              >
                {switchType}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* 가격필터 */}
      <div className={cn('filter-group', 'price')}>
        <h4>가격</h4>
        <div className={cn('options', 'price-wrap')}>
          <div className={cn('price-input')}>
            <InputField suffixUnit='원' sizeVariant='sm' />
          </div>
          <span>~</span>
          <div className={cn('price-input')}>
            <InputField suffixUnit='원' sizeVariant='sm' />
          </div>
          <button type='button' className={cn('search')}>
            검색
          </button>
        </div>
      </div>
      <div className={cn('reset-check', { hidden: !selectedList.length })}>
        <button type='button' className={cn('reset')} onClick={handleClickReset}>
          <span>전체해제</span>
          <ResetIcon />
        </button>
        <span className={cn('bar')} />
        <ul className={cn('selected-item-list')}>
          {selectedList.map((item) => (
            <li key={item} className={cn('selected-item')}>
              {item}
              <button type='button' onClick={() => handleRemoveItem(item)} className={cn('remove-button')}>
                <DeleteIcon fill={DELETE_ITEM_COLOR} width={17} height={17} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
