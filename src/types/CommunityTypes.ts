import type { CustomKeyboardSwitchTypes, CustomKeyboardPointKeyType } from '@/types/CustomKeyboardTypes';

export interface CommunityParamsType {
  sort: string;
  page?: string;
  size?: string;
}

export interface CommunityPostCardDataType {
  id: number;
  title: string;
  likeCount: number;
  commentCount: number;
  nickName: string;
  userImage: string | null;
  thumbnail: string | string[];
  isLiked: boolean;
  updateAt: string;
}

export interface CommunityPostCardDetailDataType extends Omit<CommunityPostCardDataType, 'thumbnail' | 'updateAt'> {
  userId: number;
  comments: CommentType[];
  content: string;
  createdAt: string;
  updatedAt: string;
  reviewImages: { id: number; imgUrl: string }[];
  isLiked: boolean;
  liked: boolean;
  custom: PostCardDetailModalCustomKeyboardType;
}

export interface CommentType {
  id: number;
  nickName: string;
  content: string;
  createdAt: string;
  imgUrl: string | null;
  userId: number;
}

export interface PostCardDetailModalCustomKeyboardType {
  productId: number;
  type: string;
  texture: string;
  boardColor: string;
  switchType: CustomKeyboardSwitchTypes;
  baseKeyColor: string;
  hasPointKeyCap: boolean;
  pointKeyType: CustomKeyboardPointKeyType;
  pointSetColor: string;
  imgUrl: string;
  price: number;
  individualColor: Record<string, string>;
}
