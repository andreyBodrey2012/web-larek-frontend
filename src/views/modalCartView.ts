import { EventTypes, IEvents } from '../types';
import { fillPriceWithCurrency } from '../utils/utils';
import { CardView } from './cardView';
import { ModalView } from './modalView';

// Описание корзины
export class ModalCartView extends ModalView {
	constructor(eventEmitter: IEvents, container: HTMLElement) {
		super(eventEmitter, container);

		this.totalPrice = 0;
	}

	container: HTMLElement;
	containerProductItems: HTMLElement;
	eventEmitter: IEvents;
	totalPriceElement: HTMLElement;
	orderButton: HTMLButtonElement;
	content: HTMLElement;
	totalPrice: number;

	render(content: HTMLElement, cartItems?: HTMLElement[]): void {
		this.orderButton = content.querySelector<HTMLButtonElement>(
			'button.basket__button'
		);
		this.orderButton.disabled = cartItems?.length === 0;

		this.orderButton.addEventListener('click', this.bindOrder.bind(this));

		this.totalPriceElement =
			content.querySelector<HTMLElement>('.basket__price');
		this.totalPriceElement.innerText = fillPriceWithCurrency(this.totalPrice);

		this.containerProductItems =
			content.querySelector<HTMLElement>('.basket__list');

		this.containerProductItems.replaceChildren(
			...cartItems,
			// ...this.products.map((item, index) =>
			// 	new CardView(this.eventEmitter, {
			// 		type: 'cart',
			// 		data: item,
			// 	}).render(index + 1)
			// )
		);

		super.render(content);
	}

	// отображает список товаров в корзине.
	// updateCartItems(cartItems: HTMLElement[], total: number): void {
	updateCartItems(total: number): void {
		this.updateTotalPrice(total);
	}

	// обновляет отображение общей стоимости.
	updateTotalPrice(total: number): void {
		this.totalPrice = total;
		if (this.isOpen) {
			super.setText(this.totalPriceElement, fillPriceWithCurrency(this.totalPrice))
		}
	}

	// устанавливает обработчик оформления заказа.
	bindOrder(): void {
		this.eventEmitter.emit(EventTypes.orderClicked);
	}
}
