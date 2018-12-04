import * as types from '../constants/actionTypes';

const appState = {
  load: true
};

function appReducer(state = appState, action) {
  switch (action.type) {
    case types.SET_LOAD:
      return { ...state, load: action.payload }

    default:
      return state;
  }
}
export default appReducer;