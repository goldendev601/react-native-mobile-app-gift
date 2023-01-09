import axios from "axios";
import { API_ENDPOINT } from "../constants/Api";
import { Event, EventDetailInfo, PaymentMethod } from "../reducers";
import { authLogout } from "./authActions";
import { handleMessage, handleSpinner } from "./commonAction";

// Define Action Types
export const GET_CONTACT_LIST_SUCCESS = 'GET_CONTACT_LIST_SUCCESS';
export const GET_FAVORITE_CONTACT_LIST_SUCCESS = 'GET_FAVORITE_CONTACT_LIST_SUCCESS';
export const GET_DASHBOARD_INFO_SUCCESS = 'GET_DASHBOARD_INFO_SUCCESS';
export const GET_EVENT_LIST_SUCCESS = 'GET_EVENT_LIST_SUCCESS';
export const GET_ALL_EVENT_LIST_SUCCESS = 'GET_ALL_EVENT_LIST_SUCCESS';
export const GET_INVITED_EVENT_LIST_SUCCESS = 'GET_INVITED_EVENT_LIST_SUCCESS';
export const ADD_CONTACT_SUCCESS = 'ADD_CONTACT_SUCCESS';
export const IMPORT_CONTACTS_SUCCESS = 'IMPORT_CONTACTS_SUCCESS';
export const UPDATE_CONTACT_SUCCESS = 'UPDATE_CONTACT_SUCCESS';
export const GENERATE_TOKEN_SUCCESS = 'GENERATE_TOKEN_SUCCESS';
export const GENERATE_TOKEN_BANK_SUCCESS = 'GENERATE_TOKEN_BANK_SUCCESS';
export const ADD_PAYMENT_METHOD_SUCCESS = 'ADD_PAYMENT_METHOD_SUCCESS';
export const VERIFY_BANK_ACCOUNT_SUCCESS = 'VERIFY_BANK_ACCOUNT_SUCCESS';
export const DELETE_PAYMENT_METHOD_SUCCESS = 'DELETE_PAYMENT_METHOD_SUCCESS';
export const DELETE_CONTACT_SUCCESS = 'DELETE_CONTACT_SUCCESS';
export const ADD_GIFT_SUCCESS = 'ADD_GIFT_SUCCESS';
export const ADD_EVENT_SUCCESS = 'ADD_EVENT_SUCCESS';
export const ADD_THANK_YOU_SUCCESS = 'ADD_THANK_YOU_SUCCESS';
export const ADD_THANK_YOU_SUCCESS_1 = 'ADD_THANK_YOU_SUCCESS_1';
export const UPDATE_THANK_YOU_SUCCESS = 'UPDATE_THANK_YOU_SUCCESS';
export const SET_MEMBERS_THANK_YOU_SUCCESS = 'SET_MEMBERS_THANK_YOU_SUCCESS';
export const PAY_THANK_YOU_SUCCESS = 'PAY_THANK_YOU_SUCCESS';
export const PAY_THANK_YOU_FAILED = 'PAY_THANK_YOU_FAILED';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const ADD_MEMBER_SUCCESS = 'ADD_MEMBER_SUCCESS';
export const SET_MEMBER_SUCCESS = 'SET_MEMBER_SUCCESS';
export const GET_MEMBER_SUCCESS = 'GET_MEMBER_SUCCESS';
export const DELETE_MEMBER_SUCCESS = 'DELETE_MEMBER_SUCCESS';
export const GET_GIFT_CATEGORIES_SUCCESS = 'GET_GIFT_CATEGORIES_SUCCESS';
export const GET_MY_PROFILE_SUCCESS = 'GET_MY_PROFILE_SUCCESS';
export const GET_STRIPE_DASHBOARD_SUCCESS = 'GET_STRIPE_DASHBOARD_SUCCESS';
export const GET_PAYMENT_METHODS_SUCCESS = 'GET_PAYMENT_METHODS_SUCCESS';
export const GET_GIFTS_RECEIVED_SUCCESS = 'GET_GIFTS_RECEIVED_SUCCESS';
export const GET_TRANSACTIONS_SUCCESS = 'GET_TRANSACTIONS_SUCCESS';
export const GET_GIFT_COLORS_SUCCESS = 'GET_GIFT_COLORS_SUCCESS';
export const GET_EVENT_TYPES_SUCCESS = 'GET_EVENT_TYPES_SUCCESS';
export const GET_CURRENCY_TYPES_SUCCESS = 'GET_CURRENCY_TYPES_SUCCESS';
export const GET_GIFT_FONTS_SUCCESS = 'GET_GIFT_FONTS_SUCCESS';
export const GET_CARD_TYPES_SUCCESS = 'GET_CARD_TYPES_SUCCESS';
export const GET_GIFT_PICTURES_SUCCESS = 'GET_GIFT_PICTURES_SUCCESS';
export const GET_CUSTOM_PICTURES_SUCCESS = 'GET_CUSTOM_PICTURES_SUCCESS';
export const GET_TRANSACTION_DETAIL_SUCCESS = 'GET_TRANSACTION_DETAIL_SUCCESS';
export const SET_GIFT_INFO = 'SET_GIFT_INFO';
export const SET_STRIPE_TOKEN_ID = 'SET_STRIPE_TOKEN_ID';
export const SET_CONTACT_INFO = 'SET_CONTACT_INFO';
export const SET_IMPORTED_CONTACT_INFO = 'SET_IMPORTED_CONTACT_INFO';
export const SET_EVENT_INFO = 'SET_EVENT_INFO';
export const SET_THANKS_NOTE_INFO = 'SET_THANKS_NOTE_INFO';
export const SET_EVENT_DETAIL_INFO = 'SET_EVENT_DETAIL_INFO';
export const SET_MEMBERS_INFO = 'SET_MEMBERS_INFO';
export const SET_THANK_YOU_MEMBERS_INFO = 'SET_THANK_YOU_MEMBERS_INFO';
export const SET_EVENT_MEMBERS_INFO = 'SET_EVENT_MEMBERS_INFO';
export const SET_DATE_INFO = 'SET_DATE_INFO';
export const GET_EVENT_DETAIL_SUCCESS = 'GET_EVENT_DETAIL_SUCCESS';
export const SET_SELECTED_PAYMENT_METHOD = 'SET_SELECTED_PAYMENT_METHOD';
export const CLEAR_PAYMENT_METHOD_STATE = 'CLEAR_PAYMENT_METHOD_STATE';
export const CLEAR_CONTACT_US_STATE = 'CLEAR_CONTACT_US_STATE';
export const CLEAR_TRANSACTION_STATE = 'CLEAR_TRANSACTION_STATE';
export const CLEAR_THANKS_STATE = 'CLEAR_THANKS_STATE';
export const CLEAR_CONTACT_STATE = 'CLEAR_CONTACT_STATE';
export const CLEAR_DELETE_CONTACT_STATE = 'CLEAR_DELETE_CONTACT_STATE';
export const CLEAR_EVENT_STATE = 'CLEAR_EVENT_STATE';
export const CLEAR_THANKS_NOTE_STATE = 'CLEAR_THANKS_NOTE_STATE';
export const CLEAR_STRIPE_DASHBOARD_INFO = 'CLEAR_STRIPE_DASHBOARD_INFO';
export const TRANSACTION_SEND_SUCCESS = 'TRANSACTION_SEND_SUCCESS';
export const CONTACT_US_SUCCESS = 'CONTACT_US_SUCCESS';
export const TRANSACTION_SEND_FAILED = 'TRANSACTION_SEND_FAILED';
export const EVENT_LOADING = 'EVENT_LOADING';
export const EVENT_FAILED = 'EVENT_FAILED';
export const THANK_YOU_LOADING = 'THANK_YOU_LOADING';
export const THANK_YOU_FAILED = 'THANK_YOU_FAILED';
export const SET_PAYMENT_METHOD_LOADING = 'SET_PAYMENT_METHOD_LOADING';
export const SET_DASHBOARD_INFO_LOADING = 'SET_DASHBOARD_INFO_LOADING';
export const CLEAR_TRANSACTION_DETAIL_SUCCESS = 'CLEAR_TRANSACTION_DETAIL_SUCCESS';

// End of Action Types

export function getContactListSuccess(contactList: any) {
  return {
    type: GET_CONTACT_LIST_SUCCESS,
    contactList,
  };
}

export function getFavoriteContactListSuccess(favoriteList: any) {
  return {
    type: GET_FAVORITE_CONTACT_LIST_SUCCESS,
    favoriteList,
  };
}

export function getDashboardInfoSuccess(dashboardInfo: any) {
  return {
    type: GET_DASHBOARD_INFO_SUCCESS,
    dashboardInfo,
  };
}

export function getEventListSuccess(eventList: any) {
  return {
    type: GET_EVENT_LIST_SUCCESS,
    eventList,
  };
}

export function getAllEventListSuccess(eventAllList: any) {
  return {
    type: GET_ALL_EVENT_LIST_SUCCESS,
    eventAllList,
  };
}

export function getInvitedEventListSuccess(eventInvitedList: any) {
  return {
    type: GET_INVITED_EVENT_LIST_SUCCESS,
    eventInvitedList,
  };
}

export function getMyProfileSuccess(myProfile: any) {
  return {
    type: GET_MY_PROFILE_SUCCESS,
    myProfile,
  };
}

export function getStripeDashboardSuccess(stripeAccountLinkInfo: any) {
  return {
    type: GET_STRIPE_DASHBOARD_SUCCESS,
    stripeAccountLinkInfo,
  };
}

export function getPaymentMethodsSuccess(paymentMethodList: any) {
  return {
    type: GET_PAYMENT_METHODS_SUCCESS,
    paymentMethodList,
  };
}

export function getGiftsReceivedSuccess(giftReceivedList: any) {
  return {
    type: GET_GIFTS_RECEIVED_SUCCESS,
    giftReceivedList,
  };
}

export function getTransactionsSuccess(transactionList: any) {
  return {
    type: GET_TRANSACTIONS_SUCCESS,
    transactionList,
  };
}

export function getGiftCategoriesSuccess(giftCategoryList: any) {
  return {
    type: GET_GIFT_CATEGORIES_SUCCESS,
    giftCategoryList,
  };
}

export function getGiftColorsSuccess(giftColorList: any) {
  return {
    type: GET_GIFT_COLORS_SUCCESS,
    giftColorList,
  };
}

export function getEventTypesSuccess(eventTypeList: any) {
  return {
    type: GET_EVENT_TYPES_SUCCESS,
    eventTypeList,
  };
}

export function getCurrencyTypesSuccess(currencyTypeList: any) {
  return {
    type: GET_CURRENCY_TYPES_SUCCESS,
    currencyTypeList,
  };
}

export function getGiftFontsSuccess(giftFontList: any) {
  return {
    type: GET_GIFT_FONTS_SUCCESS,
    giftFontList,
  };
}

export function getCardTypesSuccess(cardTypeList: any) {
  return {
    type: GET_CARD_TYPES_SUCCESS,
    cardTypeList,
  };
}

export function getEventDetailSuccess(eventDetailInfo: any) {
  return {
    type: GET_EVENT_DETAIL_SUCCESS,
    eventDetailInfo,
  };
}

export function getGiftPicturesSuccess(giftPictureList: any) {
  return {
    type: GET_GIFT_PICTURES_SUCCESS,
    giftPictureList,
  };
}

export function getCustomPicturesSuccess(customPictureList: any) {
  return {
    type: GET_CUSTOM_PICTURES_SUCCESS,
    customPictureList,
  };
}

export function getTransactionDetailSuccess(transactionDetail: any) {
  return {
    type: GET_TRANSACTION_DETAIL_SUCCESS,
    transactionDetail,
  };
}

export function addContactSuccess(contact: any) {
  return {
    type: ADD_CONTACT_SUCCESS,
    contact
  }
}

export function importContactsSuccess(contactList: any) {
  return {
    type: IMPORT_CONTACTS_SUCCESS,
    contactList
  }
}

export function updateContactSuccess(contact: any) {
  return {
    type: UPDATE_CONTACT_SUCCESS,
    contact
  }
}

export function generateTokenSuccess(data: any) {
  return {
    type: GENERATE_TOKEN_SUCCESS,
    data
  }
}

export function generateTokenBankSuccess(data: any) {
  return {
    type: GENERATE_TOKEN_BANK_SUCCESS,
    data
  }
}

export function addPaymentMethodSuccess(data: any) {
  return {
    type: ADD_PAYMENT_METHOD_SUCCESS,
    data
  }
}

export function verifyBankAccountSuccess(data: any) {
  return {
    type: VERIFY_BANK_ACCOUNT_SUCCESS,
    data
  }
}

export function transactionSendSuccess(data: any) {
  return {
    type: TRANSACTION_SEND_SUCCESS,
    data
  }
}


export function contactUsSuccess(data: any) {
  return {
    type: CONTACT_US_SUCCESS,
    data
  }
}

export function transactionSendFailed() {
  return {
    type: TRANSACTION_SEND_FAILED,
  }
}

export function deletePaymentMethodSuccess(stripe_id: string) {
  return {
    type: DELETE_PAYMENT_METHOD_SUCCESS,
    stripe_id
  }
}

export function deleteContactSuccess(contact_id: number) {
  return {
    type: DELETE_CONTACT_SUCCESS,
    contact_id
  }
}

export function addGiftSuccess(giftInfo: any) {
  return {
    type: ADD_GIFT_SUCCESS,
    giftInfo
  }
}

export function addEventSuccess(data: any) {
  return {
    type: ADD_EVENT_SUCCESS,
    event: data
  }
}

export function addThankyouSuccess(data: any) {
  return {
    type: ADD_THANK_YOU_SUCCESS,
    thankyouDetail: data
  }
}

export function addThankyouSuccess1(data: any) {
  return {
    type: ADD_THANK_YOU_SUCCESS_1,
    thankyouDetail: data
  }
}

export function updateThankyouSuccess(data: any) {
  return {
    type: UPDATE_THANK_YOU_SUCCESS,
    thankyouDetail: data
  }
}

export function setMembersThankyouSuccess(data: any) {
  return {
    type: SET_MEMBERS_THANK_YOU_SUCCESS,
    thankyouDetail: data
  }
}

export function payThankyouSuccess() {
  return {
    type: PAY_THANK_YOU_SUCCESS,
  }
}

export function updateEventSuccess(data: any) {
  return {
    type: UPDATE_EVENT_SUCCESS,
    event: data
  }
}

export function addMemberSuccess(data: any) {
  return {
    type: ADD_MEMBER_SUCCESS,
    eventMembers: data
  }
}

export function setMemberSuccess(data: any) {
  return {
    type: SET_MEMBER_SUCCESS,
    eventMembers: data
  }
}

export function getMemberSuccess(data: any) {
  return {
    type: GET_MEMBER_SUCCESS,
    eventMembers: data
  }
}

export function deleteMemberSuccess(data: any) {
  return {
    type: DELETE_MEMBER_SUCCESS,
  }
}

export function selectPaymentMethod(paymentMethod: PaymentMethod) {
  return {
    type: SET_SELECTED_PAYMENT_METHOD,
    paymentMethod
  }
}


export function setPaymentMethodLoading() {
  return {
    type: SET_PAYMENT_METHOD_LOADING,
  }
}

export function setDashBoardInfoLoading() {
  return {
    type: SET_DASHBOARD_INFO_LOADING,
  }
}


export function getMyProfile() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/profile`,
        });
        if (res.status === 200) {
          dispatch(getMyProfileSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      }
    }
  }
}

export function getStripeDashboardLink() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/auth/stripe/dashboard`,
        });
        if (res.status === 200) {
          dispatch(getStripeDashboardSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      }
    }
  }
}

export function getPaymentMethods() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      dispatch(handleSpinner(true, 'Loading...'));
      try {
        dispatch(setPaymentMethodLoading());
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/payment-methods/fetch`,
        });
        if (res.status === 200) {
          console.log('====get payment memthod is success!===')
          dispatch(getPaymentMethodsSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      } finally {
        dispatch(handleSpinner(false, ''));
      }
    }
  }
}

export function getGiftsReceived() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/gifts/received-gifts?paginate=false`,
        });
        if (res.status === 200) {
          dispatch(getGiftsReceivedSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      }
    }
  }
}


export function getTransactions() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      dispatch(handleSpinner(true, 'Loading...'));
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/transactions`,
        });
        if (res.status === 200) {
          dispatch(getTransactionsSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      } finally {
        dispatch(handleSpinner(false, ''));
      }
    }
  }
}

export function getContactList() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/contacts?paginate=false`,
        });
        if (res.status === 200) {
          dispatch(getContactListSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      }
    }
  }
}

export function getFavoriteContactList() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/contacts/favourites`,
        });
        if (res.status === 200) {
          dispatch(getFavoriteContactListSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      }
    }
  }
}


export const getFilteredContactList = (
  search: string,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            "search[value]": search,
            "paginate": false
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/contacts?paginate=false`,
        });
        if (res.status === 200) {
          dispatch(getContactListSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      }
    }
  }
}

export function getDashBoardInfo() {
  return async (dispatch: any, getState: any) => {
    dispatch(setDashBoardInfoLoading());
    const token = getState().auth.token;
    if (token) {
      dispatch(handleSpinner(true, 'Loading...'));
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/dashboard`,
        });
        if (res.status === 200) {
          dispatch(getDashboardInfoSuccess(res.data));
          dispatch(clearTransactionDetailSuccess());
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      } finally {
        dispatch(handleSpinner(false, ''));
      }
    }
  }
}

export function getEventList() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      dispatch(handleSpinner(true, 'Loading...'));
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/events?paginate=false`,
        });
        if (res.status === 200) {
          dispatch(getEventListSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      } finally {
        dispatch(handleSpinner(false, ''));
      }
    }
  }
}

export function getAllEventList() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      dispatch(handleSpinner(true, 'Loading...'));
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/events/all`,
        });
        if (res.status === 200) {
          dispatch(getAllEventListSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      } finally {
        dispatch(handleSpinner(false, ''));
      }
    }
  }
}

export function getInvitedEventList() {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      dispatch(handleSpinner(true, 'Loading...'));
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/events/invited`,
        });
        if (res.status === 200) {
          dispatch(getInvitedEventListSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      } finally {
        dispatch(handleSpinner(false, ''));
      }
    }
  }
}

export const getFilteredEventList = (
  search: string,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            "search[value]": search,
            "paginate": false
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/events`,
        });
        if (res.status === 200) {
          dispatch(getEventListSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      }
    }
  }
}

export function getGiftCategories() {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/constants/gift-categories?card_type_id=1`,
      });
      if (res.status === 200) {
        dispatch(getGiftCategoriesSuccess(res.data));
      }
      if (res.status === 401) {
        dispatch(authLogout());
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(authLogout());
      }
      console.log(error);
    }
  }
}

export function getGiftCategories2() {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/constants/gift-categories?card_type_id=2`,
      });
      if (res.status === 200) {
        dispatch(getGiftCategoriesSuccess(res.data));
      }
      if (res.status === 401) {
        dispatch(authLogout());
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(authLogout());
      }
      console.log(error);
    }
  }
}


export function getGiftColors() {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/constants/gift-colors`,
      });
      if (res.status === 200) {
        dispatch(getGiftColorsSuccess(res.data));
      }
      if (res.status === 401) {
        dispatch(authLogout());
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(authLogout());
      }
      console.log(error);
    }
  }
}

export function getEventTypes() {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/constants/event-types`,
      });
      if (res.status === 200) {
        dispatch(getEventTypesSuccess(res.data));
      }
      if (res.status === 401) {
        dispatch(authLogout());
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(authLogout());
      }
      console.log(error);
    }
  }
}

export function getCurrencyTypes() {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/constants/currency-types`,
      });
      if (res.status === 200) {
        dispatch(getCurrencyTypesSuccess(res.data));
      }
      if (res.status === 401) {
        dispatch(authLogout());
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(authLogout());
      }
      console.log(error);
    }
  }
}

export function getGiftFonts() {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/constants/gift-fonts`,
      });
      if (res.status === 200) {
        dispatch(getGiftFontsSuccess(res.data));
      }
      if (res.status === 401) {
        dispatch(authLogout());
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(authLogout());
      }
      console.log(error);
    }
  }
}

export function getCardTypes() {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/constants/card-types`,
      });
      if (res.status === 200) {
        dispatch(getCardTypesSuccess(res.data));
      }
      if (res.status === 401) {
        dispatch(authLogout());
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(authLogout());
      }
      console.log(error);
    }
  }
}

export function getGiftPictures(id: number) {
  return async (dispatch: any, getState: any) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/constants/gift-pictures?gift_categories_id=${id}&is_custom=true`,

      });
      if (res.status === 200) {
        dispatch(getGiftPicturesSuccess(res.data));
      }
      if (res.status === 401) {
        dispatch(authLogout());
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(authLogout());
      }
      console.log(error);
    }
  }
}

export function getCustomPictures(id: number) {
  return async (dispatch: any, getState: any) => {
    dispatch(handleSpinner(true, 'Loading...'));
    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/constants/gift-pictures?gift_categories_id=${id}&is_custom=true`,

      });
      if (res.status === 200) {
        dispatch(getGiftPicturesSuccess(res.data));
      }
      if (res.status === 401) {
        dispatch(authLogout());
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(authLogout());
      }
      console.log(error);
    } finally {
      dispatch(handleSpinner(false, ''));
    }
  }
}

export function getCustomPicturesCard(id: number) {
  return async (dispatch: any, getState: any) => {
    dispatch(handleSpinner(true, 'Loading...'));
    try {
      const res = await axios({
        method: 'get',
        url: `${API_ENDPOINT}/constants/gift-pictures?gift_categories_id=${id}&is_custom=false`,

      });
      if (res.status === 200) {
        dispatch(getGiftPicturesSuccess(res.data));
      }
      if (res.status === 401) {
        dispatch(authLogout());
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(authLogout());
      }
      console.log(error);
    } finally {
      dispatch(handleSpinner(false, ''));
    }
  }
}

export function getTransactionDetail(id: number) {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      dispatch(handleSpinner(true, 'Loading...'));
      dispatch(clearTransactionDetailSuccess());
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/transactions/${id}/detail`,

        });
        if (res.status === 200) {
          console.log('load transaction detail');
          console.log(res.data);
          dispatch(getTransactionDetailSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      } finally {
        dispatch(handleSpinner(false, ''));
      }
    }
  }
}


export function getEventDetail(id: number) {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    dispatch(handleSpinner(true, 'Loading...'));
    try {
      const res = await axios({
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: 'get',
        url: `${API_ENDPOINT}/users/events/${id}/fetch`,
      });
      if (res.status === 200) {
        dispatch(getEventDetailSuccess(res.data));
      }
      if (res.status === 401) {
        dispatch(authLogout());
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(authLogout());
      }
      console.log(error);
    } finally {
      dispatch(handleSpinner(false, ''));
    }
  }
}


export const addContact = (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  isFavourite: boolean
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      is_favourite: isFavourite
    };

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/contacts/add`,
          data: payload,
        });
        if (res.status === 200) {
          dispatch(addContactSuccess(res.data));
          dispatch(setContactInfo(res.data));
          dispatch(getFavoriteContactList());
          dispatch(getContactList());
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      }
    }
  };
};

export const addContactWithoutEmail = (
  firstName: string,
  lastName: string,
  phone: string,
  isFavourite: boolean
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      is_favourite: isFavourite
    };

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/contacts/add`,
          data: payload,
        });
        if (res.status === 200) {
          dispatch(addContactSuccess(res.data));
          dispatch(setContactInfo(res.data));
          dispatch(getFavoriteContactList())
          dispatch(getContactList());
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      }
    }
  };
};

export const addContactWithoutPhone = (
  firstName: string,
  lastName: string,
  email: string,
  isFavourite: boolean
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      is_favourite: isFavourite
    };

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/contacts/add`,
          data: payload,
        });
        if (res.status === 200) {
          dispatch(addContactSuccess(res.data));
          dispatch(setContactInfo(res.data));
          dispatch(getFavoriteContactList())
          dispatch(getContactList());
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      }
    }
  };
};

export const updateContact = (
  contactId: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  isFavourite: boolean
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      phone: phone,
      is_favourite: isFavourite
    };

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/contacts/${contactId}/update`,
          data: payload,
        });
        if (res.status === 200) {
          dispatch(updateContactSuccess(res.data));
          dispatch(getFavoriteContactList())
          dispatch(getContactList());
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      }
    }
  };
};

export const updateContactWithoutPhone = (
  contactId: number,
  firstName: string,
  lastName: string,
  email: string,
  isFavourite: boolean
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      is_favourite: isFavourite
    };

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/contacts/${contactId}/update`,
          data: payload,
        });
        if (res.status === 200) {
          dispatch(updateContactSuccess(res.data));
          dispatch(getFavoriteContactList())
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      }
    }
  };
};

export const updateContactWithoutEmail = (
  contactId: number,
  firstName: string,
  lastName: string,
  phone: string,
  isFavourite: boolean
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      is_favourite: isFavourite
    };

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/contacts/${contactId}/update`,
          data: payload,
        });
        if (res.status === 200) {
          dispatch(updateContactSuccess(res.data));
          dispatch(getFavoriteContactList())
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      }
    }
  };
};

export const generateToken = (
  cardNumber: string,
  expMonth: string,
  expYear: string,
  cvc: string,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      number: cardNumber,
      exp_month: expMonth,
      exp_year: expYear,
      cvc: cvc,
    };

    console.log(payload);

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/payment-methods/generate-token`,
          data: payload,
        });
        if (res.status === 200) {
          console.log(res.data);
          dispatch(generateTokenSuccess(res.data));
        } 
        if (res.status === 401) {
          dispatch(authLogout());
        } else {
          console.log('======failed======');
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        if (error.response.data.error) {
          dispatch(handleMessage(true, 'error', error.response.data.error));  
        } else {
          dispatch(handleMessage(true, 'error', 'Sorry, your token could not be created! Please, make sure you entered the right details.'));
        }
      }
    }
  };
};

export const generateTokenBank = (
  routingNumber: string,
  accountHolderName: string,
  accountHolderType: string,
  accountNumber: string,
  currency: string,
  country: string,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      routing_number: routingNumber,
      account_holder_name: accountHolderName,
      account_holder_type: accountHolderType,
      account_number: accountNumber,
      currency: currency,
      country: country,
    };

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/payment-methods/generate-token/bank`,
          data: payload,
        });
        if (res.status === 200) {
          console.log('=========Bank token success========')
          console.log(res.data);
          dispatch(generateTokenBankSuccess(res.data));
        }  if (res.status === 401) {
          dispatch(authLogout());
        } else {
          console.log('======failed======');
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        if (error.response.data.error) {
          dispatch(handleMessage(true, 'error', error.response.data.error));  
        } else {
          dispatch(handleMessage(true, 'error', 'Sorry, your token could not be created! Please, make sure you entered the right details.'));
        }
      }
    }
  };
};

export const addPaymentMethods = (
  paymentToken: string
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      payment_token: paymentToken
    };

    console.log(payload);

    if (token) {
      dispatch(handleSpinner(true, 'Loading...'));
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/payment-methods/add`,
          data: payload,
        });
        if (res.status === 200) {
          dispatch(addPaymentMethodSuccess(res.data));
          dispatch(getPaymentMethods());
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        if (error.response.data.error) {
          dispatch(handleMessage(true, 'error', error.response.data.error));  
        } else {
          dispatch(handleMessage(true, 'error', 'Sorry, your card could not be created!'));
        }
      } finally {
        dispatch(handleSpinner(false, ''));
      }
    } 
  };
};

export const verifyBankAccount = (
  stripe_token_id: string,
  deposit: any
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      stripe_token_id: stripe_token_id,
      deposit: deposit
    };

    console.log(payload);

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/payment-methods/verify-bank-account`,
          data: payload,
        });
        if (res.status === 200) {
          dispatch(verifyBankAccountSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        if (error.response.data.error) {
          dispatch(handleMessage(true, 'error', error.response.data.error));  
        } else {
          dispatch(handleMessage(true, 'error', 'Sorry, Verification failed!'));
        }
      }
    }
  };
};

export const transactionsSend = (
  giftId: number,
  senderIntentSourceId: string
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      sender_intent_source_id: senderIntentSourceId
    };
    console.log('============payload=========');
    console.log(payload);

    if (token) {
      dispatch(handleSpinner(true, 'Loading...'));
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/transactions/${giftId}/send`,
          data: payload,
        });
        if (res.status === 200) { 
          console.log('=========response======');    
          console.log(res.data);
          dispatch(transactionSendSuccess(res.data));
          dispatch(getDashBoardInfo())
          dispatch(getTransactions())
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
        dispatch(transactionSendFailed());
      } finally {
        dispatch(handleSpinner(false, ''));
      }
    }
  };
};

export const contactUs = (
  subject: string,
  message: string
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      subject: subject,
      message: message
    };

    if (token) {
      dispatch(handleSpinner(true, 'Loading...'));
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/support/contact-us`,
          data: payload,
        });
        if (res.status === 200) { 
          console.log('=========response======');    
          console.log(res.data);
          dispatch(contactUsSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      } finally {
        dispatch(handleSpinner(false, ''));
      }
    }
  };
};

export const deletePaymentMethod = (
  stripeTokenId: string
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      stripe_token_id: stripeTokenId
    };

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'delete',
          url: `${API_ENDPOINT}/users/payment-methods/delete`,
          data: payload,
        });
        if (res.status === 200) {
          dispatch(deletePaymentMethodSuccess(stripeTokenId));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      }
    }
  };
};

export const deleteContact = (
  contactId: number
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'delete',
          url: `${API_ENDPOINT}/users/contacts/${contactId}/delete`,
        });
        if (res.status === 200) {
          dispatch(deleteContactSuccess(contactId));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      }
    }
  };
};

export const addGift = (
  card_type_id: number,
  gift_categories_id: number,
  gift_pictures_id: number,
  gift_colors_id: number,
  gift_primary_fonts_id: number,
  gift_secondary_fonts_id: number,
  amount: number,
  contacts_id: number,
  message: string,
  stripe_token_id: string
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      card_type_id: card_type_id,
      gift_categories_id: gift_categories_id,
      gift_pictures_id: gift_pictures_id,
      gift_colors_id: gift_colors_id,
      gift_primary_fonts_id: gift_primary_fonts_id,
      gift_secondary_fonts_id: gift_secondary_fonts_id,
      amount: amount,
      contacts_id: contacts_id,
      message: message,
      sender_intent_source_id: stripe_token_id
    };

    console.log(payload);

    if (token) {
      dispatch(handleSpinner(true, 'Loading...'));
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/gifts/add`,
          data: payload,
        });
        if (res.status === 200) { 
          console.log('=======Gift Added===========')       
          dispatch(addGiftSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      } finally {
        dispatch(handleSpinner(false, ''));
      }
    }
  };
};

export const addDesignedGift = (
  card_type_id: number,
  gift_categories_id: number,
  gift_pictures_id: number,
  amount: number,
  contacts_id: number,
  stripe_token_id: string
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      card_type_id: card_type_id,
      gift_categories_id: gift_categories_id,
      gift_pictures_id: gift_pictures_id,
      amount: amount,
      contacts_id: contacts_id,
      sender_intent_source_id: stripe_token_id
    };

    console.log(payload);

    if (token) {
      dispatch(handleSpinner(true, 'Loading...'));
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/gifts/add`,
          data: payload,
        });
        if (res.status === 200) { 
          console.log('=======Gift Added===========')       
          dispatch(addGiftSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        console.log(error);
      } finally {
        dispatch(handleSpinner(false, ''));
      }
    }
  };
};

export const importContactInfoList = (
  formData: any
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;

    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/contacts/import`,
          data: formData,
        });
        if (res.status === 200) { 
          console.log('=======Contacts Imported===========')       
          dispatch(importContactsSuccess(res.data));
          dispatch(getContactList());
          dispatch(handleMessage(true, 'success', 'Contacts successfully imported'));  
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        if (error.response.data.error) {
          dispatch(handleMessage(true, 'error', error.response.data.error));  
        } else {
          console.log('error');
        }
      }
    }
  };
};

export const setGiftInfo = (giftInfo: any) => {
  return {
    type: SET_GIFT_INFO,
    giftInfo
  };
}

export const setStripeTokenId = (stripeTokenId: any) => {
  return {
    type: SET_STRIPE_TOKEN_ID,
    stripeTokenId
  };
}

export const setContactInfo = (contactInfo: any) => {
  return {
    type: SET_CONTACT_INFO,
    contactInfo
  };
}

export const setImportedContactInfo = (importedContactInfo: any) => {
  return {
    type: SET_IMPORTED_CONTACT_INFO,
    importedContactInfo
  };
}

export const setMembersInfo = (membersInfo: number[]) => {
  return {
    type: SET_MEMBERS_INFO,
    membersInfo
  };
}

export const setThankyouMembersInfo = (thankyouMembersInfo: number[]) => {
  return {
    type: SET_THANK_YOU_MEMBERS_INFO,
    thankyouMembersInfo
  };
}

export const setEventMembersInfo = (eventMembers: any) => {
  return {
    type: SET_EVENT_MEMBERS_INFO,
    eventMembers
  };
}

export const setDateInfo = (dateInfo: string) => {
  return {
    type: SET_DATE_INFO,
    dateInfo
  };
}


export const addEvent = (
  name: string,
  event_date: string,
  event_type_id: number,
  message: string,
  membersInfo: number[]
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      name: name,
      event_date: event_date,
      event_type_id: event_type_id,
      message: message,
      members: membersInfo
    };

    dispatch({
      type: EVENT_LOADING,
    })
    
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/events/add`,
          data: payload,
        });
        if (res.status === 200) { 
          dispatch(addEventSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        dispatch({
          type: EVENT_FAILED,
        })
        console.log(error);
      }
    }
  };
};

export const addThankyou = (
  eventId: number,
  stripe_token_id: string
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      events_id: eventId,
      sender_intent_source_id: stripe_token_id
    };

    dispatch({
      type: THANK_YOU_LOADING,
    })
    
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/thank-you/add`,
          data: payload,
        });
        if (res.status === 200) { 
          console.log(res.data);
          dispatch(addThankyouSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        dispatch({
          type: THANK_YOU_FAILED,
        })
        console.log(error);
      }
    }
  };
};

export const addThankyouToContract = (
  members: any,
  stripe_token_id: string
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      members: members,
      sender_intent_source_id: stripe_token_id
    };

    dispatch({
      type: THANK_YOU_LOADING,
    })
    
    if (token) {
      dispatch(handleSpinner(true, 'Loading...'));
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/thank-you/add`,
          data: payload,
        });
        if (res.status === 200) { 
          console.log(res.data);
          dispatch(addThankyouSuccess1(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        dispatch({
          type: THANK_YOU_FAILED,
        })
        console.log(error);
      } finally {
        dispatch(handleSpinner(false, ''));
      }
    }
  };
};


export const addThankyouWithMessage = (
  eventId: number,
  message: string,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      events_id: eventId,
      message: message
    };

    console.log(payload);

    dispatch({
      type: THANK_YOU_LOADING,
    })
    
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/thank-you/add`,
          data: payload,
        });
        if (res.status === 200) { 
          dispatch(addThankyouSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        dispatch({
          type: THANK_YOU_FAILED,
        })
        console.log(error);
      }
    }
  };
};

export const updateThankyou = (
  thanksId: number,
  message: string,
) => {
  console.log(thanksId);
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      message: message
    };

    dispatch({
      type: THANK_YOU_LOADING,
    })
    
    if (token) {
      dispatch(handleSpinner(true, 'Loading...'));
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/thank-you/${thanksId}/update`,
          data: payload,
        });
        if (res.status === 200) { 
          dispatch(updateThankyouSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        dispatch({
          type: THANK_YOU_FAILED,
        })
        console.log(error);
      } finally {
        dispatch(handleSpinner(false, ''));
      }
    }
  };
};

export const setMembersThankyou = (
  thanksId: number,
  membersInfo: number[],
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      members: membersInfo,
    };

    console.log(payload);

    dispatch({
      type: THANK_YOU_LOADING,
    })
    
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/thank-you/${thanksId}/members/set`,
          data: payload,
        });
        if (res.status === 200) { 
          dispatch(setMembersThankyouSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        dispatch({
          type: THANK_YOU_FAILED,
        })
        console.log(error.response.data);
        if (error.response.data.error) {
          dispatch(handleMessage(true, 'error', error.response.data.error));  
        } else {
          dispatch(handleMessage(true, 'error', 'Some contacts do not have an email to receive it.'));
        }
      }
    }
  };
};

export const payThankyou = (
  thanksId: number,
  stripe_token_id: string
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      sender_intent_source_id: stripe_token_id
    };
    if (token) {
      dispatch(handleSpinner(true, 'Loading...'));
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/thank-you/${thanksId}/pay`,
          data: payload,
        });
        if (res.status === 200) { 
          dispatch(payThankyouSuccess());
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        dispatch({
          type: PAY_THANK_YOU_FAILED,
        })
        if (error.response.data.error) {
          dispatch(handleMessage(true, 'error', error.response.data.error));  
        } else {
          dispatch(handleMessage(true, 'error', 'Sorry, but you can not pay for this Thank You card'));
        }
      } finally {
        dispatch(handleSpinner(false, ''));
      }
    }
  };
};



export const updateEvent = (
  eventId: number,
  name: string,
  event_date: string,
  event_type_id: number,
  message: string,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      name: name,
      event_date: event_date,
      event_type_id: event_type_id,
      message: message
    };

    dispatch({
      type: EVENT_LOADING,
    })
    
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/events/${eventId}/update`,
          data: payload,
        });
        if (res.status === 200) { 
          dispatch(updateEventSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        dispatch({
          type: EVENT_FAILED,
        })
        console.log(error);
      }
    }
  };
};

export const addMember = (
  eventId: number,
  membersInfo: number[]
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      contacts_id: membersInfo
    };

    console.log(payload);
    
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/events/${eventId}/members/add`,
          data: payload,
        });
        if (res.status === 200) { 
          dispatch(addMemberSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        dispatch({
          type: EVENT_FAILED,
        })
        console.log(error);
      }
    }
  };
};

export const setMember = (
  eventId: number,
  membersInfo: number[]
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    const payload = {
      contacts_id: membersInfo
    };

    console.log(eventId);
    console.log(payload);
    
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'post',
          url: `${API_ENDPOINT}/users/events/${eventId}/members/set`,
          data: payload,
        });
        if (res.status === 200) { 
          dispatch(handleMessage(true, 'success', 'Invited members have been updated')); 
          dispatch(setMemberSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        dispatch({
          type: EVENT_FAILED,
        })
        console.log(error);
      }
    }
  };
};

export const getMembers = (
  eventId: number,
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'get',
          url: `${API_ENDPOINT}/users/events/${eventId}/members`,
        });
        if (res.status === 200) { 
          dispatch(getMemberSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        dispatch({
          type: EVENT_FAILED,
        })
        console.log(error);
      }
    }
  };
};

export const deleteMember = (
  eventId: number,
  eventMemberId: number
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;
    
    if (token) {
      try {
        const res = await axios({
          headers: {
            Authorization: `Bearer ${token}`
          },
          method: 'delete',
          url: `${API_ENDPOINT}/users/events/${eventId}/members/${eventMemberId}/delete`,
        });
        if (res.status === 200) { 
          dispatch(deleteMemberSuccess(res.data));
        }
        if (res.status === 401) {
          dispatch(authLogout());
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          dispatch(authLogout());
        }
        dispatch({
          type: EVENT_FAILED,
        })
        console.log(error);
      }
    }
  };
};

export const setEventInfo = (eventInfo: Event) => {
  return {
    type: SET_EVENT_INFO,
    eventInfo
  };
}

export const clearTransactionDetailSuccess = () => {
  return {
    type: CLEAR_TRANSACTION_DETAIL_SUCCESS,
  };
}

export const setThanksNoteInfo = (thanksNoteInfo: any) => {
  return {
    type: SET_THANKS_NOTE_INFO,
    thanksNoteInfo
  };
}

export const setEventDetailInfo = (eventDetailInfo: EventDetailInfo) => {
  return {
    type: SET_EVENT_DETAIL_INFO,
    eventDetailInfo
  };
}

export const clearPaymentMethodState = () => {
  return {
    type: CLEAR_PAYMENT_METHOD_STATE,
  };
}

export const clearContactUsState = () => {
  return {
    type: CLEAR_CONTACT_US_STATE,
  };
}

export const clearStripeDashboardInfo = () => {
  return {
    type: CLEAR_STRIPE_DASHBOARD_INFO,
  };
}

export const clearTransactionState = () => {
  return {
    type: CLEAR_TRANSACTION_STATE,
  };
}

export const clearThanksState = () => {
  return {
    type: CLEAR_THANKS_STATE,
  };
}

export const clearContactState = () => {
  return {
    type: CLEAR_CONTACT_STATE,
  };
}

export const clearDeleteContactState = () => {
  return {
    type: CLEAR_DELETE_CONTACT_STATE,
  };
}

export const clearEventState = () => {
  return {
    type: CLEAR_EVENT_STATE,
  };
}

export const clearThanksNoteState = () => {
  return {
    type: CLEAR_THANKS_NOTE_STATE,
  };
}
