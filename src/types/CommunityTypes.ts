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
