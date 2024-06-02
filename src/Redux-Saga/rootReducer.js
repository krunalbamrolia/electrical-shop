import { combineReducers } from "redux";
import userReducer from "./user/Reducer/Reducer";



let rootReducer = combineReducers({
    userReducer
})

export default rootReducer;