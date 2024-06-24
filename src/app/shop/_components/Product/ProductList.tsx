import ProductItem from '@/components/Products/ProductItem';
import type { Product } from '@/types/ProductItem';
import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';

const cn = classNames.bind(styles);

interface ProductListProps {
  content: Product[];
  size: 'lg' | 'sm';
  hasShop?: boolean;
}

export default function ProductList({ content, size, hasShop = false }: ProductListProps) {
  return (
    <ul className={cn('product-list')}>
      {content.map((product) => (
        <ProductItem key={product.id} size={size} hasShop={hasShop} {...product} />
      ))}
    </ul>
  );
}
