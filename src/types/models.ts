// Описание продукта на странице
export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export type PaymentTypes = 'Онлайн' | 'При получении';
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
	errors: Record<
		'payment' | 'email' | 'phone' | 'address',
		string | null
	> | null;
}

export interface AppState {
	products: Array<IProduct>;
	cartItems: Array<IProduct['id']>;
	previewItemId: IProduct['id'] | null;
}

export function handlerClosePopup(evt: Event) {
	if (evt) {
		if (evt.currentTarget === evt.target) {
			// closePopup(evt.target.closest('.modal_active'));
		}
	}
}

export function closePopup(el: HTMLElement, classOpened = 'modal_active') {
	el.classList.remove(classOpened);
	el.removeEventListener('click', handlerClosePopup);
	document.removeEventListener('keydown', handlerKeyClosePopup);
}

function handlerKeyClosePopup(evt: KeyboardEvent) {
	if (evt.code == 'Escape') {
		closePopup(document.querySelector('.modal_active'));
	}
}

export function openPopup(
	element: {
		classList: { add: (arg0: string) => void };
		addEventListener: (arg0: string, arg1: (evt: any) => void) => void;
	},
	classOpened = 'modal_active'
) {
	return () => {
		element.classList.add(classOpened);
		element.addEventListener('click', handlerClosePopup);
		document.addEventListener('keydown', handlerKeyClosePopup);
	};
}
