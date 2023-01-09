import axios from 'axios';
import { API_ENDPOINT } from '../constants/Api';

import { authUpdateUserInfo } from './authActions';
import { handleMessage, handleSpinner } from './commonAction';

export const ACCOUNT_DETAIL_ADD_REQUEST = 'account_detail_add_request';
export const ACCOUNT_DETAIL_ADD_SUCCESS = 'account_detail_add_success';
export const ACCOUNT_DETAIL_ADD_FAILURE = 'account_detail_add_failure';

export function accountDetailAddRequest() {
  return { type: ACCOUNT_DETAIL_ADD_REQUEST };
}

export function accountDetailAddSucccess(result: string) {
  return { type: ACCOUNT_DETAIL_ADD_SUCCESS, result };
}

export function accountDetailAddFailure() {
  return { type: ACCOUNT_DETAIL_ADD_FAILURE };
}

export function accountDetailAdd(user_id: string, detail: any) {
  return async (dispatch: any) => {
    dispatch(accountDetailAddRequest());
    dispatch(handleSpinner(true, 'Adding...'));

    try {
      const res = await axios({
        method: 'post',
        url: `${API_ENDPOINT}/payment/`,
        data: { user_id, ...detail },
      });

      dispatch(authUpdateUserInfo(res.data.user));
      dispatch(handleMessage(true, 'success', 'Successfully added!'));
    } catch (error) {
      console.log(error);
      dispatch(accountDetailAddFailure());
      dispatch(handleMessage(true, 'error', 'Failed to add!'));
    } finally {
      dispatch(handleSpinner(false, ''));
    }
  };
}
