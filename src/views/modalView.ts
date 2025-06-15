import { IEvents } from "../types";
import { IBaseView } from "../types/views";

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