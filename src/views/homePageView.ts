import {
	IBasePopupView,
	IBaseView,
	ICartWidgetView,
	IEvents,
	IListItemsView,
	IProduct,
} from '../types';

// Описание главной страницы
export class HomePageView implements IBaseView {
	constructor(eventEmitter: IEvents, container: HTMLElement) {}

	container: HTMLElement;
	eventEmitter: IEvents;
	cartCounter: ICartWidgetView;
	productsContainer: IListItemsView;
	cartIcon: HTMLElement;
	popupView: IBasePopupView;

	// отображает карточки товаров в галерее.
	renderProducts(products: IProduct[]): void {}

	// обновляет счётчик товаров в корзине.
	updateCartCounter(count: number): void {}

	// устанавливает обработчик клика по иконке корзины.
	bindCartIconClick(handler: () => void): void {}
}
