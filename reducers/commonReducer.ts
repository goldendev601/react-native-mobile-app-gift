import {
  HANDLE_MESSAGE,
  HANDLE_SPINNER
} from '../actions/commonAction';

export const commonInitialState = {
  messageShow: false,
  messageType: 'success',
  messageContent: '',
  spinnerShow: false,
  spinnerText: '',
};

export function commonReducer(state = commonInitialState, action: any) {
  switch (action.type) {
    case HANDLE_MESSAGE:
      const { messageShow, messageType, messageContent } = action;

      if (messageShow) {
        return {
          ...state,
          messageShow: true,
          messageType,
          messageContent,
        };
      } else {
        return {
          ...state,
          messageShow: false,
          messageType: 'success',
          messageContent: '',
        };
      }

    case HANDLE_SPINNER:
      const { spinnerShow, spinnerText } = action;

      if (spinnerShow) {
        return {
          ...state,
          spinnerShow: true,
          spinnerText,
        };
      } else {
        return {
          ...state,
          spinnerShow: false,
          spinnerText: '',
        };
      }

    default:
      return state;
  }
}
