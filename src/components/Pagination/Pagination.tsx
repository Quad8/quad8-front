import { ProductDataResponse } from '@/api/getProductList';
import CaretLeftIcon from '@/public/svgs/caretLeft.svg';
import CaretRightIcon from '@/public/svgs/caretRight.svg';
import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './Pagination.module.scss';

interface PaginationProps extends Omit<ProductDataResponse, 'content' | 'size'> {
  searchParams: { [key: string]: string | string[] | undefined };
}

const cn = classNames.bind(styles);

export default function Pagination({
  totalElements,
  totalPages: totalPageCount,
  number: currentPage,
  first,
  last,
  searchParams,
}: PaginationProps) {
  if (!totalElements || totalPageCount === 0) {
    return null;
  }

  const renderPageLink = (pageNum: number, isSelected: boolean) => {
    const linkProps = {
      href: {
        query: { ...searchParams, page: pageNum - 1 },
      },
    };

    return isSelected ? <span className={cn('selected-page')}>{pageNum}</span> : <Link {...linkProps}>{pageNum}</Link>;
  };

  const renderArrowLink = (direction: 'prev' | 'next', isDisabled: boolean) => {
    const pageChange = direction === 'prev' ? currentPage - 1 : currentPage + 1;
    const Icon = direction === 'prev' ? CaretLeftIcon : CaretRightIcon;

    return isDisabled ? (
      <span className={cn('arrow-button', 'disabled')}>
        <Icon stroke='#B8B8B8' />
      </span>
    ) : (
      <Link href={{ query: { ...searchParams, page: pageChange } }} className={cn('arrow-button')}>
        <Icon stroke='#4968f6' />
      </Link>
    );
  };

  return (
    <div className={cn('pagination-container')}>
      {renderArrowLink('prev', first)}
      <ul className={cn('pagination-list')}>
        {Array.from({ length: totalPageCount }, (_, i) => i + 1).map((pageNum) => (
          <li key={pageNum} className={cn('pagination-item')}>
            {renderPageLink(pageNum, currentPage + 1 === pageNum)}
          </li>
        ))}
      </ul>
      {renderArrowLink('next', last)}
    </div>
  );
}
