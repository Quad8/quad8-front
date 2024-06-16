type Thumbnail = {
  id: number;
  imgUrl: string;
};

type Option = {
  id: number;
  optionName: string;
};

export type ProductType = {
  id: number;
  name: string;
  price: number;
  reviewscount: number;
  views: number;
  scope: number;
  detailsImg: string;
  thubmnailList: Thumbnail[];
  optionList: Option[];
  categoryName: string;
};
