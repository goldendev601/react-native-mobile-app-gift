import { 
  SET_DRAWER_INDEX, 
  GET_CONTACT_LIST_SUCCESS 
} from '../actions/appAction';

export const appInitialState = {
  drawerItemIndex: 0,
};

export function appReducer(
  state = appInitialState,
  action: { drawerItemIndex: number; type: string }
) {
  switch (action.type) {
    case SET_DRAWER_INDEX:
      return {
        ...state,
        drawerItemIndex: action.drawerItemIndex,
      };

    default:
      return state;
  }
}
