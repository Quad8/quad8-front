import { getProductDetail } from '@/api/productAPI';
import { redirect } from 'next/navigation';
import ProductDetail from './_components/Product/ProductDetail';

interface ProductDetailParams {
  params: {
    [param: string]: string;
  };
}

export default async function page({ params }: ProductDetailParams) {
  const { productId } = params;
  const data = await getProductDetail(productId);

  if (!data) {
    redirect('/');
  }

  return (
    <div>
      <ProductDetail product={data} />
    </div>
  );
}
