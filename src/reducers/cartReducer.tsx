import { Action } from 'redux';
import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEM,
  CART_DELETE_ITEM,
  CART_REMOVE_ITEM,
} from '../constants/constants';

export interface ICartState {
  cartItems: IcartItems[];
}

interface CartAction extends Action {
  payload?: any; // Change 'any' to the appropriate type for your payload
}

interface IcartItems {
  _id: string;
  title?: string; // Change 'any' to the appropriate type for your products
  amount?: number;
  img?: string;
  qty?: number;
}

export const cartReducer = (
  state: ICartState = { cartItems: [] },
  action: CartAction
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item: IcartItems = action.payload;

      const existItem = state.cartItems.find(
        (x: IcartItems) => x._id === item._id
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x: IcartItems) =>
            x._id === existItem._id ? { ...item, qty: item.qty! + x.qty! } : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      const removeItem: IcartItems = action.payload;

      const existsInCart = state.cartItems.find(
        (x: IcartItems) => x._id === removeItem._id
      );

      if (existsInCart) {
        return {
          ...state,
          cartItems: state.cartItems.map((x: IcartItems) =>
            x._id === existsInCart._id
              ? {
                  ...removeItem,
                  qty: x.qty! > 1 ? x.qty! - removeItem.qty! : removeItem.qty,
                }
              : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems],
        };
      }
    case CART_DELETE_ITEM:
      const removeItemId = action.payload;

      const exists = state.cartItems.filter(
        (x: IcartItems) => x._id !== removeItemId._id
      );

      return {
        ...state,
        cartItems: [...exists],
      };
    case CART_CLEAR_ITEM:
      return {
        ...state,
        cartItems: action.payload,
      };

    default:
      return state;
  }
};
