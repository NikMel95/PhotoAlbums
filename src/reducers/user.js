import * as types from '../constants/actionTypes';

const userState = {
  user: {
    name: '',
    email: '',
    isAuth: false,
  }
};

function userReducer(state = userState, action) {
  switch (action.type) {
    case types.SET_USER:
      return { ...state, user: action.payload }

    default:
      return state;
  }
}
export default userReducer;