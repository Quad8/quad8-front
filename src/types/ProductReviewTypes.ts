export interface ReviewImage {
  id: number;
  imageUrl: string;
}

export interface ReviewWriter {
  id: number;
  nickname: string;
  imgUrl: string;
}

export interface ReviewDto {
  id: number;
  orderId: number;
  switchOption: string;
  productCategoryId: number;
  writer: ReviewWriter;
  content: string;
  score: number;
  option1: number;
  option2: number;
  option3: number;
  reviewImgs: ReviewImage[];
  likeCount: number;
  likedByUser: boolean;
  userId: number;
  productId: number;
  updatedAt: Date;
}

export type OptionRatio = Record<string, number>;

export type KeywordStatistics = Record<string, OptionRatio>;

export type ProductReviewPreview = {
  averageScore: number;
  reviewCounts: number;
  reviewStatistics: KeywordStatistics & { scoreRatios: OptionRatio };
};

export interface ProductReviewType extends ProductReviewPreview {
  reviewDtoList: ReviewDto[];
}

type Keyword = Record<string, string[]>;

export type ReviewKeywordType = Record<'키보드' | '키캡' | '스위치' | '기타용품', Keyword>;

export interface ProductReviewParams {
  productId: string;
  sort?: string;
  page?: number;
  size?: number;
}
