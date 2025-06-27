import './scss/styles.scss';

import { Api, createOrder, getProductList } from './components/base/api';
import {
	AppState,
	EventEmitter,
	EventInputFormData,
	EventTypes,
	IContactsForm,
	IOrder,
	IOrderForm,
	IProduct,
	PaymentTypes,
} from './types';
import { API_URL } from './utils/constants';
import { CardView } from './views/cardView';
import { HomePageView } from './views/homePageView';
import { ModalCartView } from './views/modalCartView';
import { ModalItemView } from './views/modalItemView';
import { OrderSuccessFormView } from './views/orderSuccessFormView';
import { OrderFormView } from './views/orderView';
import { getTemplateElementBySelector, getTotal } from './utils/utils';

const eventEmitter = new EventEmitter();
const api = new Api(API_URL);
const appState: AppState = {
	products: [],
	cartItems: [],
	previewItemId: '',
	orderForm: {
		data: {
			values: {},
			errors: null,
		},
		step: 'order',
	},
};

const modalContainer = document.querySelector<HTMLElement>('#modal-container');

const homePageView = new HomePageView(
	eventEmitter,
	document.querySelector('.page')
);
const popupItemView = new ModalItemView(eventEmitter, modalContainer);
const popupCartItem = new ModalCartView(eventEmitter, modalContainer);
const orderPopup = new OrderFormView(eventEmitter, modalContainer);
const orderSuccessModal = new OrderSuccessFormView(
	eventEmitter,
	modalContainer
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
			).render('popup') as HTMLElement,
			appState.cartItems.includes(product.id)
		);
		popupItemView.open();
	}
);

eventEmitter.on(EventTypes.CartSelect, () => {
	popupCartItem.render(getTemplateElementBySelector('#basket'));
	appState.orderForm.step = 'order';
	popupCartItem.open();
});

eventEmitter.on<{ productId: IProduct['id'] }>(
	EventTypes.ItemClicked,
	({ productId }) => {
		if (appState.cartItems.includes(productId)) {
			appState.cartItems = appState.cartItems.filter((id) => id !== productId);
			popupItemView.updateRender(false);
		} else {
			appState.cartItems.push(productId);
			popupItemView.updateRender(true);
		}
		popupCartItem.updateCartItems(
			appState.products.filter(({ id }) => appState.cartItems.includes(id)),
			getTotal(appState.products, appState.cartItems),
		);
		homePageView.updateCartCounter(appState.cartItems.length);
	}
);

eventEmitter.on<{ productId: IProduct['id'] }>(
	EventTypes.ItemRemoved,
	({ productId }) => {
		if (appState.cartItems.includes(productId)) {
			appState.cartItems = appState.cartItems.filter((id) => id !== productId);
			popupCartItem.updateCartItems(
				appState.products.filter(({ id }) => appState.cartItems.includes(id)),
				getTotal(appState.products, appState.cartItems),
			);
			homePageView.updateCartCounter(appState.cartItems.length);
			popupCartItem.render(getTemplateElementBySelector('#basket'));
		}
	}
);

eventEmitter.on(EventTypes.orderClicked, () => {
	appState.orderForm.data = {
		values: {},
		errors: null,
	};
	orderPopup.render(getTemplateElementBySelector('#order'), appState.orderForm);
	orderPopup.open();
});

eventEmitter.on<{ type: PaymentTypes }>(
	EventTypes.PaymentSelect,
	({ type }) => {
		eventEmitter.emit(EventTypes.InputForm, { name: "payment", value: type });
		orderPopup.updatePaymentType(appState.orderForm);
	}
);

const orderKeys: Array<keyof IOrderForm['values']> = ['payment', 'address'];
const contactsKeys: Array<keyof (IOrderForm['values'] & IContactsForm['values'])> = [...orderKeys, 'email', 'phone'];

eventEmitter.on<
	EventInputFormData<IOrderForm['values'] | IContactsForm['values']>
>(EventTypes.InputForm, ({ name, value }) => {
	appState.orderForm.data.values[name] = value;

	const keysToValidate: Array<keyof (IOrderForm['values'] & IContactsForm['values'])> = 
    appState.orderForm.step === 'contacts' ? contactsKeys : orderKeys;

	// TODO: if failed them add to errors!
	appState.orderForm.data.isValid = keysToValidate.every(
		(name) =>
			name in appState.orderForm.data.values &&
			!!appState.orderForm.data.values[name]
	);

	orderPopup.updateRender(appState.orderForm);
});

eventEmitter.on(EventTypes.ActionButtonClicked, async () => {
	 if(!appState.orderForm.data.isValid) {
		console.error(Error)
		return;
	 }

	 if (appState.orderForm.step === 'order') {
		appState.orderForm.step = 'contacts';
		orderPopup.render(getTemplateElementBySelector('#contacts'), appState.orderForm);
	 } else if (appState.orderForm.step === 'contacts') {
		const res = await createOrder(api, {
			...appState.orderForm.data.values,
			items: appState.cartItems,
			total: getTotal(appState.products, appState.cartItems),
		} as IOrder);
		eventEmitter.emit(EventTypes.orderSuccessClicked);
	 }
})

eventEmitter.on(EventTypes.orderSuccessClicked, () => {
	orderSuccessModal.render(
		getTemplateElementBySelector('#success'),
		getTotal(appState.products, appState.cartItems),
	);
	orderSuccessModal.open();

	appState.cartItems = [];
	popupCartItem.updateCartItems([], 0);
	homePageView.updateCartCounter(appState.cartItems.length);
});

eventEmitter.on(EventTypes.orderSuccessButtonClicked, () => {
	orderSuccessModal.close()
})

const init = async () => {
	const res = await getProductList(api);
	appState.products = res.items;
	homePageView.renderProducts(appState.products);
};

init().catch(console.error);
