import {
  ProductAction,
  ProductActionTypes,
  ProductState,
} from "../../types/product"

const initialState: ProductState = {
  products: [],
  loading: false,
  err: null,
}

export const productReducer = (
  state = initialState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCT:
      return {loading: true, err: null, products: []};
    case ProductActionTypes.FETCH_PRODUCT_SUCCESS:
      return {loading: false, err: null, products: action.payload};
    case ProductActionTypes.FETCH_PRODUCT_ERROR:
      return {loading: false, err: action.payload, products: []};
    default:
      return state;
  }
}