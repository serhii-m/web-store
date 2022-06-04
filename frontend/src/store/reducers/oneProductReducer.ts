import {
  OneProductAction,
  OneProductActionTypes,
  OneProductState,
} from "../../types/oneProduct"

const initialState: OneProductState = {
  product: {},
  loading: false,
  err: null,
}

export const oneProductReducer = (
  state = initialState,
  action: OneProductAction
): OneProductState => {
  switch (action.type) {
    case OneProductActionTypes.FETCH_ONEPRODUCT:
      return {loading: true, err: null, product: {}};
    case OneProductActionTypes.FETCH_ONEPRODUCT_SUCCESS:
      return {loading: false, err: null, product: action.payload};
    case OneProductActionTypes.FETCH_ONEPRODUCT_ERROR:
      return {loading: false, err: action.payload, product: {}};
    default:
      return state;
  }
}