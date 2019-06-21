import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    isAdmin: false
}

const authStart = (state, action) => {
    return updateObject(state, {error: null, loading: true});
}

const authEnd = (state, action) => {
    return updateObject(state, {error: null, loading: false});
}

const authSuccess = (state, action) => {
    let admin;
    if(action.email === 'admin@admin.com'){
        admin = true;
    } else {
        admin = false;
    }

    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        isAdmin: admin
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state,{
        token: null,
        userId: null,
        isAdmin: false
    });
}

const setAuthReidrectPath = (state, action) => {
    return updateObject(state, {authRedirectPath: action.path})
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_END: return authEnd(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthReidrectPath(state, action);
        default: return state;
    }
}

export default reducer;