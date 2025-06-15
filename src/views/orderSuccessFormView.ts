import { IBaseView, IEvents } from "../types";

// Описание попапа оформления заказа ( ввод электронной почты и номера телефона )
export class OrderSuccessFormView implements IBaseView {
  constructor(eventEmitter: IEvents, container: HTMLElement) {}

	container: HTMLElement;
	eventEmitter: IEvents;
  total: number;
  successButton: HTMLElement;

  // устанавливает обработчик н кнопку закрытия окна.
  bindSuccessButton(handler: () => void): void {}
}
