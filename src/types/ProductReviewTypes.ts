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

export interface KeywordStatistics {
  option1Ratios: OptionRatio;
  option2Ratios: OptionRatio;
  option3Ratios: OptionRatio;
}

export type ProductReviewPreview = {
  averageScore: number;
  reviewCounts: number;
  reviewStatistics: KeywordStatistics & { scoreRatios: OptionRatio };
};

export interface ProductReviewType extends ProductReviewPreview {
  reviewDtoList: ReviewDto[];
}

interface KeyboardKeyword {
  키감: string[];
  소리: string[];
  내구성: string[];
}

interface KeycapKeyword {
  색감: string[];
  텍스처: string[];
  내구성: string[];
}

interface SwitchKeyword {
  반응속도: string[];
  소리: string[];
  내구성: string[];
}

interface EtcKeyword {
  호환성: string[];
  편의성: string[];
  내구성: string[];
}

export interface ReviewKeywordType {
  키보드: KeyboardKeyword;
  키캡: KeycapKeyword;
  스위치: SwitchKeyword;
  기타용품: EtcKeyword;
}
