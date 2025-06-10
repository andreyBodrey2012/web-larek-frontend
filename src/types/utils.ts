export type SelectorCollection<T> = string | NodeListOf<Element> | T[];

export type SelectorElement<T> = T | string;

export type PropertyFilter = (name: string, prop: PropertyDescriptor) => boolean;

export type DatasetScheme = Record<string, Function>;

export type Props<T extends HTMLElement> = Partial<Record<keyof T, string | boolean | object>>;