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
import { App } from './model/app';

const eventEmitter = new EventEmitter();
const api = new Api(API_URL);
const appModel = new App()

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
		appModel.previewItemId = productId;
		const product = appModel.getProductById(productId);

		popupItemView.render(
			new CardView(
				eventEmitter,
				{
					data: product,
					type: 'popup',
				},
			).render() as HTMLElement,
			appModel.hasProductInCart(productId)
		);
		popupItemView.open();
	}
);

eventEmitter.on(EventTypes.CartSelect, () => {
	const elements = appModel.cartProducts.map((item, index) => (new CardView(eventEmitter, { data: item, type: "cart" })).render(index + 1));
	popupCartItem.render(getTemplateElementBySelector('#basket'), elements);
	popupCartItem.open();
});

eventEmitter.on<{ productId: IProduct['id'] }>(
	EventTypes.ItemClicked,
	({ productId }) => {
		appModel.addCartItem(productId)
		popupItemView.updateRender(true);
		popupCartItem.updateCartItems(
			appModel.total,
		);
		homePageView.updateCartCounter(appModel.cartCounter);
	}
);

eventEmitter.on<{ productId: IProduct['id'] }>(
	EventTypes.ItemRemoved,
	({ productId }) => {
		appModel.removeCartItem(productId)
		popupCartItem.updateCartItems(
			appModel.total,
		);
		const elements = appModel.cartProducts.map((item, index) => (new CardView(eventEmitter, { data: item, type: "cart" })).render(index + 1));
		popupCartItem.render(getTemplateElementBySelector('#basket'), elements);
		homePageView.updateCartCounter(appModel.cartCounter);
	}
);

eventEmitter.on(EventTypes.orderClicked, () => {
	appModel.clearOrderForm();
	orderPopup.render(getTemplateElementBySelector('#order'), appModel.orderForm);
	orderPopup.open();
});

eventEmitter.on<{ type: PaymentTypes }>(
	EventTypes.PaymentSelect,
	({ type }) => {
		eventEmitter.emit(EventTypes.InputForm, { name: 'payment', value: type });
		orderPopup.updatePaymentType(appModel.orderForm);
	}
);

const orderKeys: Array<keyof IOrderForm['values']> = ['payment', 'address'];
const contactsKeys: Array<
	keyof (IOrderForm['values'] & IContactsForm['values'])
> = [...orderKeys, 'email', 'phone'];

eventEmitter.on<
	EventInputFormData<IOrderForm['values'] | IContactsForm['values']>
>(EventTypes.InputForm, (data) => {
	appModel.orderFormValue = data;

	const keysToValidate: Array<
		keyof (IOrderForm['values'] & IContactsForm['values'])
	> = appModel.orderStep === 'contacts' ? contactsKeys : orderKeys;

	// TODO: if failed them add to errors!
	appModel.orderForm.data.isValid = keysToValidate.every(
		(name) =>
			name in appModel.orderForm.data.values &&
			!!appModel.orderForm.data.values[name]
	);

	orderPopup.updateRender(appModel.orderForm);
});

eventEmitter.on(EventTypes.ActionButtonClicked, async () => {
	if (!appModel.orderForm.data.isValid) {
		console.error(Error);
		return;
	}

	if (appModel.orderStep === 'order') {
		appModel.orderStep = 'contacts';
		orderPopup.render(
			getTemplateElementBySelector('#contacts'),
			appModel.orderForm
		);
	} else if (appModel.orderStep === 'contacts') {
		try {
			await createOrder(api, {
				...appModel.orderForm.data.values,
				items: appModel.cartItems,
				total: appModel.total,
			} as IOrder);
			eventEmitter.emit(EventTypes.orderSuccessClicked);
		} catch (error) {
			console.error('Ошибка:', error);
		}
	}
});

eventEmitter.on(EventTypes.orderSuccessClicked, () => {
	orderSuccessModal.render(
		getTemplateElementBySelector('#success'),
		appModel.total,
	);
	orderSuccessModal.open();

	appModel.clearCartItems();
	popupCartItem.updateCartItems(0);
	homePageView.updateCartCounter(appModel.cartCounter);
});

eventEmitter.on(EventTypes.orderSuccessButtonClicked, () => {
	orderSuccessModal.close();
});

eventEmitter.on<{ items: IProduct[] }>(EventTypes.ItemsChange, ({ items }) => {
	appModel.products = items
	const elements = appModel.products.map((item) => (new CardView(eventEmitter, { data: item, type: "gallery" })).render());
	homePageView.renderProducts(elements);
})

const init = async () => {
	try {
		const res = await getProductList(api);
		eventEmitter.emit(EventTypes.ItemsChange, { items: res.items });
	} catch(err) {
		console.error(err)
		eventEmitter.emit(EventTypes.ItemsChange, []);
	}	
};

init().catch(console.error);
