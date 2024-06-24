interface NewOrderType {
  productId: number;
  switchOptionId: number | null;
  quantity: number;
}

export type CreateOrderAPIType = NewOrderType[];

export interface CreateOrderResponseType {
  status: string;
  message: string;
  data: number;
}
