import {
  EQUITY_REQUEST_DATA,
  EQUITY_RECIEVE_DATA,
  EQUITY_RECIEVE_DETAIL,
  EQUITY_PURCHASE_ITEMS,
} from '../actions/equityAction';

import { EquityDetailType, EquityType } from "../types";

interface IEquityInitialState {
  results: Array<EquityType>;
  result: EquityDetailType;
  purchases: Array<any>;
  isFetching: boolean;
}

export const equityInitialState: IEquityInitialState = {
  results: [],
  result: {
    capital: 0,
    company: {
      address: '',
      directors: [],
      email: '',
      facsimile: '',
      industry: '',
      name: '',
      sector: '',
      telephone: '',
      website: '',
    },
    dps: 0,
    eps: 0,
    name: '',
    price: 0,
    shares: 0,
  },
  purchases: [],
  isFetching: false,
};

export function equityReducer(state = equityInitialState, action: any) {
  switch (action.type) {
    case EQUITY_REQUEST_DATA:
      return {
        ...state,
        result: {},
        isFetching: true,
      };

    case EQUITY_RECIEVE_DATA:
      return {
        ...state,
        results: action.results,
        result: {},
        isFetching: false,
      };

    case EQUITY_RECIEVE_DETAIL:
      return {
        ...state,
        result: action.result,
        isFetching: false,
      };

    case EQUITY_PURCHASE_ITEMS:
      return {
        ...state,
        purchases: action.purchases,
      };

    default:
      return state;
  }
}
