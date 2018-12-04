import * as types from '../constants/actionTypes';

const galleryState = {
  albums: [],
  filter: ''
};

function galleryReducer(state = galleryState, action) {
  switch (action.type) {
    case types.ADD_GALLERY_ITEM:
      return { ...state, albums: state.albums.concat(action.payload) }

    case types.TOGGLE_POPUP:
      return { ...state, albums: state.albums.map((album) => {
          if(album.id === action.payload.id) {
            album.open = action.payload.show
            return album
          } else 
            return album
        }) 
      }

    case types.SET_FILTER:
      return { ...state, filter: action.payload.filter}

    default:
      return state;
  }
}
export default galleryReducer;