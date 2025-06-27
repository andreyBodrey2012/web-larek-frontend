import { EventTypes, IEvents } from '../types';
import { ModalView } from './modalView';

// Описание попапа оформленого попапа
export class OrderSuccessFormView extends ModalView {
	constructor(eventEmitter: IEvents, container: HTMLElement) {
		super(eventEmitter, container);
	}

	totalPrice: number;
	content: HTMLElement;
	successButton: HTMLElement;

	render(content: HTMLElement, totalPrice?: number): void {
    content.querySelector<HTMLElement>(".order-success__description").innerText = totalPrice ? `Списано ${totalPrice} синапсов` : "Списано 0 синапсов";
    content.querySelector<HTMLButtonElement>("button.order-success__close").addEventListener("click", this.bindSuccessButton.bind(this));

    super.render(content);
  }
	// устанавливает обработчик на кнопку закрытия окна.
	bindSuccessButton(): void {
    this.eventEmitter.emit(EventTypes.orderSuccessButtonClicked);
  }
}
