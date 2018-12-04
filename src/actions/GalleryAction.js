import * as types from '../constants/actionTypes';

export function addAlbum(album) {
  return {
    type: types.ADD_GALLERY_ITEM,
    payload: album
  };
}

export function togglePopupById(status) {
  return {
    type: types.TOGGLE_POPUP,
    payload: status
  };
}

export function setFilter(value) {
  return {
    type: types.SET_FILTER,
    payload: value
  };
}