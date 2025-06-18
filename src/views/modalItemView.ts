import {IEvents, IPopupItemView, IProduct } from '../types'
import { ModalView } from './modalView';

export class ModalItemView extends ModalView {
    constructor(eventEmitter: IEvents, container: HTMLElement) {
        super(eventEmitter, container)
    }
    item: IProduct;
    isOpen: boolean;
    container: HTMLElement;
    eventEmitter: IEvents;
    
    addItemToCart: (evt: Event, id: IProduct['id']) => void;
}