https://github.com/andreyBodrey2012/web-larek-frontend

# Проектная работа "Веб-ларек"

## Стек технологий

- HTML
- SCSS
- TypeScript
- Webpack

## Структура проекта

- `src/` — исходные файлы проекта
- `src/components/` — папка с JS-компонентами
- `src/components/base/` — папка с базовым кодом

## Важные файлы

- `src/pages/index.html` — HTML-файл главной страницы
- `src/types/index.ts` — файл с типами
- `src/index.ts` — точка входа приложения
- `src/scss/styles.scss` — корневой файл стилей
- `src/utils/constants.ts` — файл с константами
- `src/utils/utils.ts` — файл с утилитами

## Архитектура проекта

**Проект построен по принципу разделения ответственности и модульности.** Основные части:

- **Модели данных** — описывают типы данных, получаемых из API, и внутренних структур.
- **Отображения (Views)** — компоненты, отвечающие за визуальное представление данных.
- **API-клиент** — модуль для взаимодействия с сервером по HTTP.
- **Брокер событий (EventEmitter)** — обеспечивает коммуникацию между компонентами через события.
- **Утилиты и константы** — вспомогательные функции и значения, используемые по всему приложению.

**Взаимодействие компонентов происходит через события, что обеспечивает изолированность и масштабируемость.**

## Описание основных компонентов

- **EventEmitter** — класс для работы с событиями. Позволяет добавлять и удалять слушателей, а также вызывать их при возникновении событий.
- **APIClient** — отвечает за запросы к серверу. Использует универсальные методы `get` и `post` с типизацией.
- **Компоненты отображения** — отвечают за рендеринг UI и обработку пользовательских действий.
- **Модели** — описывают структуру данных, получаемых из API и преобразуемых для отображения.

## Слой Model

- **Класс AppState** - хранит и управляет состоянием приложения — список товаров для галереи, корзину и текущее выбранное превью.

## Поля:

- **products: Array<IProduct>** — массив объектов товаров для галереи (тип IProduct описывает свойства товара).
- **cartItems: Array<IProduct['id']>** — массив товаров, добавленных в корзину.
- **previewItemId: IProduct['id'] | null** — выбранный товар для показа в модальном окне (или null если ничего не выбрано).
- **orderForm: {data: IOrderForm & IContactsForm | null; step: OrderStepTypes}** - данные форм офрмления заказа и этапы офрмления.

## Методы:

- **addToCart(productId: string): void** — добавляет товар с указанным productId в корзину.
- **removeFromCart(productId: string): void** — удаляет товар из корзины по productId.
- **setPreview(productId: string | null): void** — устанавливает текущий товар для превью (или сбрасывает).
- **clearCart(): void** — очищает корзину.
- **getCartCount(): number** — возвращает количество товаров в корзине.
- **getCartTotal(): number** — рассчитывает и возвращает общую стоимость товаров в корзине.

## Конструктор:

(eventEmitter: EventEmitter)

## Слой View

## Общие принципы:

- **Поля — только HTML-элементы.**
- **Конструктор принимает eventEmitter: EventEmitter.**
- **Методы — для рендеринга и обработки пользовательских действий.**
- **Не хранит состояние приложения.**

## Класс HomePageView

## Поля:

- **container: HTMLElement** — корневой элемент главной страницы.
- **productsContainer: HTMLElement** — контейнер для галереи товаров.
- **cartCounter: HTMLElement** — элемент счётчика товаров в корзине.
- **cartIcon: HTMLElement** — иконка корзины для открытия модального окна.
- **gallery: HTMLElement** - карточки на главной странице.
- **popupView: IBasePopupView** - показ попапа.

## Конструктор:

(eventEmitter: EventEmitter, container: HTMLElement)

## Методы:

- **renderProducts(products: IProduct[]): void {this.gallery.append(...products.map((item) => (new CardView(this.eventEmitter, {gallery: document.querySelector('#card-catalog'), popup: document.querySelector('card'), cart: document.querySelector('.card')}, item)).render("gallery")))}: void** — отображает карточки товаров в галерее.
- **updateCartCounter(count: number): void** — обновляет счётчик товаров в корзине.
- **bindCartIconClick(): void {this.eventEmitter.emit(EventTypes.CartSelect)}: void** — устанавливает обработчик клика по иконке корзины.

## Класс ModalView

## Поля:

- **container: HTMLElement** — контейнер модального окна.

## Конструктор:

(eventEmitter: EventEmitter, container: HTMLElement)

## Методы:

- **render(content: HTMLElement): void {this.content.innerHTML = ""; this.content.append(content); }: void** — отображает переданный контент в модальном окне.
- **open(): void {this.container.classList.add('modal_active'); this.isOpen = true; }: void** — открывает модальное окно.
- **close(): void {this.container.classList.remove('modal_active');this.content.innerHTML = ''; this.isOpen = false; }: void** — закрывает модальное окно.
- **bindClose(handler: () => void): void** — устанавливает обработчик закрытия.

## Класс ModalCartView

## Поля:

- **container: HTMLElement** — контейнер списка товаров корзины.
- **totalPriceElement: HTMLElement** — элемент для отображения общей стоимости.
- **orderButton: HTMLElement** — кнопка оформления заказа.
- **totalPrice: number** - итоговая цена.
- **products: IProduct[]** - продукты.

## Конструктор:

(eventEmitter: EventEmitter, container: HTMLElement)

## Методы:

- **updateCartItems(cartItems: IProduct[]): void {this.products = cartItems;this.updateTotalPrice(cartItems.reduce((acc, { price }) => acc + price, 0)); }: void** — отображает список товаров в корзине.
- **updateTotalPrice(total: number): void {this.totalPrice = total; if (this.isOpen) {this.totalPriceElement.innerText = fillPriceWithCurrency(this.totalPrice); }}: void** — обновляет отображение общей стоимости.
- **bindOrder(handler: () => void): void {this.eventEmitter.emit(EventTypes.orderClicked)}: void** — устанавливает обработчик оформления заказа.

## Класс CardView

## Поля:

- **cardElement: HTMLElement** — HTML-элемент карточки товара.

## Конструктор:

(eventEmitter: EventEmitter, container: HTMLElement)

## Методы:

- **render(type: CardTypeView, position?: number): Node {const card = this.containers[type].content.cloneNode(true) as HTMLElement;card.querySelector<HTMLElement>('.card__title').innerText = this.datatitlecardquerySelector<HTMLElement>('.card__price').innerText = this.data.price? fillPriceWithCurrency(this.data.price): 'Бесценно';if (type !== 'cart') {const image = card.querySelector<HTMLImageElement>('.card__image');image.src = `${CDN_URL}${this.data.image}`;image.alt = this.data.title;card.querySelector<HTMLElement>('.card__category').innerText =this.data.category;}switch (type) {case 'gallery':card.querySelector<HTMLElement>('button.card').addEventListener('click', this.bindClick.bind(this));break;case 'cart':card.querySelector<HTMLElement>('.basket__item-index').innerText =String(position);card.querySelector<HTMLButtonElement>('button.card__button').addEventListener('click', this.bindRemoveItem.bind(this));break;case 'popup':card.querySelector<HTMLElement>('.card__text').innerText =this.data.description;card.querySelector<HTMLButtonElement>('button.card__button').addEventListener('click', this.bindClickButton.bind(this));break;}return card;}: void** — создаёт и возвращает HTML-элемент карточки, используя указанный шаблон и данные товара.
- **bindRemoveItem(): void {this.eventEmitter.emit(EventTypes.ItemRemoved, { productId: this.data.id });}: void** — устанавливает обработчик удаления товара из корзины.
- **bindClickButton(): void {this.eventEmitter.emit(EventTypes.ItemClicked, { productId: this.data.id });}: void** - устанавливает обработчик для кнопки добавления в корзину.
- **bindClick(): void {this.eventEmitter.emit(EventTypes.ItemSelect, { productId: this.data.id });}: void** — устанавливает обработчик клика по интерактивному элементу карточки.

## Класс OrderFormView

## Поля:

- **paymentMethodButton: HTMLElement** — кнопки выбора способа оплаты.
- **address: HTMLElement** — поле для ввода адреса доставки.
- **actionButton: HTMLButtonElement** — кнопка для перехода к следуещему этапу оформления заказа.
- **email: HTMLElement** — поле для ввода электронной почты.
- **numberPhone: HTMLElement** — поле для ввода номер телефона.
- **orderButton: HTMLElement** — кнопка для оформления заказа.

## Конструктор:

(eventEmitter: EventEmitter, container: HTMLElement)

## Методы:

- **updatePaymentType(dataOrder: RenderOrderData) {if ('payment' in dataOrder.data.values) {const activeButtonClassName = 'button_alt-active';const type = dataOrder.data.values.payment;const activeButton =type === 'online'? this.paymentButtonOnline: this.paymentButtonOnPlace;const deactiveButton =type === 'online'? this.paymentButtonOnPlace: this.paymentButtonOnline;activeButton.classList.add(activeButtonClassName);deactiveButton.classList.remove(activeButtonClassName);}this.updateRender(dataOrder);}** - добавляет для кнопок выбора оплаты активный класс.
- **updateField(name: string, value: string) {const element = this.content.querySelector<HTMLInputElement>(`input[name=${name}]`);if (!element) return;element.value = value;}** -  обнуляет знаение полей форм.
- **bindPayment(type: PaymentTypes): void {this.eventEmitter.emit(EventTypes.PaymentSelect, { type });}: void** — устанавливает обработчик на кнопки выбора способа оплаты.
- **bindInput(evt: InputEvent): void {const element = evt.target as HTMLInputElement;this.eventEmitter.emit(EventTypes.InputForm, {name: element.name,value: element.value,});}** - устанавливает обработчик на формы.
- **bindActionButton(evt: Event): void {evt.stopPropagation();evt.preventDefault();this.eventEmitter.emit(EventTypes.ActionButtonClicked);}: void** — устанавливает обработчик на кнопку перевода на следующий попап оформления.

## Класс OrderSuccessFormView

## Поля:

- **totalPrice: number** — списанная сумма.
- **successButton: HTMLElement** — кнопа закрытия попапа.

## Конструктор:

(eventEmitter: EventEmitter, container: HTMLElement)

## Методы:

- **bindSuccessButton(): void {this.eventEmitter.emit(EventTypes.orderSuccessButtonClicked);}: void** — устанавливает обработчик н кнопку закрытия окна.

## Запуск проекта

**Для установки зависимостей и запуска проекта выполните:**

```bash
npm install
npm run start
```

**или**

```bash
yarn install
yarn start
```

**Для сборки проекта используйте команду:**

```bash
npm run build
```

**или**

```bash
yarn build
```
