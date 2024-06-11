interface ReviewKeyword {
  [key: string]: string;
}

interface ReviewImage {
  id: number;
  imgUrl: string;
}

export interface Review {
  profile_img: string;
  star: number;
  name: string;
  option: string;
  date: string;
  keyword: ReviewKeyword[];
  content: string;
  imgList: ReviewImage[];
  like: number;
}
