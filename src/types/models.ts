// Описание продукта на странице
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

export type PaymentTypes = "Онлайн" | "При получении";
export type CategoryColors = Record<string, string>;

// Описание попапа оформления заказа
export interface IOrder {
	payment: PaymentTypes;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: Array<IProduct['id']>;
}

export interface IOrderForm {
  payment: IOrder['payment'];
	email: IOrder['email'];
	phone: IOrder['phone'];
	address: IOrder['address'];
  errors: Record<'payment' | 'email' | 'phone' | 'address', string | null> | null;  
}

export interface AppState {
  products: Array<IProduct>;
  cartItems: Array<IProduct['id']>;
  previewItemId: IProduct['id'] | null;
}