import ProductItem from '@/components/Products/ProductItem';
import type { CategoryKey } from '@/types/Category';
import type { Product } from '@/types/ProductItem';
import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';

const cn = classNames.bind(styles);

interface ProductListProps {
  content: Product[];
  size: 'lg' | 'sm';
  category?: CategoryKey;
}

export default function ProductList({ content, size, category }: ProductListProps) {
  return (
    <ul className={cn('product-list')}>
      {content.map((product) => (
        <ProductItem key={product.id} size={size} {...product} category={category} />
      ))}
    </ul>
  );
}
