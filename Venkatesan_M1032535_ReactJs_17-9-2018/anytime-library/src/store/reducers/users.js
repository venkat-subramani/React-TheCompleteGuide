import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    users: [],
    loggedInUser: null,
    loading: false
}

const userLoadingStart = (state, action) => {
    return updateObject(state, {loading: true});
}

const userLoadingFail = (state, action) => {
    return updateObject(state, {loading: false});
}

const fetchUsersSuccess = (state, action) => {
    return updateObject(state, {users: action.users, loading: false});
}

const getLoggedInUserSuccess = (state, action) => {
    return updateObject(state, {loggedInUser: action.user, loading: false});
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOADING_START: return userLoadingStart(state, action);
        case actionTypes.USER_LOADING_FAIL: return userLoadingFail(state, action);
        case actionTypes.FETCH_USERS_SUCCESS: return fetchUsersSuccess(state, action);
        case actionTypes.GET_LOGGED_IN_USER_SUCCESS: return getLoggedInUserSuccess(state, action);
        case actionTypes.UPDATE_USER_SUCCESS: return getLoggedInUserSuccess(state, action);
        default: return state
    }
}

export default reducer;