import { ProductType } from '@/types/productType';
import { Metadata } from 'next';

interface ProductMetadataParams {
  product: ProductType;
}

export const createProductMetadata = ({ product }: ProductMetadataParams): Metadata => {
  const { name, detailsImg, categoryName, reviewscount, price, scope, views } = product;

  return {
    title: `${name} - 상품 정보`,
    description: `${name}은(는) ${categoryName} 카테고리의 제품으로, 가격은 ${price}원입니다. 총 ${reviewscount}개의 리뷰에서 평균 평점 ${scope}점을 기록했으며, ${views}회의 조회수를 기록한 인기 상품입니다.`,
    openGraph: {
      title: `${name} - 상품 정보`,
      images: detailsImg,
    },
  };
};
