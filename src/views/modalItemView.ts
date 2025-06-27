import { IEvents, IProduct } from '../types';
import { ModalView } from './modalView';

export class ModalItemView extends ModalView {
	constructor(eventEmitter: IEvents, container: HTMLElement) {
		super(eventEmitter, container);
	}
	item: IProduct;
	isOpen: boolean;
	container: HTMLElement;
	eventEmitter: IEvents;
	isAddedOnCart: boolean;

	render(content: HTMLElement, isAddedOnCart?: boolean) {
		super.render(content);
		this.updateRender(isAddedOnCart);
	}

	updateRender(isAddedOnCart: boolean): void {
		this.isAddedOnCart = isAddedOnCart;
		this.content.querySelector<HTMLElement>('button.card__button').innerText =
			isAddedOnCart ? 'Убрать' : 'Добавить';
	}
}
