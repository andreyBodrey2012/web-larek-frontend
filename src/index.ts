import { Api, getProductList } from './components/base/api';
import './scss/styles.scss';
import { EventEmitter, IProduct } from './types';
import { CardView } from './views/cardView';
import { HomePageView } from './views/homePageView';

const eventEmitter = new EventEmitter();
const homePageView = new HomePageView(
	eventEmitter,
	document.querySelector('.page')
);
const api = new Api(process.env.API_ORIGIN);
// const cardView = new CardView(eventEmitter, {gallery: document.querySelector('.card'), popup: document.querySelector('.card'), cart: document.querySelector('.card')}, products)

const init = async () => {
  const res = await getProductList(api);
  homePageView.renderProducts(res.items);
}

init().catch(console.error)