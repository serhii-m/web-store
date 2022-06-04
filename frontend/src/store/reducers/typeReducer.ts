import { TypeAction, TypeActionTypes, TypeState } from "../../types/type";

const initialState: TypeState = {
  types: [],
  loading: true,
  error: null,
}

export const typeReducer = (
  state = initialState,
  action: TypeAction
): TypeState => {
  switch (action.type) {
    case TypeActionTypes.FETCH_TYPE:
      return { ...state, loading: true };

    case TypeActionTypes.FETCH_TYPE_SUCCESS:
      return { ...state, loading: false, types: action.payload };

    case TypeActionTypes.FETCH_TYPE_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}