'use client';

import calculateStartPageNum from '@/libs/calculatePage';
import CaretLeftIcon from '@/public/svgs/caretLeft.svg';
import CaretRightIcon from '@/public/svgs/caretRight.svg';
import classNames from 'classnames/bind';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './Pagination.module.scss';

interface PaginationProps {
  count: number;
  limit: number;
}

const cn = classNames.bind(styles);

const MAX_PAGE_LENGTH = 6;

export default function Pagination({ count, limit }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const totalPageCount = Math.ceil(count / limit);

  if (!count) {
    return null;
  }

  const startPageNum = calculateStartPageNum(currentPage, MAX_PAGE_LENGTH);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPageCount) {
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={cn('pagination-container')}>
      <button
        type='button'
        onClick={() => handlePageChange(currentPage - 1)}
        className={cn('arrow-button')}
        disabled={currentPage === 1}
        aria-label='이전 페이지'
      >
        <CaretLeftIcon stroke={currentPage === 1 ? '#B8B8B8' : '$primary'} />
      </button>
      <ul className={cn('pagination-list')}>
        {Array.from(
          { length: Math.min(MAX_PAGE_LENGTH, totalPageCount - startPageNum + 1) },
          (_, i) => startPageNum + i,
        ).map((pageNum) => (
          <li key={pageNum} className={cn('pagination-item')}>
            {currentPage === pageNum ? (
              <span className={cn('selected-page')}>{pageNum}</span>
            ) : (
              <button type='button' onClick={() => handlePageChange(pageNum)} aria-label={`Page ${pageNum}`}>
                {pageNum}
              </button>
            )}
          </li>
        ))}
      </ul>
      <button
        type='button'
        onClick={() => handlePageChange(currentPage + 1)}
        className={cn('arrow-button')}
        disabled={currentPage === totalPageCount}
        aria-label='다음 페이지'
      >
        <CaretRightIcon stroke={currentPage === totalPageCount ? '#B8B8B8' : '$primary'} />
      </button>
    </div>
  );
}
