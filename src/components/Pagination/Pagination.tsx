'use client';

import { ProductDataResponse } from '@/api/getProductList';
import CaretLeftIcon from '@/public/svgs/caretLeft.svg';
import CaretRightIcon from '@/public/svgs/caretRight.svg';
import classNames from 'classnames/bind';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styles from './Pagination.module.scss';

type PaginationProps = Omit<ProductDataResponse, 'content' | 'size'>;

const cn = classNames.bind(styles);

export default function Pagination({
  totalElements,
  totalPages: totalPageCount,
  number: currentPage,
  first,
  last,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!totalElements) {
    return null;
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 0 || newPage > totalPageCount) {
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
        disabled={first}
        aria-label='이전 페이지'
      >
        <CaretLeftIcon stroke={first ? '#B8B8B8' : '#4968f6'} />
      </button>
      <ul className={cn('pagination-list')}>
        {Array.from({ length: totalPageCount }, (_, i) => i + 1).map((pageNum) => (
          <li key={pageNum} className={cn('pagination-item')}>
            {currentPage + 1 === pageNum ? (
              <span className={cn('selected-page')}>{pageNum}</span>
            ) : (
              <button type='button' onClick={() => handlePageChange(pageNum - 1)} aria-label={`Page ${pageNum}`}>
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
        disabled={last}
        aria-label='다음 페이지'
      >
        <CaretRightIcon stroke={last ? '#B8B8B8' : '#4968f6'} />
      </button>
    </div>
  );
}
