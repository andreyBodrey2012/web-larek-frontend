import {
	EventTypes,
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
		this.cartCounter = container.querySelector('.header__basket-counter');

		container.querySelector('button.header__basket').addEventListener("click", this.bindCartIconClick.bind(this));
	}

	container: HTMLElement;
	eventEmitter: IEvents;
	cartCounter: HTMLElement;
	gallery: HTMLElement;
	productsContainer: IListItemsView;
	cartIcon: HTMLElement;
	popupView: IBasePopupView;

	// отображает карточки товаров в галерее.
	renderProducts(products: IProduct[]): void {
        this.gallery.append(...products.map((item) => (new CardView(this.eventEmitter, {gallery: document.querySelector('#card-catalog'), popup: document.querySelector('.card'), cart: document.querySelector('.card')}, item)).render("gallery")))
    }

	// обновляет счётчик товаров в корзине.
	updateCartCounter(count: number): void {
		this.cartCounter.innerText = String(count);
	}

	// устанавливает обработчик клика по иконке корзины.
	bindCartIconClick(): void {
		this.eventEmitter.emit(EventTypes.CartSelect);
	}
}
