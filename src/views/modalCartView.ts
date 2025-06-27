import { EventTypes, IEvents, IProduct } from '../types';
import { fillPriceWithCurrency } from '../utils/utils';
import { CardView } from './cardView';
import { ModalView } from './modalView';

// Описание корзины
export class ModalCartView extends ModalView {
	constructor(eventEmitter: IEvents, container: HTMLElement) {
		super(eventEmitter, container);

		this.products = [];
		this.totalPrice = 0;
	}

	container: HTMLElement;
	containerProductItems: HTMLElement;
	eventEmitter: IEvents;
	totalPriceElement: HTMLElement;
	orderButton: HTMLButtonElement;
	content: HTMLElement;
	totalPrice: number;
	products: IProduct[];

	render(content: HTMLElement): void {

		this.orderButton = content.querySelector<HTMLButtonElement>(
			'button.basket__button'
		);
		this.orderButton.disabled = this.products.length === 0;

    this.orderButton.addEventListener("click", this.bindOrder.bind(this));

		this.totalPriceElement =
			content.querySelector<HTMLElement>('.basket__price');
		this.totalPriceElement.innerText = fillPriceWithCurrency(this.totalPrice);

		this.containerProductItems =
			content.querySelector<HTMLElement>('.basket__list');

		this.containerProductItems.append(
			...this.products.map((item, index) =>
				new CardView(
					this.eventEmitter,
					{
						gallery: document.querySelector('#card-catalog'),
						popup: document.querySelector('#card-preview'),
						cart: document.querySelector('#card-basket'),
					},
					item
				).render('cart', index + 1)
			)
		);

		super.render(content);
	}

	// отображает список товаров в корзине.
	updateCartItems(cartItems: IProduct[], total: number): void {
		this.products = cartItems;
		this.updateTotalPrice(total);
	}

	// обновляет отображение общей стоимости.
	updateTotalPrice(total: number): void {
		this.totalPrice = total;
		if (this.isOpen) {
			this.totalPriceElement.innerText = fillPriceWithCurrency(this.totalPrice);
		}
	}

	// устанавливает обработчик оформления заказа.
	bindOrder(handler: () => void): void {
    this.eventEmitter.emit(EventTypes.orderClicked)
  }
}
