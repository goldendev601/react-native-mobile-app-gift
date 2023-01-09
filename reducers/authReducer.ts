import {
  AUTH_LOGIN_USER_REQUEST,
  AUTH_LOGIN_USER_SUCCESS,
  AUTH_LOGIN_USER_IN_REGISTER_SUCCESS,
  AUTH_LOGIN_USER_FAILURE,
  AUTH_LOGOUT_USER,
  REGISTER_USER,
  VALIDATE_USER,
  VALIDATE_USER_FAILED,
  SENT_VERIFICTION_CODE,
  RESET_PASSWORD,
  UPDATE_PASSWORD,
  AUTH_UPDATE_USER_INFO,
  SET_ACCOUNT_INFO,
  SET_TOKEN_INFO,
  STRIPE_LINK,
  RESET_REGISTER_FLAG,
  CLEAR_AUTH_STATE,
  EMAIL_AVAILABLE,
  EMAIL_NOT_AVAILABLE,
  CLEAR_EMAIL_AVAILABILITY_FLAG,
  CLEAR_PHONE_AVAILABILITY_FLAG,
  GET_PROFILE_INFO_SUCCESS,
  MAKE_AUTHENTICATED,
  PHONE_AVAILABLE,
  PHONE_NOT_AVAILABLE
} from '../actions/authActions';

import { 
  ADD_PAYMENT_METHOD_SUCCESS, 
  GENERATE_TOKEN_SUCCESS, 
  GET_MY_PROFILE_SUCCESS 
} from '../actions/giftAppAction';

export const authInitialState = {
  token: null,
  user: {
    name: '',
    email: '',
    phone: '',
    user_stripe_account: '',
    status: ''
  },
  isEmailAvailableConfirmed: false,
  isEmailNotAvailableConfirmed: false,
  isCheckedEmail: false,
  isPhoneAvailableConfirmed: false,
  isPhoneNotAvailableConfirmed: false,
  isCheckedPhone: false,
  isAuthenticated: false,
  isAuthenticationFailed: false,
  isAuthenticatedInRegister: false,
  isAuthenticating: false,
  isRegistered: false,
  isValidated: false,
  isValidatedFailed: false,
  isSentVerificationCode: false,
  isSentLink: false,
  isUpdatedPassword: false,
  accountInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    value: ''
  },
  stripeUrl: '',
  userStatus: '',
  isPaymentTokenGeneratedSuccess: false,
  isAddingPaymentMethodSuccess: false,
  isDeletePaymentMethodSuccess: false,
  userInfo: {
    access_token: '',
    user: {}
  },
  tokenInfo: null,
  profileInfo: null
};

export function authReducer(state = authInitialState, action: any) {
  switch (action.type) {
    case AUTH_LOGIN_USER_REQUEST:
      return {
        ...state,
        isAuthenticating: true,
      };

    case MAKE_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: true,
      };

    case EMAIL_AVAILABLE:
      return {
        ...state,
        isEmailAvailableConfirmed : true,
        isEmailNotAvailableConfirmed : false,
        isCheckedEmail: true
      }

    case EMAIL_NOT_AVAILABLE:
      return {
        ...state,
        isEmailNotAvailableConfirmed : true,
        isEmailAvailableConfirmed : false,
        isCheckedEmail: true
      }

    case PHONE_AVAILABLE:
      return {
        ...state,
        isPhoneAvailableConfirmed : true,
        isPhoneNotAvailableConfirmed : false,
        isCheckedPhone: true
      }

    case PHONE_NOT_AVAILABLE:
      return {
        ...state,
        isPhoneNotAvailableConfirmed : true,
        isPhoneAvailableConfirmed : false,
        isCheckedPhone: true
      }

    case AUTH_LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        isAuthenticationFailed: false,
        token: action.token,
        user: action.user,
        userStatus: action.user.status,
        stripeUrl: '',
        isPaymentTokenGeneratedSuccess: false,
        isAddingPaymentMethodSuccess: false,
        isDeletePaymentMethodSuccess: false,
        isEmailAvailableConfirmed: false,
        isEmailNotAvailableConfirmed: false,
      };

    case AUTH_LOGIN_USER_IN_REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticationFailed: false,
        isAuthenticatedInRegister: true,
        token: action.token,
        user: action.user,
        userStatus: action.user.status,
        stripeUrl: '',
        isPaymentTokenGeneratedSuccess: false,
        isAddingPaymentMethodSuccess: false,
        isDeletePaymentMethodSuccess: false,
        isEmailAvailableConfirmed: false,
        isEmailNotAvailableConfirmed: false,
      };
  

    case AUTH_LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
        isAuthenticationFailed: true,
        isAuthenticatedInRegister: false,
        token: null,
      };

    case GET_MY_PROFILE_SUCCESS:
      return {
          ...state,
          user: action.myProfile
      };

    case GET_PROFILE_INFO_SUCCESS:
      return {
          ...state,
          profileInfo: action.myProfile
      };

    case AUTH_LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        isAuthenticationFailed: false,
        isAuthenticatedInRegister: false,        
        token: null,
        userStatus: '',
        isRegistered: false,
        profileInfo: null,
      };

    case AUTH_UPDATE_USER_INFO:
      return {
        ...state,
        user: action.user
      };

    case REGISTER_USER:
      return {
        ...state,
        isRegistered: true,
        stripeUrl: '',
        isPaymentTokenGeneratedSuccess: false,
        isAddingPaymentMethodSuccess: false,
        isDeletePaymentMethodSuccess: false,
        isEmailAvailableConfirmed: false,
        isEmailNotAvailableConfirmed: false,
      };

    case VALIDATE_USER:
      return {
        ...state,
        isValidated: true,
        userInfo: action.userInfo
      };

    case VALIDATE_USER_FAILED:
      return {
        ...state,
        isValidatedFailed: true,
      };

    case SENT_VERIFICTION_CODE:
      return {
        ...state,
        isSentVerificationCode: true,
      };

    case RESET_PASSWORD:
      return {
        ...state,
        isSentLink: true,
      };

    case UPDATE_PASSWORD:
      return {
        ...state,
        isUpdatedPassword: true,
      };


    case SET_ACCOUNT_INFO:
      return {
        ...state,
        accountInfo: {
          ...state.accountInfo,
          ...action.accountInfo
        }
      }

    case RESET_REGISTER_FLAG:
      return {
        ...state,
        isRegistered: false,
        isSentVerificationCode: false
      }

    case CLEAR_AUTH_STATE:
      return {
        ...state,
        isSentLink: false,
        isUpdatedPassword: false,
        isRegistered: false,
        isEmailAvailableConfirmed: false,
        isEmailNotAvailableConfirmed: false,
        isAuthenticating: false,
        isAuthenticated: false,
        isAuthenticationFailed: false,
      }

    case CLEAR_EMAIL_AVAILABILITY_FLAG:
      return {
        ...state,
        isEmailAvailableConfirmed: false,
        isEmailNotAvailableConfirmed: false,
        isCheckedEmail: false
      }

    case CLEAR_PHONE_AVAILABILITY_FLAG:
      return {
        ...state,
        isPhoneAvailableConfirmed: false,
        isPhoneNotAvailableConfirmed: false,
        isCheckedPhone: false
      }

    case SET_TOKEN_INFO:
      return {
        ...state,
        tokenInfo: {
          ...action.tokenInfo
        },
        token: action.tokenInfo,
        user: action.user,
        userStatus: action.user.status,
        stripeUrl: '',
        isPaymentTokenGeneratedSuccess: false,
        isAddingPaymentMethodSuccess: false,
        isDeletePaymentMethodSuccess: false,
        isEmailAvailableConfirmed: false,
        isEmailNotAvailableConfirmed: false,
      }

    case STRIPE_LINK:
      return {
        ...state,
        stripeUrl: action.url
      }
    case GENERATE_TOKEN_SUCCESS:
        return {
            ...state,
            isPaymentTokenGeneratedSuccess: true,
            paymentToken: action.data.payment_token
        };

    case ADD_PAYMENT_METHOD_SUCCESS:
        return {
            ...state,
            isAddingPaymentMethodSuccess: true
        };
    default:
      return state;
  }
}
