import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './reducers/userReducer';
import { productListReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';
import { addressReducer } from './reducers/addressReducer';
import { orderReducer } from './reducers/orders.Reducer';

const cartLocalStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems')!)
  : [];

const addressLocalStorage = localStorage.getItem('address')
  ? JSON.parse(localStorage.getItem('address')!)
  : {};

const initialState = {
  cart: { cartItems: cartLocalStorage },
  address: { address: addressLocalStorage },
};
const middlewares = [thunk];
const reducer = combineReducers({
  user: userReducer,
  productList: productListReducer,
  cart: cartReducer,
  address: addressReducer,
  orderz: orderReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
