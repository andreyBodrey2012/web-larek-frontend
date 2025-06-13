export enum EventTypes {
  ItemAdded = 'item:added',
  ItemRemoved = 'item:removed',
  ItemSelect = 'card:select',
  ModalClose = 'modal:close',
  CartSelect = 'cart:select',
  PaymentSelect = 'payment:select',
  NextButtonSelect = 'nextbutton:select',
  EmailSelect = 'email:select',
  NumberSelect = 'number:select',
}

// Типы для событийной системы
export type EventName = string | RegExp;
export type Subscriber = Function;

export type EmitterEvent = {
  eventName: string;
  data: unknown;
};

// Интерфейс брокера событий
export interface IEvents {
  on<T extends object>(event: EventName, callback: (data: T) => void): void;
  emit<T extends object>(event: string, data?: T): void;
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

export class EventEmitter implements IEvents {
    constructor() {}

    on<T extends object>(event: EventName, callback: (data: T) => void): void {
        
    }
    emit<T extends object>(event: string, data?: T): void {
        
    }
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void {
        return (data: T) => {}
    }
}