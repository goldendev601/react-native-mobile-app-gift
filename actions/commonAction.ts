export const HANDLE_MESSAGE = 'HANDLE_MESSAGE';
export const HANDLE_SPINNER = 'HANDLE_SPINNER';

export function handleMessage(messageShow: boolean, messageType: string, messageContent: string) {
  return {
    type: HANDLE_MESSAGE,
    messageShow,
    messageType,
    messageContent,
  };
}

export function handleSpinner(spinnerShow: boolean, spinnerText: string) {
  return {
    type: HANDLE_SPINNER,
    spinnerShow,
    spinnerText,
  };
}
