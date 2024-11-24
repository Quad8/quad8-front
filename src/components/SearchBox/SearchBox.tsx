'use client';

import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

import { getSearchSuggestion } from '@/api/searchAPI';
import { ROUTER } from '@/constants/route';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { charMatcher } from '@/utils/charMatcher';
import { SearchIcon } from '@/public/index';
import type { SuggestionDataType } from '@/types/searchType';
import { toast } from 'react-toastify';
import SearchHistory from './SearchHistory';
import SearchSuggestion from './SearchSuggestion';

import styles from './SearchBox.module.scss';

const cn = classNames.bind(styles);

interface SearchBoxProps {
  isBlack?: boolean;
  initialValue?: string;
  onSubmit?: () => void;
}

export default function SearchBox({ isBlack = false, initialValue, onSubmit }: SearchBoxProps) {
  const router = useRouter();

  const { data: searchSuggestionData } = useQuery<string[]>({
    queryFn: getSearchSuggestion,
    queryKey: ['searchSuggestionData'],
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [searchKeyword, setSearchKeyword] = useState(initialValue ?? '');
  const [originKeyword, setOriginKeyword] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [autoListType, setAutoListType] = useState<'history' | 'suggestion'>('history');
  const [focusIndex, setFocusIndex] = useState(-1);

  const [keywordHistory, setKeywordHistory] = useState<string[]>([]);
  const [keywordSuggestion, setKeywordSuggestion] = useState<SuggestionDataType[]>([]);

  useOutsideClick(inputRef, (e?: MouseEvent) => {
    if (e && suggestRef.current && !suggestRef.current.contains(e.target as Node)) {
      setIsFocus(false);
    }
  });

  const suggestionFilter = (keyword: string) => {
    if (!searchSuggestionData) {
      return;
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setKeywordSuggestion(() => {
        const value: SuggestionDataType[] = [];
        searchSuggestionData.forEach((name) => {
          const match = charMatcher(keyword.toLowerCase()).exec(name.toLocaleLowerCase());
          if (match) {
            const data = { name, range: [match.index, match.index + keyword.length] };
            value.push(data);
          }
        });
        return value;
      });
      timerRef.current = null;
    }, 200);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    if (!e.target.value) {
      setAutoListType('history');
      return;
    }
    setAutoListType('suggestion');
    suggestionFilter(e.target.value);
  };

  const handleInputFocus = () => {
    setIsFocus(true);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const value = e.key;
    if (value === 'ArrowDown') {
      e.preventDefault();
      setFocusIndex((prev) => {
        if (autoListType === 'history') {
          if (Math.min(keywordHistory.length - 1, 6) <= prev) {
            setSearchKeyword('');
            return -1;
          }

          setSearchKeyword(keywordHistory[prev + 1]);
          inputRef.current?.setSelectionRange(keywordHistory[prev + 1].length, null);
          return prev + 1;
        }

        if (prev === -1) {
          setOriginKeyword(searchKeyword);
        }

        if (Math.min(keywordSuggestion.length - 1, 6) <= prev) {
          setSearchKeyword(originKeyword);
          return -1;
        }
        setSearchKeyword(keywordSuggestion[prev + 1].name);
        inputRef.current?.setSelectionRange(keywordSuggestion[prev + 1].name.length, null);
        return prev + 1;
      });
    }
    if (value === 'ArrowUp') {
      e.preventDefault();
      setFocusIndex((prev) => {
        if (autoListType === 'history') {
          if (prev === 0) {
            setSearchKeyword('');
            inputRef.current?.setSelectionRange(0, null);
            return -1;
          }
          if (prev === -1) {
            const lastIndex = Math.min(keywordHistory.length - 1, 6);
            setSearchKeyword(keywordHistory[lastIndex]);
            inputRef.current?.setSelectionRange(null, keywordHistory[lastIndex].length);
            return lastIndex;
          }

          setSearchKeyword(keywordHistory[prev - 1]);
          inputRef.current?.setSelectionRange(null, keywordHistory[prev - 1].length);

          return prev - 1;
        }
        if (prev === 0) {
          setSearchKeyword(originKeyword);
          inputRef.current?.setSelectionRange(null, originKeyword.length);
          return -1;
        }
        if (prev === -1) {
          const lastIndex = Math.min(keywordSuggestion.length - 1, 6);
          setSearchKeyword(keywordSuggestion[lastIndex].name);
          inputRef.current?.setSelectionRange(null, keywordSuggestion[lastIndex].name.length);
          return lastIndex;
        }
        setSearchKeyword(keywordSuggestion[prev - 1].name);
        inputRef.current?.setSelectionRange(null, keywordSuggestion[prev - 1].name.length);

        return prev - 1;
      });
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchKeyword === '') {
      toast.error('검색어를 입력해주세요');
      return;
    }
    setKeywordHistory((prev) => {
      const newValue = [searchKeyword, ...prev.filter((keyword) => keyword !== searchKeyword)];
      localStorage.setItem('recentSearch', JSON.stringify(newValue));
      return newValue;
    });
    inputRef.current?.blur();
    if (onSubmit) {
      onSubmit();
    }
    router.push(`${ROUTER.SEARCH}?keyword=${searchKeyword}`, { scroll: false });
    window.scrollTo(0, 0);
  };

  const handleClickKeywordList = (value: string) => {
    setKeywordHistory((prev) => {
      const newValue = [value, ...prev.filter((keyword) => keyword !== value)];
      localStorage.setItem('recentSearch', JSON.stringify(newValue));
      return newValue;
    });
    setSearchKeyword(value);
    setIsFocus(false);
    if (onSubmit) {
      onSubmit();
    }
    router.push(`${ROUTER.SEARCH}?keyword=${value}`, { scroll: false });
    window.scrollTo(0, 0);
  };

  const handleClickDeleteHistory = (value: string) => {
    setKeywordHistory((prev) => {
      const newValue = [...prev.filter((keyword) => keyword !== value)];
      localStorage.setItem('recentSearch', JSON.stringify(newValue));
      return newValue;
    });
  };

  const handleClickDeleteAllHistory = () => {
    setKeywordHistory([]);
    localStorage.setItem('recentSearch', '[]');
  };

  const handleFocusKeyword = (index: number) => {
    setFocusIndex(index);
  };

  useEffect(() => {
    setFocusIndex(-1);
  }, [isFocus, autoListType]);

  useEffect(() => {
    setKeywordHistory(JSON.parse(localStorage.getItem('recentSearch') ?? '[]'));
  }, []);

  useEffect(() => {
    if (initialValue) {
      setSearchKeyword(initialValue);
    }
  }, [initialValue]);

  return (
    <div className={cn('wrapper')} onFocus={handleInputFocus}>
      <form className={cn('form', { 'bg-black': isBlack })} onSubmit={handleFormSubmit}>
        <input
          ref={inputRef}
          value={searchKeyword}
          className={cn('input', { 'bg-black': isBlack })}
          placeholder='검색어를 입력해주세요'
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
        <button type='submit'>
          <SearchIcon width={31} height={31} className={cn('search-button', { 'search-button-black': isBlack })} />
        </button>
      </form>
      {isFocus && (
        <div className={cn('auto-list-wrapper')} ref={suggestRef}>
          {autoListType === 'suggestion' ? (
            keywordSuggestion.length > 0 && (
              <SearchSuggestion
                suggestionData={keywordSuggestion}
                focusIndex={focusIndex}
                isBlack={isBlack}
                onClickKeyword={handleClickKeywordList}
                onFocusKeyword={handleFocusKeyword}
              />
            )
          ) : (
            <SearchHistory
              historyData={keywordHistory}
              isBlack={isBlack}
              focusIndex={focusIndex}
              onClickKeyword={handleClickKeywordList}
              onClickDelete={handleClickDeleteHistory}
              onClickDeleteAll={handleClickDeleteAllHistory}
              onFocusKeyword={handleFocusKeyword}
            />
          )}
        </div>
      )}
    </div>
  );
}
