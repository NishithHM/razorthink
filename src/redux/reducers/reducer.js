import { RANDOM_PHOTO, SEARCH_PHOTO, DOWNLOAD } from "../types";

const initialState = {
  randomPhoto: "",
  photos: {},
  downloadURL:''
};

export default (state = initialState, action) => {
  const { type, payload, update } = action;
  switch (type) {
    case RANDOM_PHOTO:
      return {
        ...state,
        randomPhoto: payload,
      };
      case SEARCH_PHOTO:{
        let photos;
        if(update){
          console.log(state)
          photos = {
              ...state.photos,
              results: [...state.photos.results, ...payload.results]
          }
        }
        else{
          photos = payload
        }
        console.log(photos)
        return{
          ...state,
          photos
        }
      }
      case DOWNLOAD:
        return{
          ...state,
          downloadURL: payload
        }
    default:
      return state;
  }
};
