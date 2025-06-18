import { Api, getProductList } from './components/base/api';
import './scss/styles.scss';
import {
	AppState,
	EventEmitter,
	EventTypes,
	IProduct,
	openPopup,
	IPopupItemView,
} from './types';
import { CardView } from './views/cardView';
import { HomePageView } from './views/homePageView';
import { ModalItemView } from './views/modalItemView';
import { ModalView } from './views/modalView';

const eventEmitter = new EventEmitter();
const api = new Api(process.env.API_ORIGIN);
const appState: AppState = {
	products: [],
	cartItems: [],
	previewItemId: '',
};

const homePageView = new HomePageView(
	eventEmitter,
	document.querySelector('.page')
);
// const modalView = new ModalView(eventEmitter, document.querySelector('#modal-container'));
const popupItemView = new ModalItemView(
	eventEmitter,
	document.querySelector('#modal-container')
);

eventEmitter.on<{ productId: IProduct['id'] }>(
	EventTypes.ItemSelect,
	({ productId }) => {
		appState.previewItemId = productId;
		const product = appState.products.find(({ id }) => id === productId);

		popupItemView.render(
			new CardView(
				eventEmitter,
				{
					gallery: document.querySelector('#card-catalog'),
					popup: document.querySelector('#card-preview'),
					cart: document.querySelector('.card'),
				},
				product
			).render('popup') as HTMLElement
		);
		popupItemView.open();

		document.querySelector('.card__button').addEventListener('click', () => {
			if (!appState.cartItems.includes(productId)) {
				appState.cartItems.push(productId);
				homePageView.updateCartCounter(appState.cartItems.length);
			}// Я не сдам этот проект, точно не сдам.
		});
	}
);

const popupCartItem = new ModalItemView(eventEmitter, document.querySelector('#modal-container'))

eventEmitter.on(EventTypes.CartSelect, () => {
  
  popupCartItem.open();
});
eventEmitter.on<{ productId: IProduct['id'] }>(
	EventTypes.ItemAdded,
	({ productId }) => {
		if (!appState.cartItems.includes(productId)) {
			appState.cartItems.push(productId);
			homePageView.updateCartCounter(appState.cartItems.length);
		}
	}
);

const init = async () => {
	const res = await getProductList(api);
	appState.products = res.items;
	homePageView.renderProducts(appState.products);
};

init().catch(console.error);
