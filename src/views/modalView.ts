import { IEvents } from '../types';
import { IBaseView } from '../types/views';

// Описание модального окна
export class ModalView implements IBaseView {
	constructor(eventEmitter: IEvents, container: HTMLElement) {
		this.eventEmitter = eventEmitter;
		this.container = container;
		this.content = container.querySelector('.modal__content');

		container
			.querySelector('button.modal__close')
			.addEventListener('click', this.close.bind(this));

		container.addEventListener('click', (evt: Event) => {
			if (evt.target === container) {
				this.close();
			}
		});
		document.addEventListener('keydown', (evt: KeyboardEvent) => {
			if (evt.code === 'Escape') {
				this.close();
			}
		});
		if (container.querySelector('.card__button') !== null) {
			document.querySelector('.card__button').addEventListener('click', () => {
				this.close;
			});
		}
		
	}

	container: HTMLElement;
	content: HTMLElement;
	eventEmitter: IEvents;
	isOpen: boolean;

	// отображает переданный контент в модальном окне.
	render(content: HTMLElement): void {
		this.content.innerHTML = "";
		this.content.append(content);
	}

	// открывает модальное окно.
	open(): void {
		this.container.classList.add('modal_active');
		this.isOpen = true;
	}

	// закрывает модальное окно.
	close(): void {
		this.container.classList.remove('modal_active');
		this.content.innerHTML = '';
		this.isOpen = false;
	}

	// устанавливает обработчик закрытия.
	bindClose(): void {}
}
