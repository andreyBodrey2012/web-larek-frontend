import {
	EventTypes,
	IEvents,
	IOrderForm,
	OrderStepTypes,
	PaymentTypes,
	RenderOrderData,
} from '../types';
import { ModalView } from './modalView';

// Описание попапа оформления заказа
export class OrderFormView extends ModalView {
	paymentButton: any;
	paymentButtonOnline: any;
	paymentButtonOnPlace: any;
	inputAddress: Element;
	inputEmail: any;
	inputPhone: any;
	ordersuccessButton: any;
	constructor(eventEmitter: IEvents, container: HTMLElement) {
		super(eventEmitter, container);
	}

	formData: IOrderForm;
	formStep: OrderStepTypes;
	container: HTMLElement;
	eventEmitter: IEvents;
	paymentMethodButton: HTMLElement;
	address: HTMLElement;
	email: HTMLElement;
	numberPhone: HTMLElement;
	orderButton: HTMLElement;
	actionButton: HTMLButtonElement;

	render(content: HTMLElement, dataOrder?: RenderOrderData): void {
		this.actionButton = content.querySelector(
			'.modal__actions > button[type=submit]'
		);
		if (this.actionButton) {
			this.actionButton.addEventListener(
				'click',
				this.bindActionButton.bind(this)
			);
		}

		if (dataOrder.step === 'order') {
			this.paymentButtonOnline = content.querySelector('button[name=card]');
			if (this.paymentButtonOnline) {
				this.paymentButtonOnline.addEventListener('click', () => {
					this.bindPayment('online');
				});
			}

			this.paymentButtonOnPlace = content.querySelector('button[name=cash]');
			if (this.paymentButtonOnPlace) {
				this.paymentButtonOnPlace.addEventListener('click', () => {
					this.bindPayment('cash');
				});
			}

			this.inputAddress = content.querySelector('input[name=address]');
			if (this.inputAddress) {
				this.inputAddress.addEventListener('input', this.bindInput.bind(this));
			}
		} else if (dataOrder.step === 'contacts') {
			this.inputEmail = content.querySelector('input[name=email]');
			if (this.inputEmail) {
				this.inputEmail.addEventListener('input', this.bindInput.bind(this));
			}

			this.inputPhone = content.querySelector('input[name=phone]');
			if (this.inputPhone) {
				this.inputPhone.addEventListener('input', this.bindInput.bind(this));
			}
		}

		super.render(content);
	}

	updateRender(dataOrder: RenderOrderData) {
		this.actionButton.disabled = !dataOrder.data.isValid;
	}

  // добавляет для кнопок выбора оплаты активный класс.
	updatePaymentType(dataOrder: RenderOrderData) {
		if ('payment' in dataOrder.data.values) {
			const activeButtonClassName = 'button_alt-active';
			const type = dataOrder.data.values.payment;
			const activeButton =
				type === 'online'
					? this.paymentButtonOnline
					: this.paymentButtonOnPlace;
			const deactiveButton =
				type === 'online'
					? this.paymentButtonOnPlace
					: this.paymentButtonOnline;

			activeButton.classList.add(activeButtonClassName);
			deactiveButton.classList.remove(activeButtonClassName);
		}

		this.updateRender(dataOrder);
	}

  // обнуляет знаение полей форм.
	updateField(name: string, value: string) {
		const element = this.content.querySelector<HTMLInputElement>(
			`input[name=${name}]`
		);
		if (!element) return;

		element.value = value;
	}

	// устанавливает обработчик на кнопки выбора способа оплаты.
	bindPayment(type: PaymentTypes): void {
		this.eventEmitter.emit(EventTypes.PaymentSelect, { type });
	}
  
  // устанавливает обработчик на формы.
	bindInput(evt: InputEvent): void {
		const element = evt.target as HTMLInputElement;
		this.eventEmitter.emit(EventTypes.InputForm, {
			name: element.name,
			value: element.value,
		});
	}

	// устанавливает обработчик на кнопку перевода на следующий попап оформления.
	bindActionButton(evt: Event): void {
    evt.stopPropagation();
    evt.preventDefault();

		this.eventEmitter.emit(EventTypes.ActionButtonClicked);
	}
}
