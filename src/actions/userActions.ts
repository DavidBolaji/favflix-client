import { Dispatch } from 'redux';
import { REQUEST, USER_FAILED, USER_SUCCESS } from '../constants/constants';
import { IInputReg } from '../layouts/ui/RegisterSection/RegisterForm';
import Axios from '../auth/api';
import { IInput } from '../layouts/ui/LoginSrction/LoginForm';
import { send } from '@emailjs/browser';

export const register =
  (values: IInputReg, cb: (res: string, state: string) => void) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: REQUEST,
    });
    try {
      const res = await Axios.post('/signup', values);
      dispatch({
        type: USER_SUCCESS,
        payload: res.data.data,
      });
      cb(res.data.message, 'success');
    } catch (err: any) {
      dispatch({
        type: USER_FAILED,
        payload: { err: err?.response?.data?.message },
      });
      cb(err?.response?.data?.message, 'error');
    }
  };

export const signin =
  (values: IInput, cb: (res: string, state: string) => void) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: REQUEST,
    });
    try {
      const res = await Axios.post('/signin', values);
      dispatch({
        type: USER_SUCCESS,
        payload: res.data.data,
      });
      cb(res.data.message, 'success');
    } catch (err: any) {
      dispatch({
        type: USER_FAILED,
        payload: { err: err?.response?.data?.message },
      });
      cb(err?.response?.data?.message, 'error');
    }
  };

export const signout =
  (cb: (res: string, state: 'success' | 'error') => void) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: REQUEST,
    });
    try {
      const res = await Axios.get('/signout');
      dispatch({
        type: USER_SUCCESS,
        payload: res.data.data,
      });
      cb(res.data.message, 'success');
    } catch (err: any) {
      dispatch({
        type: USER_FAILED,
        payload: { err: err?.response?.data?.message },
      });
      cb(err?.response?.data?.message, 'error');
    }
  };

export const forgot =
  (
    values: { email: string },
    cb: (res: string, state: 'success' | 'error') => void
  ) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: REQUEST,
    });
    try {
      const res = await Axios.post('/forgot', values);
      dispatch({
        type: USER_SUCCESS,
        payload: res.data.data,
      });
      const req = await send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        {
          link: res.data.data.link,
          from_name: 'Fav-Fleks',
          to_email: values.email,
          username: values.email,
        },
        import.meta.env.VITE_PUBLIC_KEY
      );

      if (req.status === 200) {
        cb(res.data.message, 'success');
      } else {
        cb('something went wrong', 'error');
      }
    } catch (err: any) {
      dispatch({
        type: USER_FAILED,
        payload: { err: err?.response?.data?.message },
      });
      cb(err?.response?.data?.message, 'error');
    }
  };

export const reset =
  (
    values: { password: string; token: string },
    cb: (res: string, state: 'success' | 'error') => void
  ) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: REQUEST,
    });
    try {
      const res = await Axios.post('/reset', values);
      dispatch({
        type: USER_SUCCESS,
        payload: res.data.data,
      });
      cb(res.data.message, 'success');
    } catch (err: any) {
      dispatch({
        type: USER_FAILED,
        payload: { err: err?.response?.data?.message },
      });
      cb(err?.response?.data?.message, 'error');
    }
  };

export const tokenValid =
  (token: string, cb: (res: string, state: 'success' | 'error') => void) =>
  async (dispatch: Dispatch) => {
    dispatch({
      type: REQUEST,
    });
    try {
      const res = await Axios.post('/token', { token: token });
      dispatch({
        type: USER_SUCCESS,
        payload: res.data.data,
      });
      cb(res.data.message, 'success');
    } catch (err: any) {
      dispatch({
        type: USER_FAILED,
        payload: { err: err?.response?.data?.message },
      });
      cb(err?.response?.data?.message, 'error');
    }
  };
