import axios from 'axios';
import { API_ENDPOINT } from '../constants/Api';

import { handleSpinner } from './commonAction';

export const EQUITY_REQUEST_DATA = 'EQUITY_REQUEST_DATA';
export const EQUITY_RECIEVE_DATA = 'EQUITY_RECIEVE_DATA';
export const EQUITY_RECIEVE_DETAIL = 'EQUITY_RECIEVE_DETAIL';
export const EQUITY_PURCHASE_ITEMS = 'EQUITY_PURCHASE_ITEMS';


export function requestData() {
  return { type: EQUITY_REQUEST_DATA };
}

export function recieveData(results: object) {
  return {
    type: EQUITY_RECIEVE_DATA,
    results,
  };
}

export function recieveDetail(result: object) {
  return {
    type: EQUITY_RECIEVE_DETAIL,
    result,
  };
}

export function purchaseItems(equityName: string) {
  return {
    type: EQUITY_PURCHASE_ITEMS,
    purchases: [equityName],
  };
}

export function getEquities() {
  return async (dispatch: any) => {
    dispatch(requestData());
    dispatch(handleSpinner(true, 'Loading...'));

    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/gse/live`,
      });
      dispatch(recieveData(res.data.live_equities));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(handleSpinner(false, ''));
    }
  };
}

export function getEquity(name: any) {
  return async (dispatch: any) => {
    dispatch(requestData());
    dispatch(handleSpinner(true, 'Loading...'));

    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/gse/live/${name.toLowerCase()}`,
      });
      dispatch(recieveDetail(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(handleSpinner(false, ''));
    }
  };
}

export function purchaseEquity(equityName: string) {
  return async (dispatch: any) => {
    try {
      dispatch(purchaseItems(equityName));
    } catch (error) {
      console.log(error);
    }
  };
}
