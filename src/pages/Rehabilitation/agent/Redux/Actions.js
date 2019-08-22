import {createAction} from "redux-actions";
import types from "./ActionTypes";

export const loadingStart = createAction(types.LOADINGSTART);
export const loadingEnd = createAction(types.LOADINGEND);
export const search = createAction(types.SEARCH);
export const getFormItems = createAction(types.GETFORMITEMS);
export const setDatas = createAction(types.SET_DATAS);
export const setSearchObj = createAction(types.setSearchObj);
export const setBtnLoadingActive = createAction(types.SET_BTN_LOADING_ACTIVE);
export const setBtnLoadingDisplay = createAction(types.SET_BTN_DLOADING_DISPLAY);
export const setBtnRequestActive = createAction(types.BTN_REQUEST_ACTIVE);
export const setBtnRequestDisplay = createAction(types.BTN_REQUEST_DISPLAY);
export const setTypeDatas = createAction(types.SET_TYPE_DATAS);
