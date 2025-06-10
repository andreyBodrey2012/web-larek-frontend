// Конкретные события приложения
export enum EventTypes {
  UserLoggedIn = 'user:loggedIn',
  UserLoggedOut = 'user:loggedOut',
  ItemAdded = 'item:added',
  ItemRemoved = 'item:removed',
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