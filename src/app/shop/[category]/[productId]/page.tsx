import { getQueryClient } from '@/libs/client';
import { Metadata } from 'next';
import { fetchProductQuery } from '@/libs/prefetchers';
import ProductDetail from './_components/Product/ProductDetail';
import DetailTab from './_components/TabContents/DetailTab';
import { createProductMetadata } from './_utils/metadata';

interface ProductDetailParams {
  params: {
    [param: string]: string;
  };
}

export const generateMetadata = async ({ params }: ProductDetailParams): Promise<Metadata> => {
  const { productId } = params;
  const queryClient = getQueryClient();
  const product = await fetchProductQuery(queryClient, productId);

  if (!product) {
    return {
      title: '상품 정보를 불러올 수 없습니다.',
    };
  }

  return createProductMetadata({ product });
};

export default async function ProductDetailPage({ params }: ProductDetailParams) {
  const { productId } = params;
  const localProductId = Number(productId);

  return (
    <div>
      <ProductDetail productId={localProductId} />
      <DetailTab productId={localProductId} />
    </div>
  );
}
