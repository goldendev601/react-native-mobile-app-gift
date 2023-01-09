export const SET_DRAWER_INDEX = "SET_DRAWER_INDEX";

// Define Action Types
export const GET_CONTACT_LIST_SUCCESS = 'GET_CONTACT_LIST_SUCCESS';

// End of Action Types

export function setDrawerItemIndex(index: number) {
  return {
    type: SET_DRAWER_INDEX,
    drawerItemIndex: index,
  };
}
