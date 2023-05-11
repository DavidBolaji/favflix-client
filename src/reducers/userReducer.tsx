import {
  USER_FAILED,
  USER_REQUEST,
  USER_SUCCESS,
} from '../constants/constants';

export const userReducer = (state = { user: [] }, action: any) => {
  switch (action.type) {
    case USER_REQUEST:
      return { ...state, loading: true };
    case USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };
    case USER_FAILED:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
