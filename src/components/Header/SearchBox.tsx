'use client';

import SearchIcon from '@/public/svgs/search.svg';
import classNames from 'classnames/bind';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './SearchBox.module.scss';

const cn = classNames.bind(styles);

export default function SearchBox() {
  const [searchValue, setSearchValue] = useState<string>('');
  const handleSubmitSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /* 검색 결과 사이트 이동 */
  };
  const handleChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <form className={cn('wrapper')} onSubmit={handleSubmitSearch}>
      <input
        value={searchValue}
        onChange={handleChangeSearch}
        className={cn('input-box')}
        placeholder='검색어를 입력해주세요.'
      />
      <button type='submit' className={cn('search-button')} aria-label='submit'>
        <SearchIcon width={24} height={24} />
      </button>
    </form>
  );
}
