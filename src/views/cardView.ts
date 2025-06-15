import { IBaseView, IEvents, IProduct } from "../types";

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

  // устанавливает обработчик удаления товара из корзины.
  bindRemoveItem(handler: (productId: string) => void): void {}

  // устанавливает обработчик клика по интерактивному элементу карточки.
  bindClick(handler: (productId: string) => void): void {}
}