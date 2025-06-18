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
export abstract class IEvents {
	constructor() {}

	abstract callbacks: {
		[key in EventTypes]?: Array<Function>;
	};

	abstract on<T extends object>(
		event: EventTypes,
		callback: (data: T) => void
	): void;

	abstract emit<T extends object>(event: EventTypes, data?: T): void;

	abstract trigger<T extends object>(
		event: EventTypes,
		context?: Partial<T>
	): (data: T) => void;
}

export class EventEmitter extends IEvents {
	constructor() {
		super();

    this.callbacks = {};
	}

	callbacks: {
    [key in EventTypes]?: Array<Function>
  };

	on<T extends object>(event: EventTypes, callback: (data: T) => void): void {
    if (event in this.callbacks) {
      this.callbacks[event].push(callback)
    } else {
      this.callbacks[event] = [callback]
    }
  }

	emit<T extends object>(event: EventTypes, data?: T): void {
    if (event in this.callbacks) {
      this.callbacks[event].forEach((cb) => {
        cb(data);
      })
    }
  }
	trigger<T extends object>(
		event: EventTypes,
		context?: Partial<T>
	): (data: T) => void {
		return (data: T) => {};
	}
}
