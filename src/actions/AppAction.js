import * as types from '../constants/actionTypes';

export function setMainLoad(status) {
  return {
    type: types.SET_LOAD,
    payload: status
  };
}