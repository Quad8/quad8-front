import CaretLeftIcon from '@/public/svgs/CaretLeft.svg';
import CaretRightIcon from '@/public/svgs/CaretRight.svg';
import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './Pagination.module.scss';

interface PaginationProps {
  page: string;
  count: number;
  limit: number;
}

const cn = classNames.bind(styles);

const MAX_PAGE_LENGTH = 6;

const calculateStartPageNum = (currentPage: number, maxPageLength: number): number => {
  return Math.floor((currentPage - 1) / maxPageLength) * maxPageLength + 1;
};

function Pagination({ page, count, limit }: PaginationProps) {
  const currentPage = Math.max(1, parseInt(page || '1', 10));
  const totalPageCount = Math.ceil(count / limit);

  if (!count) return null;

  const startPageNum = calculateStartPageNum(currentPage, MAX_PAGE_LENGTH);

  return (
    <div className={cn('pagination-container')}>
      {currentPage > 1 ? (
        <Link href={`?page=${currentPage - 1}`}>
          <CaretLeftIcon />
        </Link>
      ) : (
        <CaretLeftIcon stroke="#B8B8B8" className={cn('disabled')} />
      )}
      <ul className={cn('pagination-list')}>
        {Array.from(
          { length: Math.min(MAX_PAGE_LENGTH, totalPageCount - startPageNum + 1) },
          (_, i) => startPageNum + i,
        ).map((pageNum) => (
          <li key={pageNum} className={cn('pagination-item')}>
            {currentPage === pageNum ? (
              <span className={cn('selected-page')}>{pageNum}</span>
            ) : (
              <Link href={`?page=${pageNum}`} scroll={false}>
                {pageNum}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <Link href={`?page=${currentPage < totalPageCount ? currentPage + 1 : totalPageCount}`} scroll={false}>
        <CaretRightIcon stroke={currentPage === totalPageCount ? '#B8B8B8' : '#576DF2'} />
      </Link>
    </div>
  );
}

export default Pagination;
