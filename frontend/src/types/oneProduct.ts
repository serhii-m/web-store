export type OneProductState = {
  product: any;
  loading: boolean;
  err: null | string;
};

export enum OneProductActionTypes {
  FETCH_ONEPRODUCT = "FETCH_ONEPRODUCT",
  FETCH_ONEPRODUCT_SUCCESS = "FETCH_ONEPRODUCT_SUCCESS",
  FETCH_ONEPRODUCT_ERROR = "FETCH_ONEPRODUCT_ERROR",
}

interface FetchOneProductAction {
  type: OneProductActionTypes.FETCH_ONEPRODUCT;
}

interface FetchOneProductSuccessAction {
  type: OneProductActionTypes.FETCH_ONEPRODUCT_SUCCESS;
  payload: any;
}

interface FetchOneProductErrorAction {
  type: OneProductActionTypes.FETCH_ONEPRODUCT_ERROR;
  payload: string;
}

export type OneProductAction =
  | FetchOneProductAction
  | FetchOneProductSuccessAction
  | FetchOneProductErrorAction;