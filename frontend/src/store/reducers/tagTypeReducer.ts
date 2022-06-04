import { TagTypeAction, TagTypeActionTypes, TagTypeState } from "../../types/tagType";

const initialState: TagTypeState = {
  tagTypes: [],
  loading: true,
  error: null,
}

export const tagTypeReducer = (
  state = initialState,
  action: TagTypeAction
): TagTypeState => {
  switch (action.type) {
    case TagTypeActionTypes.FETCH_TAGTYPE:
      return { ...state, loading: true };

    case TagTypeActionTypes.FETCH_TAGTYPE_SUCCESS:
      return { ...state, loading: false, tagTypes: action.payload };

    case TagTypeActionTypes.FETCH_TAGTYPE_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}