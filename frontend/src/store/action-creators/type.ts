import axios from "axios";
import { Dispatch } from "react";
import { TypeAction, TypeActionTypes } from "../../types/type";

export const fetchTypes = () => {
  return async (dispatch: Dispatch<TypeAction>) => {
    try {
      dispatch({ type: TypeActionTypes.FETCH_TYPE });
      const response = await axios.get("http://localhost:5000/store/types");
      dispatch({
        type: TypeActionTypes.FETCH_TYPE_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: TypeActionTypes.FETCH_TYPE_ERROR,
        payload: "",
      });
    }
  }
}