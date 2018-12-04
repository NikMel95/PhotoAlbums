import * as types from '../constants/actionTypes';

export function login(user) {
  return {
    type: types.SET_USER,
    payload: user
  };
}

export function logout() {
  return {
    type: types.SET_USER,
    payload: {}
  };
}