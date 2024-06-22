import { getProductDetail } from '@/api/productAPI';
import { getProductReviews } from '@/api/productReviewAPI';
import { ROUTER } from '@/constants/route';
import { redirect } from 'next/navigation';
import ProductDetail from './_components/Product/ProductDetail';
import DetailTab from './_components/TabContents/DetailTab';

interface ProductDetailParams {
  params: {
    [param: string]: string;
  };
}

export default async function page({ params }: ProductDetailParams) {
  const { productId } = params;
  const productDetailData = await getProductDetail(productId);
  const productReviewData = await getProductReviews(productId);

  if (!productDetailData) {
    redirect(ROUTER.MAIN);
  }

  return (
    <div>
      <ProductDetail product={productDetailData} />
      <DetailTab detailsImg={productDetailData.detailsImg} reviewData={productReviewData} />
    </div>
  );
}
