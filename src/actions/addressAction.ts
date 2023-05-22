import { Dispatch } from 'redux';
import { SAVE_ADDRESS } from '../constants/constants';

export const saveAddress =
  (value: any) => async (dispatch: Dispatch, getState: any) => {
    dispatch({
      type: SAVE_ADDRESS,
      payload: {
        address: value.address,
        phone: value.phone,
        email: value.email,
      },
    });

    localStorage.setItem('address', JSON.stringify(getState().address.address));
  };
