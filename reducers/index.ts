import { authInitialState } from './authReducer';
import { appInitialState } from './appReducer';
import { kycInitialState } from './kycReducer';
import { accountInitialState } from './accountReducer';
import { equityInitialState } from './equityReducer';
import { commonInitialState } from './commonReducer';
import { giftAppInitialState } from './giftAppReducer';

export interface IRootState {
  auth: typeof authInitialState;
  app: typeof appInitialState;
  kyc: typeof kycInitialState;
  account: typeof accountInitialState;
  equity: typeof equityInitialState;
  common: typeof commonInitialState;
  giftApp: typeof giftAppInitialState;
}

export * from './appReducer';
export * from './authReducer';
export * from './kycReducer';
export * from './accountReducer';
export * from './equityReducer';
export * from './commonReducer';
export * from './giftAppReducer';
