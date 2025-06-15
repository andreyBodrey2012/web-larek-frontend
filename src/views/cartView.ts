import { IBaseView, IEvents, IProduct } from "../types";

// Описание корзины
export class CartView implements IBaseView {
  constructor(eventEmitter: IEvents, container: HTMLElement) {}

  container: HTMLElement;
  eventEmitter: IEvents;
  totalPriceElement: HTMLElement;
  orderButton: HTMLElement;

  // отображает список товаров в корзине.
  renderCartItems(cartItems: IProduct[]): void {}

  // обновляет отображение общей стоимости.
  updateTotalPrice(total: number): void {}

  // устанавливает обработчик оформления заказа.
  bindOrder(handler: () => void): void {}
}