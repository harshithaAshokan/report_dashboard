import { combineReducers } from "@reduxjs/toolkit";
import AuthReducers from "../reducers/AuthReducers";
export const rootReducers=combineReducers({
    auth:AuthReducers,
})