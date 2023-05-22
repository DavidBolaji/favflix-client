import { Dispatch } from 'redux';
import Axios from '../auth/api';
import {
  ORDER_LIST_CREATE_SUCCESS,
  ORDER_LIST_DELETE_SUCCESS,
  ORDER_LIST_ERROR,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_SINGLE_SUCCESS,
} from '../constants/constants';

export const getOrders = () => async (dispatch: Dispatch) => {
  dispatch({
    type: ORDER_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get('/order/read');
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: ORDER_LIST_ERROR,
      payload: err?.response?.data?.message,
    });
  }
};

export const getUsersOrders = (values: any) => async (dispatch: Dispatch) => {
  dispatch({
    type: ORDER_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/order/read/${values.user}`);
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (err: any) {
    dispatch({
      type: ORDER_LIST_ERROR,
      payload: err?.response?.data?.message,
    });
  }
};

export const createOrders =
  (value: any, cb: (res: string, state: 'success' | 'error') => void) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.post('/order/create', value);

      dispatch({
        type: ORDER_SINGLE_SUCCESS,
        payload: data.data,
      });

      dispatch({
        type: ORDER_LIST_CREATE_SUCCESS,
        payload: data.data,
      });
      cb(data.data._id, 'success');
    } catch (err: any) {
      dispatch({
        type: ORDER_LIST_ERROR,
        payload: err?.response?.data?.message,
      });
      cb(err?.response?.data?.message, 'error');
    }
  };

export const deleteOrders =
  (id: any, cb: (res: string, state: 'success' | 'error') => void) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.delete(`/product/delete/${id}`);
      dispatch({
        type: ORDER_LIST_DELETE_SUCCESS,
        payload: data.data,
      });
      cb(data.message, 'success');
    } catch (err: any) {
      dispatch({
        type: ORDER_LIST_ERROR,
        payload: err?.response?.data?.message,
      });
      cb(err?.response?.data?.message, 'error');
    }
  };
