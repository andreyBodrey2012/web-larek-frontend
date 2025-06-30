import { IEvents } from './events';
import { IProduct } from './models';

export class IBaseView {
  constructor(eventEmitter: IEvents, container: HTMLElement) {
    this.eventEmitter = eventEmitter;
    this.container = container;
  }

	container: HTMLElement;
	eventEmitter: IEvents;

  setText(element: HTMLElement, value: string): void {
		if (element) element.innerText = value;
	}
}

export interface IBasePopupView extends IBaseView {
	isOpen: boolean;
	content: HTMLElement;
	render: (content: HTMLElement) => void;
	open: () => {};
	close: () => {};
}

// Описание списка продуктов
export interface IListItemsView extends IBaseView {
	items: Array<ItemView>;
}

// Описание продукта
export interface ItemView extends IBaseView {
	item: IProduct;
	// Открывает попап продукта
	onClick: (evt: Event, id: IProduct['id']) => void;
}

// Описание попапа продукта
export interface IPopupItemView extends IBasePopupView {
	item: IProduct;
	// Добавляет предмет в корзину
	addItemToCart: (evt: Event, id: IProduct['id']) => void;
}

// Описание попапа корзины
export interface IPopupCartView extends IBasePopupView {
	items: Array<IProduct>;
	// Удаляет предмет из корзины
	deleteItemFromCart: (evt: Event, id: IProduct['id']) => void;
}

// Описание виджета корзины
export interface ICartWidgetView extends IBaseView {
	count: number;
	// Метод открывает попапа корзины
	onClick: (evt: Event) => void;
}