export type TypeState = {
  types: any[];
  loading: boolean;
  error: null | string;
}

export enum TypeActionTypes {
  FETCH_TYPE = "FETCH_TYPE",
  FETCH_TYPE_SUCCESS = "FETCH_TYPE_SUCCESS",
  FETCH_TYPE_ERROR = "FETCH_TYPE_ERROR",
}

interface FetchTypeAction {
  type: TypeActionTypes.FETCH_TYPE;
}

interface FetchTypeSuccessAction {
  type: TypeActionTypes.FETCH_TYPE_SUCCESS;
  payload: any[];
}

interface FetchTypeErrorAction {
  type: TypeActionTypes.FETCH_TYPE_ERROR;
  payload: string;
}

export type TypeAction =
  | FetchTypeAction
  | FetchTypeSuccessAction
  | FetchTypeErrorAction