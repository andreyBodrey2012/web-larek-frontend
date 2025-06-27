import { EventTypes, IBaseView, IEvents, IProduct } from '../types';
import { CDN_URL } from '../utils/constants';
import { fillPriceWithCurrency } from '../utils/utils';

type CardTypeView = 'gallery' | 'popup' | 'cart';
type CardContainersView = Record<CardTypeView, HTMLTemplateElement>;

// Описание вьюшки карточки
export class CardView implements IBaseView {
	constructor(
		eventEmitter: IEvents,
		containers: CardContainersView,
		data: IProduct
	) {
		this.eventEmitter = eventEmitter;
		this.containers = containers;
		this.data = data;
	}

	cardElement: HTMLElement;
	data: IProduct;
	container: HTMLElement;
	containers: CardContainersView;
	eventEmitter: IEvents;

	// создаёт и возвращает HTML-элемент карточки, используя указанный шаблон и данные товара.
	render(type: CardTypeView, position?: number): Node {
		const card = this.containers[type].content.cloneNode(true) as HTMLElement;

		card.querySelector<HTMLElement>('.card__title').innerText = this.data.title;
		card.querySelector<HTMLElement>('.card__price').innerText = this.data.price
			? fillPriceWithCurrency(this.data.price)
			: 'Бесценно';

		if (type !== 'cart') {
			const image = card.querySelector<HTMLImageElement>('.card__image');
			image.src = `${CDN_URL}${this.data.image}`;
			image.alt = this.data.title;
			card.querySelector<HTMLElement>('.card__category').innerText =
				this.data.category;
		}

		switch (type) {
			case 'gallery':
				card
					.querySelector<HTMLElement>('button.card')
					.addEventListener('click', this.bindClick.bind(this));
				break;
			case 'cart':
				card.querySelector<HTMLElement>('.basket__item-index').innerText =
					String(position);
				card
					.querySelector<HTMLButtonElement>('button.card__button')
					.addEventListener('click', this.bindRemoveItem.bind(this));
				break;
			case 'popup':
				card.querySelector<HTMLElement>('.card__text').innerText =
					this.data.description;
				card
					.querySelector<HTMLButtonElement>('button.card__button')
					.addEventListener('click', this.bindClickButton.bind(this));
				break;
		}

		return card;
	}

	// устанавливает обработчик удаления товара из корзины.
	bindRemoveItem(): void {
		this.eventEmitter.emit(EventTypes.ItemRemoved, { productId: this.data.id });
	}

	// устанавливает обработчик для кнопки добавления в корзину.
	bindClickButton(): void {
		this.eventEmitter.emit(EventTypes.ItemClicked, { productId: this.data.id });
	}

	// устанавливает обработчик клика по интерактивному элементу карточки.
	bindClick(): void {
		this.eventEmitter.emit(EventTypes.ItemSelect, { productId: this.data.id });
	}
}
