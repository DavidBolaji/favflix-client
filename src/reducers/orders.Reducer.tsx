import { Action } from 'redux';
import {
  ORDER_LIST_CREATE_SUCCESS,
  ORDER_LIST_DELETE_SUCCESS,
  ORDER_LIST_ERROR,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_SINGLE_ERROR,
  ORDER_SINGLE_REQUEST,
  ORDER_SINGLE_SUCCESS,
} from '../constants/constants';
import { IProduct } from './productReducer';

interface IOrderProduct extends IProduct {
  _id?: string;
  qty?: number;
}

interface IOrder {
  _id?: string;
  user: string;
  phone: string;
  address: string;
  product: IOrderProduct[];
  price: number;
  status: 'waiting' | 'processing' | 'verified';
  paid: boolean;
  delivered: boolean;
}

const initialState = {
  _id: '',
  user: '',
  phone: '',
  address: '',
  product: [{ img: '', title: '', amount: 0 }],
  price: 0,
  status: 'waiting',
  paid: false,
  delivered: false,
} as IOrder;

export interface OrderState {
  orders: IOrder[]; // Change 'any' to the appropriate type for your products
  order: IOrder;
  error?: string;
  loading?: boolean;
}

interface OrderAction extends Action {
  payload?: any; // Change 'any' to the appropriate type for your payload
}

export const orderReducer = (
  state: OrderState = { loading: false, orders: [], order: initialState },
  action: OrderAction
): OrderState => {
  switch (action.type) {
    //ORDER ARRAY
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
        orders: [...state.orders],
        order: { ...state.order },
      };
    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: [...action.payload],
      };
    case ORDER_LIST_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ORDER_LIST_CREATE_SUCCESS:
      const exist = state.orders?.find(
        (order: IOrder) => order?._id === action?.payload?._id
      );

      if (exist) {
        const newOrder = [
          ...state.orders.map((o) =>
            o?._id !== action.payload?._id ? o : action.payload
          ),
        ];
        // newOrder.push(action.payload);
        return {
          ...state,
          loading: false,
          orders: [...newOrder],
        };
      }
      const korder = [...state.orders];

      korder.push(action.payload);
      return {
        order: { ...state.order },
        loading: false,
        orders: [...korder],
      };
    case ORDER_LIST_DELETE_SUCCESS:
      const orders = state.orders.filter(
        (order: IOrder) => order._id !== action.payload._id
      );
      return {
        ...state,
        loading: false,
        orders: [...orders],
      };
    case ORDER_SINGLE_REQUEST:
      return { loading: true, orders: state.orders, order: state.order };
    case ORDER_SINGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        order: { ...action.payload },
      };
    case ORDER_SINGLE_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
