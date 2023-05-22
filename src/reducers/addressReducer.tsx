import { Action } from 'redux';
import { SAVE_ADDRESS } from '../constants/constants';

interface Iaddress {
  email: string;
  address: string;
  phone: string;
}

export interface AddressState {
  address?: Iaddress; // Change 'any' to the appropriate type for your products
  error?: string;
}

interface AddressAction extends Action {
  payload?: any; // Change 'any' to the appropriate type for your payload
}

export const addressReducer = (
  state: AddressState = { address: { email: '', address: '', phone: '' } },
  action: AddressAction
): AddressState => {
  switch (action.type) {
    case SAVE_ADDRESS:
      return { address: action.payload };
    default:
      return state;
  }
};
