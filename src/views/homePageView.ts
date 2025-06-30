import {
	EventTypes,
	IBasePopupView,
	IBaseView,
	IEvents,
	IListItemsView,
} from '../types';

// Описание главной страницы
export class HomePageView extends IBaseView {
	constructor(eventEmitter: IEvents, container: HTMLElement) {
		super(eventEmitter, container);

		this.gallery = container.querySelector('.gallery');
		this.cartCounter = container.querySelector('.header__basket-counter');

		container
			.querySelector('button.header__basket')
			.addEventListener('click', this.bindCartIconClick.bind(this));
	}

	cartCounter: HTMLElement;
	gallery: HTMLElement;
	productsContainer: IListItemsView;
	cartIcon: HTMLElement;
	popupView: IBasePopupView;

	// отображает карточки товаров в галерее.
	renderProducts(elements: HTMLElement[]): void {
		this.gallery.replaceChildren(...elements);
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
