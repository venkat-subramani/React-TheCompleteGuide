import * as actionTypes from './actionTypes';
import db from '../../axios-atl';

export const loadingStart = () => {
    return {
        type: actionTypes.USER_LOADING_START
    }
}

export const loadingFail = error => {
    return {
        type: actionTypes.USER_LOADING_FAIL,
        error: error
    }
}

export const fetchUsersSuccess = users => {
    return {
        type: actionTypes.FETCH_USERS_SUCCESS,
        users: users
    }
}

export const fetchUsers = (token, userId) => {
    return dispatch => {
        dispatch(loadingStart());
        db.get('/users.json')
            .then(res => {
                const fetchedUsers = [];
                for(let key in res.data){
                    fetchedUsers.push({
                        id: key,
                        ...res.data[key]
                    })
                }
                dispatch(fetchUsersSuccess(fetchedUsers));
            })
            .catch(error => {
                dispatch(loadingFail(error));
            })
    }
}

export const getLoggedInUserSuccess = user => {
    return {
        type: actionTypes.GET_LOGGED_IN_USER_SUCCESS,
        user: user
    }
}

export const getLoggedInUser = () => {
    return dispatch => {
        dispatch(loadingStart());
        const userEmail = localStorage.getItem('email');
        db.get('/users.json')
            .then(res => {
                const fetchedUsers = [];
                for(let key in res.data){
                    fetchedUsers.push({
                        id: key,
                        ...res.data[key]
                    })
                }
                const loggedinUser = fetchedUsers.find(user => user.email === userEmail);
                dispatch(getLoggedInUserSuccess(loggedinUser));
            })
            .catch(error => {
                dispatch(loadingFail(error));
            })
    }
}