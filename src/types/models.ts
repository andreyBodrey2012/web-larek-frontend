// Описание продукта на странице
export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

// export type PaymentTypes = 'Онлайн' | 'При получении';
export type PaymentTypes = 'online' | 'cash';
export type CategoryColors = Record<string, string>;
export type OrderStepTypes = 'order' | 'contacts';
export type RenderOrderData = {
	data: IOrderForm | IContactsForm;
	step: OrderStepTypes;
};

// Описание попапа оформления заказа
export interface IOrder {
	payment: PaymentTypes;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: Array<IProduct['id']>;
}

type FormErrors<T extends object> = {
	[P in keyof T]?: string | null;
};

type FormFeilds<T extends object> = {
	values: Partial<T>;
	errors: FormErrors<T>;
	isValid?: boolean;
};


export type EventInputFormData<T extends object> = {
	name: keyof T;
	value: T[keyof T];
};


export interface IOrderForm
	extends FormFeilds<Pick<IOrder, 'address' | 'payment'>> {}
export interface IContactsForm
	extends FormFeilds<Pick<IOrder, 'email' | 'phone'>> {}

export type IOrderFormKeys = keyof IOrderForm;

export interface AppState {
	products: Array<IProduct>;
	cartItems: Array<IProduct['id']>;
	previewItemId: IProduct['id'] | null;
	orderForm: {
		data: IOrderForm & IContactsForm | null;
		step: OrderStepTypes;
	};
}
