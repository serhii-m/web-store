import * as ProductActionCreators from "./product";
import * as OneProductActionCreators from "./oneProduct";
import * as TagActionCreators from "./tagType";
import * as TypeActionCreators from "./type";

export default {
  ...ProductActionCreators,
  ...OneProductActionCreators,
  ...TagActionCreators,
  ...TypeActionCreators,
}