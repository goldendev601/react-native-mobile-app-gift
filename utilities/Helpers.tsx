/**
 * Utility Functions
 * Custom Hooks
 */

export const isValidEmail = (email: string) => {
  if (!email)
    return false;

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const isValidMobileNumber = (mobileNumber: string) => {
  if (!mobileNumber)
    return false;

  // const re = /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/;
  const re = /^\d+$/;
  return re.test(String(mobileNumber).toLowerCase());
}

export const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];
