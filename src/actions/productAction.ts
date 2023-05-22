import { Dispatch } from 'redux';
import Axios from '../auth/api';
import {
  PRODUCT_LIST_ERROR,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/constants';

export const getProducts = () => async (dispatch: Dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get('/product/read');
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: PRODUCT_LIST_ERROR,
      payload: err?.response?.data?.message,
    });
  }
};

export const createProducts =
  (value: any, cb: (res: string, state: 'success' | 'error') => void) =>
  async (dispatch: Dispatch) => {
    const { img, _id, amount, title } = value;
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.post('/product/create', {
        img,
        _id,
        amount,
        title,
      });
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data.data,
      });
      cb(data.message, 'success');
    } catch (err: any) {
      dispatch({
        type: PRODUCT_LIST_ERROR,
        payload: err?.response?.data?.message,
      });
      cb(err?.response?.data?.message, 'error');
    }
  };

export const deleteProduct =
  (id: any, cb: (res: string, state: 'success' | 'error') => void) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.delete(`/product/delete/${id}`);
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data.data,
      });
      cb(data.message, 'success');
    } catch (err: any) {
      dispatch({
        type: PRODUCT_LIST_ERROR,
        payload: err?.response?.data?.message,
      });
      cb(err?.response?.data?.message, 'error');
    }
  };
