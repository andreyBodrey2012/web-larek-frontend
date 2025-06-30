import { EventTypes, IBaseView, IEvents, IProduct } from '../types';
import { CDN_URL } from '../utils/constants';
import { fillPriceWithCurrency } from '../utils/utils';

type CardTypeView = 'gallery' | 'popup' | 'cart';
type CardContainersView = Record<CardTypeView, HTMLTemplateElement>;
type CardCategoryColors = Record<string, string>;

// Описание вьюшки карточки
export class CardView extends IBaseView {
	constructor(
		eventEmitter: IEvents,
		{ type, data }: { type: CardTypeView; data: IProduct }
	) {
		super(eventEmitter, CardView.getContainerByType(type));		
		this.cardType = type;
		this.data = data;
	}

	data: IProduct;
	container: HTMLElement;
	eventEmitter: IEvents;
	cardType: CardTypeView;

	protected categoryColors: CardCategoryColors = {
		'софт-скил': 'soft',
		другое: 'other',
		кнопка: 'button',
		'хард-скил': 'hard',
		дополнительное: 'additional',
	};

	static containerViewByType: CardContainersView = {
		cart: document.querySelector('#card-basket'),
		gallery: document.querySelector('#card-catalog'),
		popup: document.querySelector('#card-preview'),
	};
	static getContainerByType(type: CardTypeView): HTMLElement {
		return CardView.containerViewByType[type].content.cloneNode(true) as HTMLElement;
	}

	set category(value: string) {
		const category =
			this.container.querySelector<HTMLElement>('.card__category');

		if (category) {
			super.setText(category, value);
			const categoryColorClassName = `card__category_${
				value in this.categoryColors ? this.categoryColors[value] : 'additional'
			}`;
			category.classList.add(categoryColorClassName);
		}
	}

	

	// создаёт и возвращает HTML-элемент карточки, используя указанный шаблон и данные товара.
	render(position?: number): HTMLElement {
		const card = this.container;

		super.setText(
			card.querySelector<HTMLElement>('.card__title'),
			this.data.title
		);
		super.setText(
			card.querySelector<HTMLElement>('.card__price'),
			this.data.price ? fillPriceWithCurrency(this.data.price) : 'Бесценно'
		);

		if (this.cardType !== 'cart') {
			const image = card.querySelector<HTMLImageElement>('.card__image');
			image.src = `${CDN_URL}${this.data.image}`;
			image.alt = this.data.title;
			this.category = this.data.category;
		}

		switch (this.cardType) {
			case 'gallery':
				card
					.querySelector<HTMLElement>('button.card')
					.addEventListener('click', this.bindClick.bind(this));
				break;
			case 'cart':
				super.setText(
					card.querySelector<HTMLElement>('.basket__item-index'),
					String(position)
				);
				card
					.querySelector<HTMLButtonElement>('button.card__button')
					.addEventListener('click', this.bindRemoveItem.bind(this));
				break;
			case 'popup':
				super.setText(
					card.querySelector<HTMLElement>('.card__text'),
					this.data.description
				);
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
