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

- **products: IProduct[]** — массив объектов товаров для галереи (тип IProduct описывает свойства товара).
- **cartItems: IProduct[]** — массив товаров, добавленных в корзину.
- **previewItem: IProduct | null** — выбранный товар для показа в модальном окне (или null если ничего не выбрано).

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

## Конструктор:

(eventEmitter: EventEmitter, container: HTMLElement)

## Методы:

- **renderProducts(products: IProduct[]): void** — отображает карточки товаров в галерее.
- **updateCartCounter(count: number): void** — обновляет счётчик товаров в корзине.
- **bindCartIconClick(handler: () => void): void** — устанавливает обработчик клика по иконке корзины.

## Класс ModalView

## Поля:

- **container: HTMLElement** — контейнер модального окна.

## Конструктор:

(eventEmitter: EventEmitter, container: HTMLElement)

## Методы:

- **render(content: HTMLElement): void** — отображает переданный контент в модальном окне.
- **open(): void** — открывает модальное окно.
- **close(): void** — закрывает модальное окно.
- **bindClose(handler: () => void): void** — устанавливает обработчик закрытия.

## Класс CartView

## Поля:

- **container: HTMLElement** — контейнер списка товаров корзины.
- **totalPriceElement: HTMLElement** — элемент для отображения общей стоимости.
- **orderButton: HTMLElement** — кнопка оформления заказа.

## Конструктор:

(eventEmitter: EventEmitter, container: HTMLElement)

## Методы:

- **renderCartItems(cartItems: IProduct[]): void** — отображает список товаров в корзине.
- **updateTotalPrice(total: number): void** — обновляет отображение общей стоимости.
- **bindOrder(handler: () => void): void** — устанавливает обработчик оформления заказа.

## Класс CardView

## Поля:

- **cardElement: HTMLElement** — HTML-элемент карточки товара.

## Конструктор:

(eventEmitter: EventEmitter, container: HTMLElement)

## Методы:

- **render(type: CardTypeView): HTMLElement** — создаёт и возвращает HTML-элемент карточки, используя указанный шаблон и данные товара.
- **bindRemoveItem(handler: (productId: string) => void): void** — устанавливает обработчик удаления товара из корзины.
- **bindClick(handler: (productId: string) => void): void** — устанавливает обработчик клика по интерактивному элементу карточки.

## Класс OrderFormView

## Поля:

- **paymentMethodButton: HTMLElement** — кнопки выбора способа оплаты.
- **address: HTMLElement** — поле для ввода адреса доставки.
- **nextButton: HTMLElement** — кнопка для перехода к следуещему этапу оформления заказа.
- **email: HTMLElement** — поле для ввода электронной почты.
- **numberPhone: HTMLElement** — поле для ввода номер телефона.
- **orderButton: HTMLElement** — кнопка для оформления заказа.

## Конструктор:

(eventEmitter: EventEmitter, container: HTMLElement)

## Методы:

- **bindPayment(handler: () => void): void** — устанавливает обработчик на кнопки выбора способа оплаты.
- **bindNextButton(handler: () => void): void** — устанавливает обработчик на кнопку перевода на следующий попап оформления.
- **bindEmail(handler: () => void): void** — устанавливает обработчик для поля ввода элетронной почты.
- **bindNumber(handler: () => void): void** — устанавливает обработчик для поля ввода номер телефона.
- **bindOrder(handler: () => void): void** — устанавливает обработчик для кнопкм оформления заказа.

## Класс OrderSuccessFormView

## Поля:

- **total: number** — списанная сумма.
- **successButton: HTMLElement** — кнопа закрытия попапа.

## Конструктор:

(eventEmitter: EventEmitter, container: HTMLElement)

## Методы:

- **bindSuccessButton(handler: () => void): void** — устанавливает обработчик н кнопку закрытия окна.

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