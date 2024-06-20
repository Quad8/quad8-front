import { KeyboardDataType } from './CustomKeyboardTypes';

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
  custom: KeyboardDataType[];
}

export interface CommentType {
  id: number;
  nickName: string;
  content: string;
  createdAt: string;
  imgUrl: string | null;
  userId: number;
}
