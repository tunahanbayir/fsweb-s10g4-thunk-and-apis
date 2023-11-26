import axios from "axios";
import { toast } from "react-toastify";

export const GET_FAVS_FROM_LS = "GET_FAVS_FROM_LS";
export const FAV_ADD = "FAV_ADD";
export const FAV_REMOVE = "FAV_REMOVE";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_LOADING = "FETCH_LOADING";
export const FETCH_ERROR = "FETCH_ERROR";

export const getFavsFromLocalStorage = () => {
  toast.info("Favoriler Yüklendi.");
  return { type: GET_FAVS_FROM_LS };
};

export const addFav = (joke) => {
  toast.success("Favorilere Eklendi.");
  return { type: FAV_ADD, payload: joke };
};

export const removeFav = (id) => {
  toast.success("Favorilerden Çıkarıldı.", { theme: "dark" });
  return { type: FAV_REMOVE, payload: id };
};

export const fetchLoading = () => {
  return { type: FETCH_LOADING };
};

export const fetchSuccess = (data) => {
  toast.success("Yeni Şaka Yüklendi.");
  return { type: FETCH_SUCCESS, payload: data };
};

export const fetchError = (msg) => {
  toast.error(msg);
  return { type: FETCH_ERROR, payload: msg };
};

export const fetchAnother = () => (dispatch) => {
  dispatch(fetchLoading());
  axios
    .get("https://official-joke-api.appspot.com/jokes/random")
    .then((res) => {
      return dispatch(fetchSuccess(res.data));
    })
    .catch((err) => {
      return dispatch(fetchError(err.response.message));
    });
};
