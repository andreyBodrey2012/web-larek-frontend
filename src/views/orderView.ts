import { IBaseView, IEvents, IOrderForm } from "../types";

// Описание попапа оформления заказа ( выбор способа оплаты и указание адреса доставки )
export class OrderFormView implements IBaseView {
  constructor(eventEmitter: IEvents, container: HTMLElement) {}

  formData: IOrderForm;
	container: HTMLElement;
	eventEmitter: IEvents;
  paymentMethodButton: HTMLElement;
  address: HTMLElement;
  nextButton: HTMLElement;
  email: HTMLElement;
  numberPhone: HTMLElement;
  orderButton: HTMLElement;

  // устанавливает обработчик на кнопки выбора способа оплаты.
  bindPayment(handler: () => void): void {}

  // устанавливает обработчик на кнопку перевода на следующий попап оформления.
  bindNextButton(handler: () => void): void {}

  // устанавливает обработчик для поля ввода элетронной почты.
  bindEmail(handler: () => void): void {}

  // устанавливает обработчик для поля ввода номер телефона.
  bindNumber(handler: () => void): void {}

  // устанавливает обработчик для кнопкм оформления заказа.
  bindOrder(handler: () => void): void {}

}