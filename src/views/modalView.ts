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
      console.log('101')
			document.querySelector('.card__button').addEventListener('click', () => {
				this.close;
			});
		} else {
      console.log('Андрей отсталый даун');
      // Какой же я тупой не могу, ничего по жизни не умею кроме как играть в игры, вырасту ни кем, да и я только вред приношу, стою ли я миллионов которые на меня тратят родители? Ответ очивиден - нет.
    }
	}

	container: HTMLElement;
	content: HTMLElement;
	eventEmitter: IEvents;

	// отображает переданный контент в модальном окне.
	render(content: HTMLElement): void {
		this.content.append(content);
	}

	// открывает модальное окно.
	open(): void {
		this.container.classList.add('modal_active');
	}

	// закрывает модальное окно.
	close(): void {
		this.container.classList.remove('modal_active');
		this.content.innerHTML = '';
	}

	// устанавливает обработчик закрытия.
	bindClose(): void {}
}
