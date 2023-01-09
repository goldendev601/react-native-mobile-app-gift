import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
  authReducer,
  appReducer,
  kycReducer,
  accountReducer,
  equityReducer,
  commonReducer,
  giftAppReducer,
} from '../reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  kyc: kycReducer,
  account: accountReducer,
  equity: equityReducer,
  common: commonReducer,
  giftApp: giftAppReducer
});

const configureStore = () => {
  return createStore(
    rootReducer, /* preloadedState, */
    compose(applyMiddleware(thunkMiddleware)),
  );
};

export default configureStore;
