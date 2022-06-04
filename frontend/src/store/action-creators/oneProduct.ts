import axios from "axios";
import { Dispatch } from "react";
import { OneProductAction, OneProductActionTypes } from "../../types/oneProduct";

export const fetchOneProduct = (slug: string) => {
  return async (dispatch: Dispatch<OneProductAction>) => {
    try {
      dispatch({ type: OneProductActionTypes.FETCH_ONEPRODUCT });
      const response = await axios.get(`http://localhost:5000/store/${slug}`);
      dispatch({
        type: OneProductActionTypes.FETCH_ONEPRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: OneProductActionTypes.FETCH_ONEPRODUCT_ERROR,
        payload: "An error occurred while loading product!",
      });
    }
  }
}