import { getProductDetail } from '@/api/getProductDetail';
import ProductDetail from '../_components/ProductDetail';

interface ProductDetailParams {
  params: {
    [param: string]: string;
  };
}

export default async function page({ params }: ProductDetailParams) {
  const { productId } = params;
  const data = await getProductDetail(productId);

  return (
    <div style={{ padding: '12rem' }}>
      <ProductDetail product={data} />
    </div>
  );
}
