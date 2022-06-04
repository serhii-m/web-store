import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { oneProductReducer } from "./oneProductReducer"
import { tagTypeReducer } from "./tagTypeReducer";
import { typeReducer } from "./typeReducer";

export const rootReducer = combineReducers({
  product: productReducer,
  oneProduct: oneProductReducer,
  tagType: tagTypeReducer,
  type: typeReducer,
})

export type RootState = ReturnType<typeof rootReducer>;