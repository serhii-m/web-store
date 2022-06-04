export type TagTypeState = {
  tagTypes: any[];
  loading: boolean;
  error: null | string;
}

export enum TagTypeActionTypes {
  FETCH_TAGTYPE = "FETCH_TAGTYPE",
  FETCH_TAGTYPE_SUCCESS = "FETCH_TAGTYPE_SUCCESS",
  FETCH_TAGTYPE_ERROR = "FETCH_TAGTYPE_ERROR",
}

interface FetchTagTypeAction {
  type: TagTypeActionTypes.FETCH_TAGTYPE;
}

interface FetchTagTypeSuccessAction {
  type: TagTypeActionTypes.FETCH_TAGTYPE_SUCCESS;
  payload: any[];
}

interface FetchTagTypeErrorAction {
  type: TagTypeActionTypes.FETCH_TAGTYPE_ERROR;
  payload: string;
}

export type TagTypeAction =
  | FetchTagTypeAction
  | FetchTagTypeSuccessAction
  | FetchTagTypeErrorAction