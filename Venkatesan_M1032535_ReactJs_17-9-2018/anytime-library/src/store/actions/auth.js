import axios from 'axios';
import db from '../../axios-atl';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const signUpSuccess = (user) => {
    const userData = {
        email: user.email,
        registeredOn: (new Date()).toUTCString(),
        books: []
    }
    return dispatch => {
        db.post('/users.json', userData)
            .then(response => {
                dispatch(authEnd())
            })
            .catch(error => {
                dispatch(authEnd())
            });
    }
};

export const authEnd = () => {
    return {
        type: actionTypes.AUTH_END
    };
}

export const authSuccess = (token, userId, email) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        email: email
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    } 
}

export const googleAuth = () => {
    return dispatch => {
        dispatch(authStart());
        const oAuth = {
            requestUri: 'http://localhost',
            postBody: 'id_token=530722197110-q51l89n4m0h5n8c764f6q9525ause5gb.apps.googleusercontent.com&providerId=google.com',
            returnSecureToken: true,
            returnIdpCredential: true
        }
        const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyAssertion?key=AIzaSyDg8ZXY7CRVPm-wNvaiVTFpuZG7_11Wu3o';
        axios.post(url, oAuth)
            .then(res => {
                dispatch(authSuccess(res.data.idToken, res.data.localId, res.data.email));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDg8ZXY7CRVPm-wNvaiVTFpuZG7_11Wu3o';
        if(!isSignup){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDg8ZXY7CRVPm-wNvaiVTFpuZG7_11Wu3o';
        }
        axios.post(url, authData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('email', res.data.email);
                dispatch(authSuccess(res.data.idToken, res.data.localId, res.data.email));
                dispatch(checkAuthTimeout(res.data.expiresIn));
                if(isSignup){
                    dispatch(signUpSuccess(res.data));
                }
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                const email = localStorage.getItem('email');
                dispatch(authSuccess(token, userId, email));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}