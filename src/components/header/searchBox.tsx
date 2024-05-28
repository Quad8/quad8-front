'use client';

import { ChangeEvent, useState } from 'react';
import SearchIcon from '@/public/svgs/search.svg';
import classNames from 'classnames/bind';
import styles from './searchBox.module.scss';

export default function SearchBox() {
  const cn = classNames.bind(styles);
  const [searchValue, setSearchValue] = useState<string>('');
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleClickButton = () => {
    console.log(searchValue);
  };
  return (
    <div className={cn('wrapper')}>
      <input
        value={searchValue}
        onChange={handleChangeSearch}
        className={cn('input-box')}
        placeholder="검색어를 입력해주세요."
      />
      <SearchIcon width={24} height={24} onClick={handleClickButton} className={cn('search-button')} />
    </div>
  );
}
