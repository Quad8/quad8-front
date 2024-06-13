type ReviewKeyword = Record<string, string>;

type ReviewImage = {
  id: number;
  imgUrl: string;
};

export type ReviewType = {
  profile_img: string;
  star: number;
  name: string;
  option: string;
  date: string;
  keyword: ReviewKeyword[];
  content: string;
  imgList: ReviewImage[];
  like: number;
};
