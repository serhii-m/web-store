import axios from "axios";
import { Dispatch } from "react";
import { ProductAction, ProductActionTypes } from "../../types/product";

export const fetchProducts = () => {
  return async (dispatch: Dispatch<ProductAction>) => {
    try {
      dispatch({ type: ProductActionTypes.FETCH_PRODUCT });
      const response = await axios.get("http://localhost:5000/store");
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: ProductActionTypes.FETCH_PRODUCT_ERROR,
        payload: "An error occurred while loading products!",
      });
    }
  }
}