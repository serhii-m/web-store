import axios from "axios";
import { Dispatch } from "react";
import { TagTypeAction, TagTypeActionTypes } from "../../types/tagType";

export const fetchTags = () => {
  return async (dispatch: Dispatch<TagTypeAction>) => {
    try {
      dispatch({ type: TagTypeActionTypes.FETCH_TAGTYPE });
      const response = await axios.get("http://localhost:5000/store/tagtypes");
      dispatch({
        type: TagTypeActionTypes.FETCH_TAGTYPE_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: TagTypeActionTypes.FETCH_TAGTYPE_ERROR,
        payload: "An error occurred while loading tagTypes",
      });
    }
  };
}