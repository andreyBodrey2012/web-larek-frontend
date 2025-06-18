import { EventTypes, IBaseView, IEvents, IProduct } from '../types';

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
	render(type: CardTypeView): Node {
		const card = this.containers[type].content.cloneNode(true) as HTMLElement;

		card.querySelector<HTMLElement>('.card__title').innerText = this.data.title;
		card.querySelector<HTMLElement>('.card__category').innerText =
			this.data.category;
		card.querySelector<HTMLElement>('.card__price').innerText = this.data.price
			? `${this.data.price} синапсов`
			: 'Бесценно';

		if (type !== 'cart') {
			const image = card.querySelector<HTMLImageElement>('.card__image');
			image.src = `/products${this.data.image}`;
			image.alt = this.data.title;
		}

		switch (type) {
			case 'gallery':
				card
					.querySelector<HTMLElement>('button.card')
					.addEventListener('click', () => {
						this.bindClick(this.data.id);
					});
				break;
			case 'cart':
				// TODO:
				break;
			case 'popup':
				card.querySelector<HTMLElement>('.card__text').innerText =
					this.data.description;
				break;
		}

		return card;
	}

	// устанавливает обработчик удаления товара из корзины.
	bindRemoveItem(productId: string): void {
		this.eventEmitter.emit(EventTypes.ItemRemoved, { productId });
	}

	// устанавливает обработчик клика по интерактивному элементу карточки.
	bindClick(productId: string): void {
		this.eventEmitter.emit(EventTypes.ItemSelect, { productId });
	}
}
