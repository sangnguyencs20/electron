import { combineReducers } from "redux";
import userState from "./user/userSlice";

const reducer = combineReducers({
  userState,
});
export default reducer;
