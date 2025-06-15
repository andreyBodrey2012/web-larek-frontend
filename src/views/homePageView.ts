import {
	IBasePopupView,
	IBaseView,
	ICartWidgetView,
	IEvents,
	IListItemsView,
	IProduct,
} from '../types';
import { CardView } from './cardView';

// Описание главной страницы
export class HomePageView implements IBaseView {
	constructor(eventEmitter: IEvents, container: HTMLElement) {
		this.eventEmitter = eventEmitter;
		this.container = container;

		this.gallery = container.querySelector('.gallery');
	}

	container: HTMLElement;
	eventEmitter: IEvents;
	cartCounter: ICartWidgetView;
	gallery: HTMLElement;
	productsContainer: IListItemsView;
	cartIcon: HTMLElement;
	popupView: IBasePopupView;

	// отображает карточки товаров в галерее.
	renderProducts(products: IProduct[]): void {
        this.gallery.append(...products.map((item) => (new CardView(this.eventEmitter, {gallery: document.querySelector('#card-catalog'), popup: document.querySelector('.card'), cart: document.querySelector('.card')}, item)).render("gallery")))
    }

	// обновляет счётчик товаров в корзине.
	updateCartCounter(count: number): void {}

	// устанавливает обработчик клика по иконке корзины.
	bindCartIconClick(handler: () => void): void {}
}
