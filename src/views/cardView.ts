import { IBaseView, IEvents, IProduct } from "../types";

type CardTypeView = 'gallery' | 'popup' | 'cart';
type CardContainersView = Record<CardTypeView, HTMLTemplateElement>;


// Описание вьюшки карточки
export class CardView implements IBaseView {
  constructor(eventEmitter: IEvents, containers: CardContainersView, data: IProduct) {
    this.eventEmitter = eventEmitter;
    this.containers = containers;
    this.data = data;
  }

  cardElement: HTMLElement;
  data: IProduct;
  container: HTMLElement;
  containers: CardContainersView;
  eventEmitter: IEvents;

  // создаёт и возвращает HTML-элемент карточки, используя указанный шаблон и данные товара.
  render(type: CardTypeView): Node {
    const card = this.containers[type].content.cloneNode(true) as HTMLElement;
    card.querySelector<HTMLElement>(".card__title").innerText = this.data.title;
    card.querySelector<HTMLElement>(".card__category").innerText = this.data.category;
    // card.querySelector<HTMLElement>(".card__price").innerText = this.data.price;
    return card;
  }

  // устанавливает обработчик удаления товара из корзины.
  bindRemoveItem(handler: (productId: string) => void): void {}

  // устанавливает обработчик клика по интерактивному элементу карточки.
  bindClick(handler: (productId: string) => void): void {}
}