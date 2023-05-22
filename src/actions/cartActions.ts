import { Dispatch } from 'redux';
import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEM,
  CART_DELETE_ITEM,
  CART_REMOVE_ITEM,
} from '../constants/constants';

export const addToCart =
  (value: any) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        _id: value._id,
        title: value.title,
        img: value.img,
        amount: value.amount,
        qty: value.qty,
      },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart =
  (value: any) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: {
        _id: value._id,
        title: value.title,
        img: value.img,
        amount: value.amount,
        qty: value.qty,
      },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const deleteFromCart =
  (value: any) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
      type: CART_DELETE_ITEM,
      payload: {
        _id: value._id,
      },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const clearCart = () => async (dispatch: Dispatch, getState: any) => {
  dispatch({
    type: CART_CLEAR_ITEM,
    payload: [],
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
