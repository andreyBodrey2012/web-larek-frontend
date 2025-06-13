import { IEvents } from './events';
import { IOrder, IOrderForm, IProduct } from './models';

class IBaseView {
  constructor(eventEmitter: IEvents, container: HTMLElement) {}

	container: HTMLElement;
	eventEmitter: IEvents;
}

interface IBasePopupView extends IBaseView {
	isOpen: boolean;
	render: (content: HTMLElement) => void;
	open: () => {};
	close: () => {};
}

// Описание списка продуктов
export interface IListItemsView extends IBaseView {
	items: Array<ItemView>;
}

// Описание продукта
export interface ItemView extends IBaseView {
	item: IProduct;
	// Открывает попап продукта
	onClick: (evt: Event, id: IProduct['id']) => void;
}

// Описание попапа продукта
export interface IPopupItemView extends IBasePopupView {
	item: IProduct;
	// Добавляет предмет в корзину
	addItemToCart: (evt: Event, id: IProduct['id']) => void;
}

// Описание попапа корзины
export interface IPopupCartView extends IBasePopupView {
	items: Array<IProduct>;
	// Удаляет предмет из корзины
	deleteItemFromCart: (evt: Event, id: IProduct['id']) => void;
}

// Описание виджета корзины
export interface ICartWidgetView extends IBaseView {
	count: number;
	// Метод открывает попапа корзины
	onClick: (evt: Event) => void;
}

// Описание главной страницы
export class HomePageView implements IBaseView {
	constructor(eventEmitter: IEvents, container: HTMLElement) {}

	container: HTMLElement;
	eventEmitter: IEvents;
	cartCounter: ICartWidgetView;
	productsContainer: IListItemsView;
  cartIcon: HTMLElement;
	popupView: IBasePopupView;

  // отображает карточки товаров в галерее.
  renderProducts(products: IProduct[]): void {}

  // обновляет счётчик товаров в корзине.
  updateCartCounter(count: number): void {}

  // устанавливает обработчик клика по карточке товара.
  bindProductClick(handler: (productId: string) => void): void {}

  // устанавливает обработчик клика по иконке корзины.
  bindCartIconClick(handler: () => void): void {}
}

// Описание модального окна
export class ModalView implements IBaseView {
  constructor(eventEmitter: IEvents, container: HTMLElement) {}

  container: HTMLElement;
  eventEmitter: IEvents;

  // отображает переданный контент в модальном окне.
  render(content: HTMLElement): void {}

  // открывает модальное окно.
  open(): void{}

  // закрывает модальное окно.
  close(): void {}

  // устанавливает обработчик закрытия.
  bindClose(handler: () => void): void {}
}

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

  // устанавливает обработчик удаления товара из корзины.
  bindRemoveItem(handler: (productId: string) => void): void {}

  // устанавливает обработчик оформления заказа.
  bindOrder(handler: () => void): void {}
}

type CardTypeView = 'gallery' | 'popup' | 'cart';
type CardContainersView = Record<CardTypeView, HTMLElement>;


// Описание вьюшки карточки
export class CardView implements IBaseView {
  constructor(eventEmitter: IEvents, containers: CardContainersView, data: IProduct) {}

  cardElement: HTMLElement;
  data: IProduct;
  container: HTMLElement;
  containers: CardContainersView;
  eventEmitter: IEvents;

  // создаёт и возвращает HTML-элемент карточки, используя указанный шаблон и данные товара.
  render(type: CardTypeView): void {}

  // устанавливает обработчик клика по карточке.
  bindClick(handler: (productId: string) => void): void {}
}

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
