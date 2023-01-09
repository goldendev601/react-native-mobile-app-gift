import axios from 'axios';
import { API_ENDPOINT } from '../constants/Api';

export const KYC_INIT_STATUS = 'kyc_init_status';
export const KYC_ADD_REQUEST = 'kyc_add_request';
export const KYC_ADD_SUCCESS = 'kyc_add_success';
export const KYC_ADD_FAILURE = 'kyc_add_failure';
export const KYC_SET = 'kyc_set';

export function kycInitStatus() {
  return {
    type: KYC_INIT_STATUS,
  };
}

export function kycGetSuccess(result: object) {
  return {
    type: KYC_SET,
    result,
  };
}
export function kycAddRequest() {
  return { type: KYC_ADD_REQUEST };
}

export function kycAddSuccess(result: object) {
  return {
    type: KYC_ADD_SUCCESS,
    result,
  };
}

export function kycAddFailure() {
  return {
    type: KYC_ADD_FAILURE,
  };
}

export function getKYC(token: string) {
  return async (dispatch: any) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/kyc?token=${token}`,
      });
      dispatch(kycGetSuccess(res.data.kyc));
    } catch (error) {
      console.log(error);
    }
  };
}

export function kycInvestmentAdd(data: any) {
  return async (dispatch: any) => {
    dispatch(kycAddRequest());
    try {
      const res = await axios({
        method: 'post',
        url: `${API_ENDPOINT}/kyc/`,
        data: data,
      });
      dispatch(kycAddSuccess(res.data.kyc));
    } catch (error) {
      console.log(error);
      dispatch(kycAddFailure());
    }
  };
}
