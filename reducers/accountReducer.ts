import {
  ACCOUNT_DETAIL_ADD_REQUEST,
  ACCOUNT_DETAIL_ADD_SUCCESS,
  ACCOUNT_DETAIL_ADD_FAILURE,
} from '../actions/accountAction';

export const accountInitialState = {
  isAdded: false,
  isAdding: false,
  cardNum: '',
};

export function accountReducer(state = accountInitialState, action: any) {
  switch (action.type) {
    case ACCOUNT_DETAIL_ADD_REQUEST:
      return {
        ...state,
        isAdding: true,
        isAdded: false,
      };

    case ACCOUNT_DETAIL_ADD_SUCCESS:
      return {
        ...state,
        isAdding: false,
        isAdded: true,
        cardNum: action.result,
      };

    case ACCOUNT_DETAIL_ADD_FAILURE:
      return {
        ...state,
        isAdding: false,
        isAdded: false,
      };

    default:
      return state;
  }
}
