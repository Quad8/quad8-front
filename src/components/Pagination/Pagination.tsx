import { CaretLeftIcon, CaretRightIcon } from '@/public/index';
import { ProductDataResponse } from '@/types/ProductItem';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import styles from './Pagination.module.scss';

interface PaginationProps extends Omit<ProductDataResponse, 'content' | 'size'> {
  searchParams: { [key: string]: string | string[] | undefined };
}

const cn = classNames.bind(styles);

export default function Pagination({
  totalElements,
  totalPages,
  number: currentPage,
  first,
  last,
  searchParams,
}: PaginationProps) {
  const PAGE_RANGE = 6;

  if (!totalElements || totalPages === 0) {
    return null;
  }

  if (currentPage < 0 || currentPage >= totalPages) {
    redirect('/404');
  }

  const renderPageLink = (pageNum: number, isSelected: boolean) => {
    const linkProps = {
      href: {
        query: { ...searchParams, page: pageNum - 1 },
      },
      scroll: false,
    };

    return isSelected ? (
      <span className={cn('selected-page')} aria-current='page'>
        {pageNum}
      </span>
    ) : (
      <Link {...linkProps}>{pageNum}</Link>
    );
  };

  const renderArrowLink = (direction: 'prev' | 'next', isDisabled: boolean) => {
    const pageChange = direction === 'prev' ? currentPage - 1 : currentPage + 1;
    const ArrowIcon = direction === 'prev' ? CaretLeftIcon : CaretRightIcon;

    return isDisabled ? (
      <span className={cn('arrow-button')}>
        <ArrowIcon stroke='#B8B8B8' />
      </span>
    ) : (
      <Link href={{ query: { ...searchParams, page: pageChange } }} className={cn('arrow-button')} scroll={false}>
        <ArrowIcon stroke='#4968f6' />
      </Link>
    );
  };

  const renderPaginationItems = () => {
    const startPage = Math.floor(currentPage / PAGE_RANGE) * PAGE_RANGE + 1;
    const endPage = Math.min(startPage + PAGE_RANGE - 1, totalPages);

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((pageNum) => (
      <li key={pageNum} className={cn('pagination-item')}>
        {renderPageLink(pageNum, currentPage + 1 === pageNum)}
      </li>
    ));
  };

  return (
    <div className={cn('pagination-container')}>
      {renderArrowLink('prev', first)}
      <ul className={cn('pagination-list')}>{renderPaginationItems()}</ul>
      {renderArrowLink('next', last)}
    </div>
  );
}
