export type ThumbnailTypes = {
  id: number;
  imgUrl: string;
};

export type OptionTypes = {
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
  thubmnailList: ThumbnailTypes[];
  optionList: OptionTypes[];
  categoryName: string;
};
