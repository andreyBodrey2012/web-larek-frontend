import { AppState, EventInputFormData, IContactsForm, IOrderForm, IProduct, OrderStepTypes } from "../types";

export class App extends AppState {
    constructor() {
        super();
        this._products = [];
        this._cartItems = [];
        this._previewItemId = null;
        this._orderForm = { data: null, step: "order" };
        this._total = 0;
    }
    protected _products: Array<IProduct>;
    protected _cartItems: Array<IProduct['id']>;
    protected _previewItemId: IProduct['id'] | null;
    protected _orderForm: {
		data: IOrderForm & IContactsForm | null;
		step: OrderStepTypes;
	};
    protected _total: number;
    
    set products(products: IProduct[]) {
        this._products = products;
    }
    get products(): IProduct[] {
        return this._products;
    }
    get total(): number {
        return this._total;
    }
    get cartItems(): Array<IProduct['id']> {
        return this._cartItems;
    }
    get cartProducts(): IProduct[] {
        return this._products.filter(({ id }) => this._cartItems.includes(id))
    }
    get cartCounter(): number {
        return this._cartItems.length
    }
    set orderStep(step: OrderStepTypes) {
        this._orderForm.step = step
    }
    get orderStep(): OrderStepTypes {
        return this._orderForm.step
    }
    get orderForm() {
        return this._orderForm;
    }
    set orderFormValue({ name, value }: EventInputFormData<IOrderForm['values'] | IContactsForm['values']>) {
        this._orderForm.data.values[name] = value;
    }
    set previewItemId(id: IProduct['id'] | null) {
        this._previewItemId = id;
    }
    get previewItemId(): IProduct['id'] | null {
        return this._previewItemId
    }

    protected _upateTotal() {
        this._total = this._products
        .filter(({ id }) => this._cartItems.includes(id))
        .reduce((acc, { price }) => acc + price, 0);
    }

    addCartItem(id: IProduct["id"]) {
        if (this._cartItems.includes(id)) return;

        this._cartItems.push(id);
        this._upateTotal();
    }
    removeCartItem(id: IProduct["id"]) {
        this._cartItems = this._cartItems.filter((v) => v !== id)
        this._upateTotal();
    }
    clearCartItems() {
        this._cartItems = [];
        this._upateTotal();
    }
    clearOrderForm() {
        this._orderForm = { data: { values: {}, errors: null }, step: "order" };
    }
    hasProductInCart(id: IProduct["id"]): boolean {
        return this._cartItems.includes(id);
    }
    getProductById(productId: IProduct["id"]): IProduct | undefined {
        return this._products.find(({ id }) => id === productId)
    }
}