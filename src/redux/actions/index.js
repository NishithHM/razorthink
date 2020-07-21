import unsplash from "../../services";
import { toJson } from "unsplash-js";
import { get } from "lodash";
import { RANDOM_PHOTO, SEARCH_PHOTO, DOWNLOAD } from "../types";


export const getRandomPhoto = () => {
  return (dispatch) => {
    unsplash.photos
      .getRandomPhoto()
      .then(toJson)
      .then((res) => {
        dispatch({
          type: RANDOM_PHOTO,
          payload: get(res, "urls.regular", ""),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const searchImage = (keyword, page = 1, update) => {
  return (dispatch) => {
    if (keyword)
      unsplash.search
        .photos(keyword, page, 9)
        .then(toJson)
        .then((res) => {
          dispatch({
            type: SEARCH_PHOTO,
            payload: res,
            update,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    else dispatch(getImageList(1));
  };
};

export const getImageList = (page = 1, update) => {
  console.log(page);
  return (dispatch) => {
    unsplash.photos
      .listPhotos(page, 9)
      .then(toJson)
      .then((res) => {
        dispatch({
          type: SEARCH_PHOTO,
          payload: {
            results: res,
          },
          update,
        });
      });
  };
};

export const downloadPhotoToDevice = (id) => {
  return (dispatch) => {
    unsplash.photos
      .getPhoto(id)
      .then(toJson)
      .then((json) => {
        console.log(json);
        unsplash.photos.downloadPhoto(json).then((res) => {
          console.log(res.blob().then(res=> console.log(res)))
          dispatch({
            type: DOWNLOAD,
            payload: res.url,
          });
        });
        
      });
  };
};
