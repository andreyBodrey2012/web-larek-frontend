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

export type OrderFormData = IOrderForm & IContactsForm | null;
export type OrderForm = {
	data: OrderFormData;
	step: OrderStepTypes;
}

export abstract class AppState {
	// продукты.
	protected _products: Array<IProduct>;
	// продукты в корзине.
	protected _cartItems: Array<IProduct['id']>;
	// показывает информацию о продукте по айди.
	protected _previewItemId: IProduct['id'] | null;
	// поле оформления заказа.
	protected _orderForm: OrderForm;
	// итоговая сумма продуктов в корзине.
	protected _total: number;

	// возращает продукт из корзины.
	abstract set products(products: Array<IProduct>);
	// передаёт продукт в корзину.
	abstract get products(): Array<IProduct>;
	// даёт сумму продукта при отображении на главной странице.
    abstract get total(): number;
    // даёт айди продуктов находящиеся в корзине.
    abstract get cartItems(): Array<IProduct['id']>;
    // возращает айди отфильтрованый айди продуктов из корзины.
    abstract get cartProducts(): IProduct[];
    // показывает количество продуктов в корзине при отображении на главной странице.
    abstract get cartCounter(): number;
    // устанавливает этап оформления заказа.
    abstract set orderStep(step: OrderStepTypes);
    // получает этап офрмления заказа.
    abstract get orderStep(): OrderStepTypes;
    // поле оформления заказа.
    abstract get orderForm(): OrderForm;
    // устанавливае тзначение поля оформления заказа.
    abstract set orderFormValue({ name, value }: EventInputFormData<IOrderForm['values'] | IContactsForm['values']>);
    // возращает айди карточки на которую нажали.
    abstract set previewItemId(id: IProduct['id'] | null);
    // получает айди карточки на которую нажали.
    abstract get previewItemId(): IProduct['id'] | null;
	// добавляет продукт в корзину.
	abstract addCartItem(id: IProduct["id"]): void;
	// удаляет продукт из корзины.
    abstract removeCartItem(id: IProduct["id"]): void;
	// очищает корзину.
    abstract clearCartItems(): void;
	// очищает формы оформления заказа.
    abstract clearOrderForm(): void;
	// проверяет наличие предмета в корзине.
    abstract hasProductInCart(id: IProduct["id"]): boolean;
	// получает айди предмета.
    abstract getProductById(productId: IProduct["id"]): IProduct | undefined;
}
