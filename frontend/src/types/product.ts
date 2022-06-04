export type ProductState = {
  products: any[];
  loading: boolean;
  err: null | string;
};

export enum ProductActionTypes {
  FETCH_PRODUCT = "FETCH_PRODUCT",
  FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS",
  FETCH_PRODUCT_ERROR = "FETCH_PRODUCT_ERROR",
}

interface FetchProductAction {
  type: ProductActionTypes.FETCH_PRODUCT;
}

interface FetchProductSuccessAction {
  type: ProductActionTypes.FETCH_PRODUCT_SUCCESS;
  payload: any[];
}

interface FetchProductErrorAction {
  type: ProductActionTypes.FETCH_PRODUCT_ERROR;
  payload: string;
}

export type ProductAction =
  | FetchProductAction
  | FetchProductSuccessAction
  | FetchProductErrorAction;