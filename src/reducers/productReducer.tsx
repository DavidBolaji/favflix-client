import { Action } from 'redux';
import {
  PRODUCT_LIST_ERROR,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants/constants';

export interface IProduct {
  title: string;
  img: string;
  amount: number;
}

export interface ProductListState {
  loading: boolean;
  products?: IProduct[]; // Change 'any' to the appropriate type for your products
  error?: string;
}

interface ProductListAction extends Action {
  payload?: any; // Change 'any' to the appropriate type for your payload
}

export const productListReducer = (
  state: ProductListState = { loading: false, products: [] },
  action: ProductListAction
): ProductListState => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: [...action.payload] };
    case PRODUCT_LIST_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
