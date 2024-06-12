'use client';

import InputField from '@/components/InputField/InputField';
import classNames from 'classnames/bind';
import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './SearchBox.module.scss';

const cn = classNames.bind(styles);

interface SearchBoxProps {
  isBlack: boolean;
}

export default function SearchBox({ isBlack }: SearchBoxProps) {
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
      <InputField
        sizeVariant='header'
        value={searchValue}
        onChange={handleChangeSearch}
        placeholder='검색어를 입력해주세요.'
        className={cn({ black: isBlack })}
        suffixIcon='search'
      />
    </form>
  );
}
